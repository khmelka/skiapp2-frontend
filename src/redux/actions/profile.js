import axios from 'axios'
import {setAlert} from './alert'

import {GET_PROFILE, PROFILE_ERROR} from './types'

export const getCurrentProfile = () => async dispatch => {
    try {  
        const res = await axios.get('/profile/me')
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

        const res = await axios.post('/profile/', formData, config)
        dispatch ({
            type: GET_PROFILE,
            payload: res.data
        })
        dispatch(setAlert(edit ? 'Profile has been updated' : 'Profile has been created', 'success'))

        if(!edit) {
            history.push('/homepage')
        }
    } catch (error) {
        const errors = error.response.data.errors
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger ')))
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}