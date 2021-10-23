import Avatar from '../avatar/Avatar'
import BlocTitle from '../blocTitle/BlocTitle'
import './InviteFriends.scss'

const InviteFriends = () => {
  return (
    <div className="inviteFriends">
      <BlocTitle text="Invite Friends" />
      <div className="inviteFriends__container">
        <Avatar name="Oliver doe" style={{ width: '33%' }} />
        <Avatar name="Oliver doe" style={{ width: '33%' }} />
        <Avatar name="Oliver doe" style={{ width: '33%' }} />
        <Avatar name="Oliver doe" style={{ width: '33%' }} />
        <Avatar name="Oliver doe" style={{ width: '33%' }} />
        <Avatar name="Oliver doe" style={{ width: '33%' }} />
      </div>
    </div>
  )
}

export default InviteFriends
