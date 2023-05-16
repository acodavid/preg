import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
import { createInfo, reset } from '../features/info/infoSlice'
import Spinner from './Spinner'


function InfoPregnant({user_id}) {

    const {isLoading, isError, isSucces, message, infoPreg} = useSelector(
        (state) => state.info
    )
    
    const [formData, setFormData] = useState({
        pm: '',
        tp: '',
        factors: ''
    })

    const [formDisabled, setFormDisabled] = useState(false)

    const { pm, tp, factors} = formData

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {

        if(infoPreg) {
            setFormDisabled(true)
            setFormData({
                pm: infoPreg.pm,
                tp: infoPreg.tp,
                factors: infoPreg.factors
            })
        }

        if(isError) {
            toast.error(message)
        }

        if(isSucces) {
            dispatch(reset())
            // navigate('/dashboard')
        }

        dispatch(reset())
    }, [dispatch, isError, isSucces, navigate, message, infoPreg, setFormData])

    const onChange = (e) => {
        setFormData((prevState) =>({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const setEditFormState = () => {
        setFormDisabled(false)
    }

    const onSubmit = (e) => {
        e.preventDefault()

        setFormDisabled(true)

        const infoPregnantWoman = formData
        infoPregnantWoman.id = user_id

        // console.log(infoPregnantWoman)

        dispatch(createInfo(infoPregnantWoman))

    }

    if(isLoading) {
        return <Spinner />
    }

    
  return (
    <div>
        <h1>Osnovni podaci za trudnicu</h1>

        <fieldset disabled={formDisabled} className="form">
        <form onSubmit={onSubmit}>
            <div className='form-group'>
                <label htmlFor="pm">PM</label>
                <input type="text" className='form-control' id='pm' name='pm' value={pm} onChange={onChange} placeholder='PM' required/>
            </div>
            <div className='form-group'>
                <label htmlFor="tp">TP</label>
                <input type="text" className='form-control' id='tp' name='tp' value={tp} onChange={onChange} placeholder='TP' required/>
            </div>
            <div className='form-group'>
                <label htmlFor="factors">Factors</label>
                <input type="text" className='form-control' id='factors' name='factors' value={factors} onChange={onChange} placeholder='Faktori' required/>
            </div>
            {!formDisabled && 
                    <div className='form-group'>
                        <button className='btn btn-block' type='submit'>Potvrdi</button>
                    </div>}
        </form>
    </fieldset>
    {formDisabled && <div className='form'>
                        <button className='btn btn-block' onClick={setEditFormState} type='button'>Izmijeni podatke</button>
                    </div>}
    </div>
  )
}

export default InfoPregnant