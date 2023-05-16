import axios from "axios";

const API_URL = '/api/notes/'

const createNotes = async (notesData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, notesData, config)

    return response.data
}

const getNotesDataForUser = async (user_id, token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL + user_id, config)

    return response.data

}

const notesService = {
    createNotes,
    getNotesDataForUser
}

export default notesService