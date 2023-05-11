import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
import { createReproductive, reset } from '../features/reproductive/reproductiveSlice'
import Spinner from './Spinner'


function ReproductiveAmn({user_id}) {

    const {isLoading, isError, isSucces, message} = useSelector(
        (state) => state.personal
    )
    
    const [formData, setFormData] = useState({
        durationMenstrualCycle: '',
        lengthMenstrualCycle: ''
    })

    const { durationMenstrualCycle, lengthMenstrualCycle} = formData

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

        const reproductiveAmn = formData
        reproductiveAmn.id = user_id

        // console.log(reproductiveAmn)

        dispatch(createReproductive(reproductiveAmn))

    }

    if(isLoading) {
        return <Spinner />
    }

    
  return (
    <div>
        <h1>Reproduktivna anameza</h1>

        <section className="form">
        <form onSubmit={onSubmit}>
            <div className='form-group'>
                <label htmlFor="durationMenstrualCycle">Trajanje menstrulanog ciklusa</label>
                <input type="text" className='form-control' id='durationMenstrualCycle' name='durationMenstrualCycle' value={durationMenstrualCycle} onChange={onChange} placeholder='Trajanje menstrualnog ciklusa' required/>
            </div>
            <div className='form-group'>
                <label htmlFor="lengthMenstrualCycle">Duzina menstrualnog ciklusa</label>
                <input type="text" className='form-control' id='lengthMenstrualCycle' name='lengthMenstrualCycle' value={lengthMenstrualCycle} onChange={onChange} placeholder='Duzina menstrualnog ciklusa' required/>
            </div>
            <div className='form-group'>
                <button className='btn btn-block' type='submit'>Potvrdi</button>
            </div>
        </form>
    </section>
    </div>
  )
}

export default ReproductiveAmn