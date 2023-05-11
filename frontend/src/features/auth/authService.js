import axios from 'axios'
import {toast} from 'react-toastify'

const API_URL = '/api/users/'

//Get all users
const getUsers = async (token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL + 'all', config)

    return response.data
}

// Register User
const register = async (userData) => {
    const response = await axios.post(API_URL, userData)

    return response.data
}

// Login user
const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData)

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
        toast.success('Uspjesno ste se prijavili')
    }

    return response.data
}

// Logout User
const logout = () => localStorage.removeItem('user')

const authService = {
    register,
    logout,
    login,
    getUsers
}

export default authService