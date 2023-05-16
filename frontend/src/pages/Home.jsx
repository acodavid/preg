import React, {useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {logout, reset, getUsers} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import { toast } from 'react-toastify'
import {format} from 'date-fns'
import { removeDataFromState } from '../features/personal/personSlice'
import { removeFamilyDataFromState } from '../features/family/familySlice'
import { removeReproductiveDataFromState } from '../features/reproductive/reproductiveSlice'
import { removeNotesDataFromState } from '../features/notes/notesSlice'
import { removeInfoDataFromState } from '../features/info/infoSlice'

function Home() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {user, users, isError, isLoading, message} = useSelector((state) => state.auth)

  useEffect(() => {
    if(!user) {
      navigate('/')
    } else {

      if(user.isAdmin) {
        dispatch(getUsers())
        dispatch(removeDataFromState())
        dispatch(removeFamilyDataFromState())
        dispatch(removeReproductiveDataFromState())
        dispatch(removeNotesDataFromState())
        dispatch(removeInfoDataFromState())
      } else {
        navigate(`/personal/details/${user._id}`)
      }  
    }

    if(isError) {
      toast.error(message)
    }
    
  }, [user, dispatch, navigate, isError, message])

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
            <tr>
            <th>Ime</th>
            <th>Email</th>
            <th>Broj telefona</th>
            <th>Datum rodjenja</th>
            <th></th>
            </tr>
            
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{format(new Date(user.dateOfBirth), 'dd.MM.yyyy.')}</td>
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