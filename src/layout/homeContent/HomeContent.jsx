import Shortcuts from '../../component/shortcuts/Shortcuts'
import './HomeContent.scss'
import PostForm from './../../component/postForm/PostForm'
import UserProfile from '../../component/userProfile/UserProfile'
import Friends from '../../component/friends/Friends'
import LastNotification from './../../component/lastNotification/LastNotification'
import InviteFriends from './../../component/inviteFriends/InviteFriends'
import EditInfo from './../../component/editInfo/EditInfo'

const HomeContent = () => {
  return (
    <div className="homeContent">
      <aside className="homeContent__sidebar">
        <EditInfo />
        <LastNotification />
        <Friends />
      </aside>
      <div className="homecontent__central">
        <PostForm />
      </div>
      <aside className="homeContent__sidebar">
        <UserProfile />
        <Shortcuts />
        <InviteFriends />
      </aside>
    </div>
  )
}

export default HomeContent
