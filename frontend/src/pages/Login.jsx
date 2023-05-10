import React, {useState, useEffect} from 'react'
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import { login, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Login() {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        
    })

    const {email, password} = formData

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {user, isLoading, isError, isSuccess, message} = useSelector(state => state.auth)

    useEffect(() => {
        if(isError) {
            toast.error(message)
        }

        // redirect when logged in
        if(isSuccess || user) {
            navigate('/dashboard')
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

        const userData = {  
            email,
            password
        }

        dispatch(login(userData))

    }

    if(isLoading) {
        return <Spinner />
    }

  return (
    <>
    <section className="form">
        <form onSubmit={onSubmit}>
            
            <div className='form-group'>
                <input type="email" className='form-control' id='email' name='email' value={email} onChange={onChange} placeholder='Email' required/>
            </div>
            <div className='form-group'>
                <input type="password" className='form-control' id='password' name='password' value={password} onChange={onChange} placeholder='Lozinka' required/>
            </div>
            <div className='form-group'>
                <button className='btn btn-block' type='submit'>Submit</button>
            </div>
        </form>
    </section>
    </>
  )
}

export default Login