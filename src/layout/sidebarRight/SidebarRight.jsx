import './SidebarRight.scss'
import Avatar from '../../component/avatar/Avatar'
import { AuthContext } from './../../context/AuthContext'
import { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'

const SidebarRight = () => {
  const { user, findUsers } = useContext(AuthContext)
  const [friends, setFriends] = useState([])

  useEffect(() => {
    user &&
      findUsers(user.friends)
        .then((res) => res.json())
        .then((data) => setFriends(data))
  }, [user, findUsers])

  return (
    <div className="sidebarRight">
      {friends.length !== 0 &&
        friends.map((friend) => (
          <Link key={friend._id} to={`/user/${friend._id}`}>
            <Avatar avatarImg={friend?.avatar} />
          </Link>
        ))}
    </div>
  )
}

export default SidebarRight
