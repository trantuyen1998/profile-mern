// register USer
import { GET_ERRORS, SET_CURRENT_USER } from './type'
import setAuthToken from '../utils/setAuthToken'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
export const registeruser = ( userData, history )=> dispatch =>{
    // return {
    //     type:TEST_DISPATCH,
    //     payload:userData
    // }    

    axios.post('/api/users/register',userData)
        .then( res =>  history.push('/login') )
        .catch(err => 
            dispatch({
                type:GET_ERRORS,
                payload: err.response.data
            })
            )
    

};

export const loginUser = userData => dispatch =>{
    axios.post('/api/users/login',userData)
    .then(res => {
        // save to localStorage
        const { token } =  res.data;

        // set token to ls
        localStorage.setItem('jwtToken',token);

        // set token to Auth header

        setAuthToken(token);
        // decode token

        const decoded = jwt_decode(token);
        // set current user

        dispatch(setCurrentUser(decoded))


    }).catch(err => {
        dispatch({
            type:GET_ERRORS,
            payload: err.response.data
        })
    })
}
// set logged user

export const setCurrentUser = (decoded)=>{
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

//logout

export const  logoutUser = ()=> dispatch =>{
    // remove token from localStorage
    localStorage.removeItem('jwtToken');
    // remove auth header for future req
    setAuthToken(false);
    // set current user to {} which will set isAuth to false
    dispatch(setCurrentUser({}))

}