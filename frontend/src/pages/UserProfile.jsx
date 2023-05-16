import React, {useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import PersonalAmn from '../components/PersonalAmn'
import FamilyAmn from '../components/FamilyAmn'
import ReproductiveAmn from '../components/ReproductiveAmn'
import Notes from '../components/Notes'
import InfoPregnant from '../components/InfoPregnant'
import { useSelector, useDispatch } from 'react-redux'
import {logout, reset} from '../features/auth/authSlice'
import { getPersonalData } from '../features/personal/personSlice'
import { getReproductiveData } from '../features/reproductive/reproductiveSlice'
import { getNotesData } from '../features/notes/notesSlice'
import { getInfoData } from '../features/info/infoSlice'
import { getFamilyData } from '../features/family/familySlice'

function UserProfile() {

  const params = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {user} = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  useEffect(() => {
    
    dispatch(getPersonalData(params.id))
    dispatch(getReproductiveData(params.id))
    dispatch(getNotesData(params.id))
    dispatch(getInfoData(params.id))
    dispatch(getFamilyData(params.id))
    
  }, [dispatch, params])
  

  return (
    <div>
      <h1>User Profile</h1>
      <PersonalAmn  user_id={params.id}/>
      <FamilyAmn user_id={params.id} />
      <ReproductiveAmn user_id={params.id} />
      <Notes user_id={params.id} />
      <InfoPregnant user_id={params.id} />
      {user && !user.isAdmin && <button className='btn btn-block' onClick={onLogout}>Odjavi se</button>}
    </div>
  )
}

export default UserProfile