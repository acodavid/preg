import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
import { createPersonal, reset } from '../features/personal/personSlice'
import Spinner from './Spinner'


function PersonalAmn({user_id}) {

    const {isLoading, isError, isSucces, message} = useSelector(
        (state) => state.personal
    )
    
    const [formData, setFormData] = useState({
        thesisOfDisease: '',
        diabetesMellitus: '',
        congenitalAnomalies: '',
        hypertension: '',
        operations: '',
        smoking: ''
    })

    const { thesisOfDisease, diabetesMellitus, congenitalAnomalies, hypertension, operations, smoking} = formData

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

        const personalAmn = formData
        personalAmn.id = user_id

        // console.log(personalAmn)

        dispatch(createPersonal(personalAmn))

    }

    if(isLoading) {
        return <Spinner />
    }

    
  return (
    <div>
        <h1>Licna amneza</h1>

        <section className="form">
        <form onSubmit={onSubmit}>
            <div className='form-group'>
                <label htmlFor="thesisOfDisease">Teza oboljenja (endokrina, srcana, bubrezna)</label>
                <input type="text" className='form-control' id='thesisOfDisease' name='thesisOfDisease' value={thesisOfDisease} onChange={onChange} placeholder='Teza oboljenja (endokrina, srcana, bubrezna)' required/>
            </div>
            <div className='form-group'>
                <label htmlFor="diabetesMellitus">Secerna oboljenja</label>
                <input type="text" className='form-control' id='diabetesMellitus' name='diabetesMellitus' value={diabetesMellitus} onChange={onChange} placeholder='Secerna oboljenja' required/>
            </div>
            <div className='form-group'>
                <label htmlFor="congenitalAnomalies">Urodjene anomalije</label>    
                <input type="text" className='form-control' id='congenitalAnomalies' name='congenitalAnomalies' value={congenitalAnomalies} onChange={onChange} placeholder='Urodjene anomalije' required/>
            </div>
            <div className='form-group'>
                <label htmlFor="hypertension">Hipertenzija</label> 
                <input type="text" className='form-control' id='hypertension' name='hypertension' value={hypertension} onChange={onChange} placeholder='Hipertenzija' required/>
            </div>
            <div className='form-group'>
                <label htmlFor="operations">Operacije</label> 
                <input type="text" className='form-control' id='operations' name='operations' value={operations} onChange={onChange} placeholder='Operacije' required/>
            </div>
            <div className='form-group'>
                <label htmlFor="smoking">Pusenje</label> 
                <input type="text" className='form-control' id='smoking' name='smoking' value={smoking} onChange={onChange} placeholder='Pusenje' required/>
            </div>
            <div className='form-group'>
                <button className='btn btn-block' type='submit'>Potvrdi</button>
            </div>
        </form>
    </section>
    </div>
  )
}

export default PersonalAmn