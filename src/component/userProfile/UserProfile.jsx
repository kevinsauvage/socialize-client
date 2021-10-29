import './UserProfile.scss'
import BlocTitle from '../blocTitle/BlocTitle'
import Avatar from '../avatar/Avatar'
import { useContext } from 'react'
import { AuthContext } from './../../context/AuthContext'

const UserProfile = () => {
  const { user } = useContext(AuthContext)

  return (
    <div className="userProfile">
      <BlocTitle text="Your profile" />
      <div className="userProfile__container">
        <Avatar />
        <div className="userProfile__name">
          <h5 className="userProfile__firstname">{user?.firstName}</h5>
          <h2 className="userProfile__lastname">{user?.lastName}</h2>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
