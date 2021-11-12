import BlocTitle from '../blocTitle/BlocTitle'
import './FriendsRequest.scss'
import { AuthContext } from './../../context/AuthContext'
import { useContext, useState } from 'react'
import FriendCard from '../friendsCards/FriendCard'
import { useEffect } from 'react/cjs/react.development'

const FriendsRequest = () => {
  const { user, searchByIds } = useContext(AuthContext)
  const [friends, setFriends] = useState([])

  useEffect(() => {
    user?.friendsRequests?.length > 0 &&
      searchByIds(user.friendsRequests)
        .then((res) => res.json())
        .then((data) => setFriends(data))
  }, [user, searchByIds])

  const handleAccept = () => {}

  return (
    <div className="FriendsRequest">
      <BlocTitle text="Friend Requests" />
      {friends.length > 0 ? (
        friends?.map((friend) => (
          <FriendCard user={friend} btnText="Accept" onClick={handleAccept} />
        ))
      ) : (
        <p>There is no friend request for now.</p>
      )}
    </div>
  )
}

export default FriendsRequest
