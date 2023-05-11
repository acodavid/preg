import axios from "axios";

const API_URL = '/api/family'

const createFamily = async (familyData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, familyData, config)

    return response.data
}

const familyService = {
    createFamily
}

export default familyService