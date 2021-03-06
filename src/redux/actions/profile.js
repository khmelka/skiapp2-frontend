import axios from 'axios'
import {setAlert} from './alert'

import {GET_PROFILE, PROFILE_ERROR, GET_ALL_PROFILES, CLEAR_PROFILE, DELETE_ACCOUNT} from './types'

//
export const getCurrentProfile = () => async dispatch => {
    try {  
        const res = await axios.get('https://lit-sands-19035.herokuapp.com/profile/me')
        console.log("data profile", res.data)
        dispatch ({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })  
    }
}

//create or update profile
export const createProfile=(formData, history, edit = false) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.post('https://lit-sands-19035.herokuapp.com/profile/', formData, config)
        dispatch ({
            type: GET_PROFILE,
            payload: res.data
        })
        dispatch(setAlert(edit ? 'Profile has been updated' : 'Profile has been created', 'good'))

        if(!edit) {
            history.push('/homepage')
        }
    } catch (error) {
        const errors = error.response.data.errors
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'bad ')))
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}

//get all profiles
export const getAllProfiles = () => async dispatch => {
    dispatch ({type: CLEAR_PROFILE})
    try {  
        const res = await axios.get('https://lit-sands-19035.herokuapp.com/profile')
        dispatch ({
            type: GET_ALL_PROFILES,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,  
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}

//get profile by id
export const getProfileById = (userId) => async dispatch => {
    try {  
        const res = await axios.get(`https://lit-sands-19035.herokuapp.com/profile/user/${userId}`)
        dispatch ({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}

//delete account and profile 
export const deleteAccount = () => async dispatch => {
    if (window.confirm('Are you sure? The account will be deleted')) {
      try {
        await axios.delete('https://lit-sands-19035.herokuapp.com/profile')
  
        dispatch({ type: CLEAR_PROFILE })
        dispatch({ type: DELETE_ACCOUNT })
  
        dispatch(setAlert('Goodbye! Your account had been deleted!', 'delete'))
      } catch (err) {
        dispatch({
          type: PROFILE_ERROR,
          payload: { msg: err.response.statusText, status: err.response.status }
        })
      }
    }
  }