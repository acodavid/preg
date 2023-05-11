import axios from "axios";

const API_URL = '/api/info'

const createInfo = async (infoData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, infoData, config)

    return response.data
}

const infoService = {
    createInfo
}

export default infoService