import './UserProfile.scss'
import BlocTitle from '../blocTitle/BlocTitle'
import Avatar from '../avatar/Avatar'
import { useContext } from 'react'
import { AuthContext } from './../../context/AuthContext'

const UserProfile = () => {
  const { storedUser } = useContext(AuthContext)
  console.log(storedUser)
  return (
    <div className="userProfile">
      <BlocTitle text="Your profile" />
      <div className="userProfile__container">
        <Avatar />
        <div className="userProfile__name">
          <h5 className="userProfile__firstname">{storedUser?.firstName}</h5>
          <h2 className="userProfile__lastname">{storedUser?.lastName}</h2>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
