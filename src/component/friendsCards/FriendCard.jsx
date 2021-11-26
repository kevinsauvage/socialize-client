import './FriendCard.scss'
import defaultImg from '../../img/avatarDefault.png'
import { useContext, useState } from 'react'
import { AuthContext } from './../../context/AuthContext'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const FriendCard = ({ friend, callback }) => {
  const {
    user,
    handleAcceptFriend,
    handleUnfriend,
    handleAddFriend,
    handleUnsedFriendRequest,
  } = useContext(AuthContext)

  const [areFriends, setAreFriends] = useState(false)
  const [askedAsFriends, setAskedAsFriends] = useState(false)
  const [sendFriendRequest, setSendFriendRequest] = useState(false)

  useEffect(() => {
    if (user?.friends?.includes(friend?._id)) setAreFriends(true)
    if (user?.friendsRequests?.includes(friend?._id)) setAskedAsFriends(true)
    if (friend?.friendsRequests?.includes(user?._id)) setSendFriendRequest(true)
  }, [user.friends, user.friendsRequests, user, friend])

  return (
    <div className="FriendCard">
      <div className="FriendCard__left">
        <img
          src={friend?.image || defaultImg}
          alt="user avatar"
          className="FriendCard__img"
        />
        <Link to={`/user/${friend?._id}`}>
          <h2 className="FriendCard__name">
            {friend?.firstName} {friend?.lastName}
          </h2>
        </Link>
      </div>

      {askedAsFriends && (
        <button
          className="FriendCard__btn"
          onClick={() => handleAcceptFriend(friend, callback)}
        >
          Accept
        </button>
      )}

      {areFriends && (
        <button
          className="FriendCard__btn"
          onClick={() => handleUnfriend(friend, callback)}
        >
          Unfriend
        </button>
      )}

      {!areFriends && !askedAsFriends && !sendFriendRequest && (
        <button
          className="FriendCard__btn"
          onClick={() => handleAddFriend(friend, callback)}
        >
          Add friend
        </button>
      )}

      {sendFriendRequest && (
        <button
          className="FriendCard__btn"
          onClick={() => handleUnsedFriendRequest(friend, callback)}
        >
          Unsend Request
        </button>
      )}
    </div>
  )
}

export default FriendCard
