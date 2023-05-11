import React from 'react'
import { useParams } from 'react-router-dom'
import PersonalAmn from '../components/PersonalAmn'
import FamilyAmn from '../components/FamilyAmn'
import ReproductiveAmn from '../components/ReproductiveAmn'
import Notes from '../components/Notes'
import InfoPregnant from '../components/InfoPregnant'

function UserProfile() {

  const params = useParams()

  return (
    <div>
      <h1>User Profile</h1>
      <PersonalAmn  user_id={params.id}/>
      <FamilyAmn user_id={params.id} />
      <ReproductiveAmn user_id={params.id} />
      <Notes user_id={params.id} />
      <InfoPregnant user_id={params.id} />
    </div>
  )
}

export default UserProfile