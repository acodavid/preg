import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {useSelector, useDispatch} from 'react-redux'
import { register, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Register() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
        phone: '',
        dateOfBirth: '',
        job: '',
        maritalStatus: '',
        address: ''
    })

    const {name, email, password, password2, phone, dateOfBirth, address, job, maritalStatus} = formData

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {user, isLoading, isError, isSuccess, message} = useSelector(state => state.auth)


    useEffect(() => {
        if(isError) {
            toast.error(message)
        }

        if(!user) {
            navigate('/')
          }

        dispatch(reset)
    }, [isError, isSuccess, user, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) =>({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        if(password !== password2){
            toast.error('Lozinke se ne podudaraju')
        } else {
            const userData = {
                name,
                email,
                password,
                phone,
                dateOfBirth,
                address,
                job, 
                maritalStatus
            }

            dispatch(register(userData))
            toast.success('Uspjesno dodan korisnik')
            navigate('/dashboard')
        }

    }

    if(isLoading) {
        return <Spinner />
    }

  return (
    <>
    <section className="form">
        <form onSubmit={onSubmit}>
            <div className='form-group'>
                <input type="text" className='form-control' id='name' name='name' value={name} onChange={onChange} placeholder='Ime i prezime' required/>
            </div>
            <div className='form-group'>
                <input type="email" className='form-control' id='email' name='email' value={email} onChange={onChange} placeholder='Email' required/>
            </div>
            <div className='form-group'>
                <input type="text" className='form-control' id='address' name='address' value={address} onChange={onChange} placeholder='Adresa' required/>
            </div>
            <div className='form-group'>
                <input type="password" className='form-control' id='password' name='password' value={password} onChange={onChange} placeholder='Lozinka' required/>
            </div>
            <div className='form-group'>
                <input type="password" className='form-control' id='password2' name='password2' value={password2} onChange={onChange} placeholder='Potvrdi lozinku' required/>
            </div>
            <div className='form-group'>
                <input type="number" className='form-control' id='phone' name='phone' value={phone} onChange={onChange} placeholder='Broj telefona' required/>
            </div>
            <div className='form-group'>
                <input type="date" className='form-control' id='dateOfBirth' name='dateOfBirth' value={dateOfBirth} onChange={onChange} placeholder='Datum rodjenja' required/>
            </div>
            <div className='form-group'>
                <input type="text" className='form-control' id='job' name='job' value={job} onChange={onChange} placeholder='Zanimanje' required/>
            </div>
            <div className='form-group'>
                <input type="text" className='form-control' id='maritalStatus' name='maritalStatus' value={maritalStatus} onChange={onChange} placeholder='Bracno stanje' required/>
            </div>
            <div className='form-group'>
                <button className='btn btn-block' type='submit'>Submit</button>
            </div>
        </form>
    </section>
    </>
  )
}

export default Register