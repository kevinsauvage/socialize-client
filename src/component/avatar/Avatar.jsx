import './Avatar.scss'

const Avatar = ({ AvatarImg, contact }) => {
  return (
    <div className="avatar">
      <img src={AvatarImg} alt="avatar" className="avatar__img" />
    </div>
  )
}

export default Avatar
