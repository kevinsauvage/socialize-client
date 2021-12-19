import BlocTitle from '../blocTitle/BlocTitle'
import './Shortcuts.scss'
import { MdPeople, MdLogout, MdOutlineDynamicFeed } from 'react-icons/md'
import { AiOutlineVideoCameraAdd, AiOutlineFileImage } from 'react-icons/ai'
import { SiAboutdotme } from 'react-icons/si'
import ListItem from '../listItem/ListItem'
import { useContext } from 'react'
import { AuthContext } from './../../context/AuthContext'

const Shortcuts = () => {
  const { logout } = useContext(AuthContext)

  return (
    <div className="shortcuts">
      <BlocTitle text="Shortcuts" />
      <ul className="shortcuts__list">
        <ListItem
          scrollTop={true}
          icon={<MdOutlineDynamicFeed />}
          text="Timeline"
          to="/profil/timeline"
        />
        <ListItem
          scrollTop={true}
          icon={<AiOutlineFileImage />}
          text="Photos"
          to="/profil/photos"
        />
        <ListItem
          scrollTop={true}
          icon={<AiOutlineVideoCameraAdd />}
          text="Vidéos"
          to="/profil/videos"
        />
        <ListItem
          scrollTop={true}
          icon={<MdPeople />}
          text="Friends"
          to="/profil/friends"
        />
        <ListItem
          scrollTop={true}
          icon={<SiAboutdotme />}
          text="About"
          to="/profil/about"
        />
        <ListItem
          scrollTop={true}
          icon={<MdLogout />}
          onClick={logout}
          text="Logout"
        />
      </ul>
    </div>
  )
}

export default Shortcuts
