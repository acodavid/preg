import axios from "axios";

const API_URL = '/api/family/'

const createFamily = async (familyData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, familyData, config)

    return response.data
}

const getFamilyDataForUser = async (user_id, token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL + user_id, config)

    return response.data

}

const familyService = {
    createFamily,
    getFamilyDataForUser
}

export default familyService