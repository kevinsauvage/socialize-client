import './MyFriends.scss'
import BlocTitle from './../blocTitle/BlocTitle'
import { useContext, useState } from 'react'
import { AuthContext } from './../../context/AuthContext'
import FriendCard from './../friendsCards/FriendCard'
import { useEffect } from 'react'

const MyFriends = () => {
  const { user, searchByIds } = useContext(AuthContext)
  const [friends, setFriends] = useState([])

  useEffect(() => {
    searchByIds(user.friends)
      .then((res) => res.json())
      .then((data) => setFriends(data))
  }, [user?.friends, searchByIds])

  return (
    <div className="MyFriends">
      <BlocTitle text="My Friends" />
      {friends.length > 0 ? (
        friends?.map((friend) => (
          <FriendCard key={friend._id} friend={friend} />
        ))
      ) : (
        <p>You don't have any friends here yet.</p>
      )}
    </div>
  )
}

export default MyFriends
