import './MyFriends.scss'
import BlocTitle from './../blocTitle/BlocTitle'
import { useContext } from 'react'
import { AuthContext } from './../../context/AuthContext'
import FriendCard from './../friendsCards/FriendCard'

const MyFriends = () => {
  const { user } = useContext(AuthContext)

  return (
    <div className="MyFriends">
      <BlocTitle text="My Friends" />
      {user?.friends.length > 0 ? (
        user?.friends?.map((friendId) => <FriendCard id={friendId} />)
      ) : (
        <p>You don't have any friends here yet.</p>
      )}
    </div>
  )
}

export default MyFriends
