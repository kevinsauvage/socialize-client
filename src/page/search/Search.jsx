import './Search.scss'
import { useContext, useState, useEffect } from 'react'
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
import { useCallback } from 'react'

const Search = () => {
  const { searchUsers } = useContext(AuthContext)
  const location = useLocation()
  const [users, setUsers] = useState([])

  const handleSearch = useCallback(() => {
    setUsers([])
    searchUsers(location.state)
      .then((res) => res.json())
      .then((users) => setUsers(users))
  }, [location, searchUsers])

  useEffect(() => {
    handleSearch()
  }, [handleSearch])

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
            users?.map((user, i) => (
              <li key={i}>
                <FriendCard friend={user} callback={handleSearch} />
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
