import './SidebarRight.scss'
import AvatarImg from '../../img/avatar.jpg'
import Avatar from '../../component/avatar/Avatar'

const SidebarRight = () => {
  return (
    <div className="sidebarRight">
      {Array(8)
        .fill(null)
        .map((item) => {
          return <Avatar AvatarImg={AvatarImg} />
        })}
    </div>
  )
}

export default SidebarRight
