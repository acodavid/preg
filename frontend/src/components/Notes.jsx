import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
import { createNotes, reset } from '../features/notes/notesSlice'
import Spinner from './Spinner'


function Notes({user_id}) {

    const {isLoading, isError, isSucces, message} = useSelector(
        (state) => state.personal
    )
    
    const [formData, setFormData] = useState({
        notes: ''
    })

    const { notes } = formData

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if(isError) {
            toast.error(message)
        }

        if(isSucces) {
            dispatch(reset())
            navigate('/dashboard')
        }

        dispatch(reset())
    }, [dispatch, isError, isSucces, navigate, message])

    const onChange = (e) => {
        setFormData((prevState) =>({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        const notesAmn = formData
        notesAmn.id = user_id

        // console.log(notesAmn)

        dispatch(createNotes(notesAmn))

    }

    if(isLoading) {
        return <Spinner />
    }

    
  return (
    <div>
        <h1>Napomene</h1>

        <section className="form">
        <form onSubmit={onSubmit}>
            <div className='form-group'>
                <label htmlFor="notes">Napomene</label>
                <input type="text" className='form-control' id='notes' name='notes' value={notes} onChange={onChange} placeholder='Napomene' required/>
            </div>
            <div className='form-group'>
                <button className='btn btn-block' type='submit'>Potvrdi</button>
            </div>
        </form>
    </section>
    </div>
  )
}

export default Notes