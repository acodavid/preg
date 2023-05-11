import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
import Spinner from './Spinner'
import { createFamily, reset } from '../features/family/familySlice'


function FamilyAmn({user_id}) {

    const {isLoading, isError, isSucces, message} = useSelector(
        (state) => state.personal
    )
    
    const [formData, setFormData] = useState({
        diabetesMellitus: '',
        congenitalAnomalies: '',
        inheritedAnomalies: '',
        nervousAndMentalDiseases: '',
        multiplePregnancies: '',
        chronicSystemicDiseases: '',
        other: ''
    })

    const { diabetesMellitus, congenitalAnomalies, inheritedAnomalies, nervousAndMentalDiseases, multiplePregnancies, chronicSystemicDiseases, other} = formData

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if(isError) {
            toast.error(message)
        }

        if(isSucces) {
            dispatch(reset())
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

        const familyAmn = formData
        familyAmn.id = user_id

        // console.log(familyAmn)

        dispatch(createFamily(familyAmn))

    }

    if(isLoading) {
        return <Spinner />
    }

    
  return (
    <div>
        <h1>Porodicna amneza</h1>

        <section className="form">
        <form onSubmit={onSubmit}>
            <div className='form-group'>
                <label htmlFor="diabetesMellitus">Secerna oboljenja</label>
                <input type="text" className='form-control' id='diabetesMellitus' name='diabetesMellitus' value={diabetesMellitus} onChange={onChange} placeholder='Secerna oboljenja' required/>
            </div>
            <div className='form-group'>
                <label htmlFor="congenitalAnomalies">Urodjene anomalije</label>
                <input type="text" className='form-control' id='congenitalAnomalies' name='congenitalAnomalies' value={congenitalAnomalies} onChange={onChange} placeholder='Urodjene anomalije' required/>
            </div>
            <div className='form-group'>
                <label htmlFor="inheritedAnomalies">Nasledjene anomalije</label>
                <input type="text" className='form-control' id='inheritedAnomalies' name='inheritedAnomalies' value={inheritedAnomalies} onChange={onChange} placeholder='Nasledjene anomalije' required/>
            </div>
            <div className='form-group'>
                <label htmlFor="nervousAndMentalDiseases">Nervne i dusevne bolesti</label>
                <input type="text" className='form-control' id='nervousAndMentalDiseases' name='nervousAndMentalDiseases' value={nervousAndMentalDiseases} onChange={onChange} placeholder='Nervne i dusevne bolesti' required/>
            </div>
            <div className='form-group'>
                <label htmlFor="multiplePregnancies">Visestruka trudnoca</label>
                <input type="text" className='form-control' id='multiplePregnancies' name='multiplePregnancies' value={multiplePregnancies} onChange={onChange} placeholder='Visestruka trudnoca' required/>
            </div>
            <div className='form-group'>
                <label htmlFor="chronicSystemicDiseases">Hronicna i sistematska oboljenja</label>
                <input type="text" className='form-control' id='chronicSystemicDiseases' name='chronicSystemicDiseases' value={chronicSystemicDiseases} onChange={onChange} placeholder='Hronicna i sistematska oboljenja' required/>
            </div>
            <div className='form-group'>
            <label htmlFor="other">Ostalo</label>
                <input type="text" className='form-control' id='other' name='other' value={other} onChange={onChange} placeholder='Ostalo' required/>
            </div>
            <div className='form-group'>
                <button className='btn btn-block' type='submit'>Potvrdi</button>
            </div>
        </form>
    </section>
    </div>
  )
}

export default FamilyAmn