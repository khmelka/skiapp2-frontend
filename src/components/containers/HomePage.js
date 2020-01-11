import React, {useEffect, Fragment} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getCurrentProfile} from '../../redux/actions/profile'
import Spinner from './Spinner'
import HomeActions from './HomeActions'

const HomePage = ({getCurrentProfile, auth: {user}, profile: {profile, loading}})=> {
    useEffect(() => {
        getCurrentProfile()
    }, [getCurrentProfile])

    console.log("profile", profile)

    return loading && profile === null ? <Spinner /> : <Fragment>
        <h1 className="large text-primary">Dashboard</h1>
        <p className="lead">
            <i className ="fas fa-user"></i> Welcome {user && user.name}
        </p>
        {profile !==null ? <Fragment><HomeActions /></Fragment> : <Fragment>
            <p>You don't have a profile yet, please creare one</p>
            <Link to='/create-profile' className='btn btn-primary my-1'> Create profile</Link>
            </Fragment>}
    </Fragment>
}

HomePage.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile        
})

export default connect(mapStateToProps, {getCurrentProfile})(HomePage)
