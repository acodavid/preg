import React, {useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {logout, reset} from '../features/auth/authSlice'

function Home() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {user} = useSelector((state) => state.auth)

  useEffect(() => {
    if(!user) {
      navigate('/')
    }
  }, [user])

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }
 
  return (
    <>
      <section className='heading'>
        <h1>Home page</h1>
      </section>

      <Link to='/register' className='btn btn-block'>Unesi korisnika</Link>

      {user ? (
        <button className='btn btn-block' onClick={onLogout}>Logout</button>
      ) : (null)}
    </>
  )
}

export default Home