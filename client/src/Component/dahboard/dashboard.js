import React, { Component } from 'react'
import propTypes from 'prop-types';
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import { getCurrentProfile, deleteAccount } from '../../actions/profileAction'
import Spinner from '../Common/Spinner'
import ProfileActions from './ProfileActions'
import Experience from './Experience'
import Education from './Education'
class Dashboard extends Component {
    componentDidMount(){
        this.props.getCurrentProfile();
    }

    onDeleteClick(e){
        this.props.deleteAccount();
    }
  render() {
      const { user } = this.props.auth;
      const { profile,loading } = this.props.profile
      let dashboardContent;
      if(profile=== null || loading){
            dashboardContent = <Spinner/>;
      }else{
            // check if logged in user has profi;e data
            if(Object.keys(profile).length >0){
              dashboardContent = (
                <div>
                    <p className="lead text-muted">
                     welcome: <Link to={`/propfile/${profile.handle}`}>
                                  {user.name}
                              </Link>
                  </p>
                  <ProfileActions/>
                  <Experience experience={profile.experience} />
                  <Education education={profile.education} />
                  {/* TODO:exp add edu */}
                  <div style={{ marginBottom: '60px' }} />
                    <button
                      onClick={this.onDeleteClick.bind(this)}
                      className="btn btn-danger"
                    >
                      Delete My Account
                    </button>
                </div>

              )
            }else{
              // User is logged in but has no profile
              dashboardContent=(
                <div>
                  <p className="lead text-muted">
                     welcome: {user.name}
                  </p>
                  <p>You have not yet setup a profile</p>
                  <Link to="/create-profile" className="btn btn-lg btn-info">
                     Create Profile
                  </Link>
                </div>
              )
            }
      }
    return (
      <div className="dashboard">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1 className="display-4">DashBoard</h1>
                    {dashboardContent}

                </div>
            </div>
        </div>
      </div>
    )
  }
}

Dashboard.propTypes = {
    getCurrentProfile: propTypes.func.isRequired,
    auth:propTypes.object.isRequired,
    profile: propTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
  });
  
  export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);
  