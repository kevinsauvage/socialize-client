import './SidebarLeft.scss'
import {
  MdFavorite,
  MdMessage,
  MdNotificationsNone,
  MdOutlineDynamicFeed,
  MdPeople,
  MdQueryStats,
  MdSettings,
} from 'react-icons/md/index'
import { useState } from 'react'

const Icon = ({ Icon, detail }) => {
  const [hover, setHover] = useState()

  return (
    <div
      className="icon"
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
    >
      <span className="icon__svg">{<Icon />}</span>
      {hover && (
        <div className="icon__modal">
          <p className="icon__modal-text">{detail}</p>
        </div>
      )}
    </div>
  )
}

const SidebarLeft = () => {
  return (
    <div className="sidebarLeft">
      <Icon Icon={MdOutlineDynamicFeed} detail="Newsfeed" />
      <Icon Icon={MdFavorite} detail="Favorite" />
      <Icon Icon={MdQueryStats} detail="Account stats" />
      <Icon Icon={MdMessage} detail="Inbox" />
      <Icon Icon={MdSettings} detail="Settings" />
      <Icon Icon={MdPeople} detail="Friends" />
      <Icon Icon={MdNotificationsNone} detail="Notifications" />
    </div>
  )
}

export default SidebarLeft
