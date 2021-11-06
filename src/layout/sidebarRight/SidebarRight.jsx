import './SidebarRight.scss'
import Avatar from '../../component/avatar/Avatar'

const SidebarRight = () => {
  return (
    <div className="sidebarRight">
      {Array(8)
        .fill(null)
        .map((item, i) => {
          return <Avatar key={i} />
        })}
    </div>
  )
}

export default SidebarRight
