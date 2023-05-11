import React, {useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {logout, reset, getUsers} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import { toast } from 'react-toastify'

function Home() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {user, users, isError, isLoading, isSuccess, message} = useSelector((state) => state.auth)

  useEffect(() => {
    if(!user) {
      navigate('/')
    } else {
      dispatch(getUsers())
    }

    if(isError) {
      toast.error(message)
    }
    
  }, [user, getUsers, dispatch, navigate, isError, message])

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  if(isLoading) {
    return <Spinner />
  }
 
  return (
    <>
      <section className='heading'>
        <h1>Home page</h1>
      </section>
      
      {users ? (
        <table>
          <thead>
            <th>Ime</th>
            <th>Email</th>
            <th>Broj telefona</th>
            <th>Datum rodjenja</th>
            <th></th>
          </thead>
          <tbody>
            {users.map(user => (
              <tr>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.dateOfBirth}</td>
                <td><Link to={`/personal/details/${user._id}`} className='btn btn-block'>Detalji</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (<div>List dodanih korisnika je prazna</div>)}

      <Link to='/register' className='btn btn-block'>Unesi korisnika</Link>

      {user ? (
        <button className='btn btn-block' onClick={onLogout}>Logout</button>
      ) : (null)}
    </>
  )
}

export default Home