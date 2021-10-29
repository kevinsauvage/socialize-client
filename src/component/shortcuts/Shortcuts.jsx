import BlocTitle from '../blocTitle/BlocTitle'
import './Shortcuts.scss'
import {
  MdMessage,
  MdNotificationsNone,
  MdPeople,
  MdQueryStats,
  MdLogout,
} from 'react-icons/md/index'
import {
  AiOutlineVideoCameraAdd,
  AiOutlineFileImage,
} from 'react-icons/ai/index'
import { ImFilesEmpty } from 'react-icons/im/index'
import ListItem from '../listItem/ListItem'
import { useContext } from 'react'
import { AuthContext } from './../../context/AuthContext'

const Shortcuts = () => {
  const { logout } = useContext(AuthContext)

  return (
    <div className="shortcuts">
      <BlocTitle text="Shortcuts" />
      <ul className="shortcuts__list">
        <ListItem icon={<MdMessage />} text="Inbox" />
        <ListItem icon={<ImFilesEmpty />} text="My Pages" />
        <ListItem icon={<MdPeople />} text="Friends" />
        <ListItem icon={<AiOutlineFileImage />} text="Image" />
        <ListItem icon={<AiOutlineVideoCameraAdd />} text="Vidéo" />
        <ListItem icon={<MdNotificationsNone />} text="Notifications" />
        <ListItem icon={<MdQueryStats />} text="Statistics" />
        <ListItem icon={<MdLogout />} onClick={logout} text="Logout" />
      </ul>
    </div>
  )
}

export default Shortcuts
