import axios from "axios";

const API_URL = '/api/info/'

const createInfo = async (infoData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, infoData, config)

    return response.data
}

const getInfoDataForUser = async (user_id, token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL + user_id, config)

    return response.data

}

const infoService = {
    createInfo,
    getInfoDataForUser
}

export default infoService