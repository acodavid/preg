import axios from "axios";

const API_URL = '/api/personal/'

const createPersonal = async (personalData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, personalData, config)

    return response.data
}

const getPersonalDateForUser = async (user_id, token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL + user_id, config)

    return response.data

}

const personalService = {
    createPersonal,
    getPersonalDateForUser
}

export default personalService