import React, { Component } from 'react'
import PropsTypes from 'prop-types'
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import { registeruser } from '../../actions/authActions'
import TextFiedGroup from '../Common/TextFieldGroup'
 class Register extends Component {
    constructor(props){
        super(props);
        this.state={
            name:'',
            email:'',
            password:'',
            password2:'',
            errors:{},
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    // store session
    
    componentDidMount(){
      if(this.props.auth.isAuthenticated){
        this.props.history.push('/dashboard')
      }
    }
    componentWillReceiveProps(nextProps){
      if(nextProps.errors){
          this.setState({errors:nextProps.errors})
      }
    }
    onChange(e){
        this.setState({[e.target.name]:e.target.value})
    }

    onSubmit(e){
        e.preventDefault();
        const newUser =  {
            name : this.state.name,
            email : this.state.email,
            password : this.state.password,
            password2 : this.state.password2
        }
        this.props.registeruser(newUser,this.props.history)
        // axios.post('/api/users/register',newUser)
        // .then(res=> console.log(res.data))
        // .catch(err =>this.setState({errors:err.response.data}))
    }
  render() {
     const { errors } = this.state;
    //  const { user } = this.props.auth;
  
    return (
    
        <div className="register">
        {/* {user ? user.name : null} */}
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Sign Up</h1>
                <p className="lead text-center">Create your DevConnector account</p>
                <form noValidate onSubmit={this.onSubmit}>
                  {/* <div className="form-group">
                    <input 
                       type="text" 
                       className={classnames('form-control form-control-lg',{
                           'is-invalid':errors.name
                       })} 
                       placeholder="Name" 
                       name='name'
                       value={this.state.name}
                       onChange={this.onChange}
                       />
                       {errors.name 
                        && (<div className='invalid-feedback'>{errors.name}</div>)}
                  </div> */}
                  <TextFiedGroup
                      placeholder="Name"
                      name="name"
                      type="name"
                      value={this.state.name}
                      onChange={this.onChange}
                      error={errors.name}
                  />
                    <TextFiedGroup
                      placeholder="Email Address"
                      name="email"
                      type="email"
                      value={this.state.email}
                      onChange={this.onChange}
                      error={errors.email}
                      info="this site uses gavatar"
                  />
                   <TextFiedGroup
                      placeholder="Password"
                      name="password"
                      type="password"
                      value={this.state.password}
                      onChange={this.onChange}
                      error={errors.password}
                  />
                    <TextFiedGroup
                      placeholder="Confirm Password"
                      name="password2"
                      type ="password"
                      value={this.state.password2}
                      onChange={this.onChange}
                      error={errors.password2}
                  />
                  <input type="submit" className="btn btn-info btn-block mt-4" />
                </form>
              </div>
            </div>
          </div>
        </div>
      
    )
  }
}
Register.PropsTypes = {
  registeruser: PropsTypes.func.isRequired,
  auth : PropsTypes.object.isRequired,
  errors:PropsTypes.object.isRequired
}

const mapStateToProps = (state) =>({
  auth:state.auth,
  errors: state.errors
})

export default connect(mapStateToProps,{ registeruser })(withRouter(Register));