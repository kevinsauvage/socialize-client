import './ProfilIntro.scss'
import BlocTitle from './../blocTitle/BlocTitle'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import Avatar from '../avatar/Avatar'

const ProfilIntro = () => {
  const { user, userAvatar } = useContext(AuthContext)

  return (
    <div className="profilIntro">
      <BlocTitle text="Profil Intro" />
      <div className="profilIntro__username">
        <Avatar AvatarImg={userAvatar} />
        <div className="profilIntro__name">
          <h5 className="profilIntro__firstname">{user?.firstName}</h5>
          <h2 className="profilIntro__lastname">{user?.lastName}</h2>
        </div>
      </div>
      <div>
        <div className="profilIntro__box profilIntro__box--about">
          <h6 className="profilIntro__box-title">About</h6>
          {user?.description ? (
            <p>{user.description}</p>
          ) : (
            <p>No description added yet</p>
          )}
        </div>
        <div className="profilIntro__box profilIntro__box--city">
          <h6 className="profilIntro__box-title">City</h6>
          {user?.city ? <p>{user.city}</p> : <p>No city added yet</p>}
        </div>
        <div className="profilIntro__box profilIntro__box--birthday">
          <h6 className="profilIntro__box-title">Birthday</h6>
          {user?.birthday ? (
            <p>{user.birthday}</p>
          ) : (
            <p>No birthday added yet</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProfilIntro
