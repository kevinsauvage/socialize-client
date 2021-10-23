import './Avatar.scss'
import AvatarDefault from '../../img/avatarDefault.png'

const Avatar = ({ AvatarImg, name, ...rest }) => {
  return (
    <div className="avatar" {...rest}>
      <img
        src={AvatarImg ? AvatarImg : AvatarDefault}
        alt="avatar"
        className="avatar__img"
      />
      {name && <p className="avatar__name">{name}</p>}
    </div>
  )
}

export default Avatar
