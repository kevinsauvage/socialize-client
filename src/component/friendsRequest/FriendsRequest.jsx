import BlocTitle from '../blocTitle/BlocTitle'
import './FriendsRequest.scss'
import { AuthContext } from './../../context/AuthContext'
import { useContext, useState } from 'react'
import FriendCard from '../friendsCards/FriendCard'
import { useEffect } from 'react'

const FriendsRequest = () => {
  const { user, searchByIds } = useContext(AuthContext)
  const [friends, setFriends] = useState([])

  useEffect(() => {
    searchByIds(user.friendsRequests)
      .then((res) => res.json())
      .then((data) => setFriends(data))
  }, [user, searchByIds])

  return (
    <div className="FriendsRequest">
      <BlocTitle text="Friend Requests" />
      {friends.length > 0 ? (
        friends?.map((friend) => (
          <FriendCard key={friend._id} friend={friend} />
        ))
      ) : (
        <p>There is no friend request for now.</p>
      )}
    </div>
  )
}

export default FriendsRequest
