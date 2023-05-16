import axios from "axios";

const API_URL = '/api/reproductive/'

const createReproductive = async (reproAmn, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, reproAmn, config)

    return response.data
}

const getReproductiveDataForUser = async (user_id, token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL + user_id, config)

    return response.data

}

const reproductiveService = {
    createReproductive,
    getReproductiveDataForUser
}

export default reproductiveService