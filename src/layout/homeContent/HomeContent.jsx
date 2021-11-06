import Shortcuts from '../../component/shortcuts/Shortcuts'
import './HomeContent.scss'
import Friends from '../../component/friends/Friends'
import LastNotification from './../../component/lastNotification/LastNotification'
import InviteFriends from './../../component/inviteFriends/InviteFriends'
import EditInfo from './../../component/editInfo/EditInfo'
import Feed from '../feed/Feed'
import { useContext } from 'react'
import { PostContext } from './../../context/PostContext'
import ProfilIntro from '../../component/profilIntro/ProfilIntro'

const HomeContent = () => {
  const { posts } = useContext(PostContext)

  return (
    <div className="homeContent">
      <aside className="homeContent__sidebar">
        <EditInfo />
        <Friends />
        <LastNotification />
      </aside>
      <div className="homecontent__central">
        <Feed posts={posts} />
      </div>
      <aside className="homeContent__sidebar">
        <ProfilIntro />
        <Shortcuts />
        <InviteFriends />
      </aside>
    </div>
  )
}

export default HomeContent
