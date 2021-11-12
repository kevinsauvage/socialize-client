import { useContext, useState } from 'react'
import { useEffect } from 'react'
import './Search.scss'
import { AuthContext } from './../../context/AuthContext'
import { useLocation } from 'react-router'
import EditInfo from './../../component/editInfo/EditInfo'
import Shortcuts from '../../component/shortcuts/Shortcuts'
import ProfilIntro from '../../component/profilIntro/ProfilIntro'
import FriendCard from '../../component/friendsCards/FriendCard'
import SidebarLeft from '../../layout/sidebarLeft/SidebarLeft'
import SidebarRight from '../../layout/sidebarRight/SidebarRight'
import BlocTitle from '../../component/blocTitle/BlocTitle'
import Header from './../../layout/header/Header'

const Search = () => {
  const { searchUsers, updateUser, user } = useContext(AuthContext)
  const location = useLocation()
  const [users, setUsers] = useState([])

  useEffect(() => {
    setUsers([])
    searchUsers(location.state)
      .then((res) => res.json())
      .then((users) => setUsers(users))
  }, [location.state, searchUsers])

  const handleAddFriend = async (friend) => {
    const { _id } = user
    if (friend?.friendsRequests?.includes(_id)) {
      window.alert('already friends')
      return
    }
    const objetToUpdate = {
      friendsRequests: [_id],
    }

    const res = await updateUser(objetToUpdate, friend)

    if (res.ok) {
      setUsers([])
      searchUsers(location.state)
        .then((res) => res.json())
        .then((users) => setUsers(users))
    }

    const data = await res.json()

    console.log(data)
  }

  useEffect(() => {
    users.length > 0 && console.log(users)
  }, [users])

  return (
    <div className="Search">
      <Header />

      <SidebarLeft />
      <aside>
        <EditInfo />
        <Shortcuts />
      </aside>
      <section>
        <ul className="Search__list">
          <BlocTitle text="Results" />
          {users.length > 0 &&
            users?.map((user) => (
              <li key={user.id}>
                <FriendCard
                  onClick={handleAddFriend}
                  user={user}
                  btnText="Add friend"
                />
              </li>
            ))}
        </ul>
      </section>
      <aside>
        <ProfilIntro />
      </aside>
      <SidebarRight />
    </div>
  )
}

export default Search
