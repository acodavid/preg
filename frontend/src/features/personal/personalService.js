import axios from "axios";

const API_URL = '/api/personal'

const createPersonal = async (personalData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, personalData, config)

    return response.data
}

const personalService = {
    createPersonal
}

export default personalService