import './Search.scss'
import { useContext, useState, useEffect } from 'react'
import { AuthContext } from './../../context/AuthContext'
import { useLocation } from 'react-router'
import EditInfo from './../../component/editInfo/EditInfo'
import Shortcuts from '../../component/shortcuts/Shortcuts'
import ProfilIntro from '../../component/profilIntro/ProfilIntro'
import FriendCard from '../../component/friendsCards/FriendCard'
import SidebarRight from '../../layout/sidebarRight/SidebarRight'
import BlocTitle from '../../component/blocTitle/BlocTitle'
import Header from './../../layout/header/Header'
import { useCallback } from 'react'

const Search = () => {
  const { searchUsers, user } = useContext(AuthContext)
  const location = useLocation()
  const [users, setUsers] = useState([])

  useEffect(() => window.scrollTo(0, 0), [])

  const handleSearch = useCallback(() => {
    setUsers([])
    return searchUsers(location.state)
      .then((res) => res.json())
      .then((users) => setUsers(users))
  }, [location, searchUsers])

  useEffect(() => handleSearch(), [handleSearch])

  return (
    <div className="Search">
      <Header />
      <aside>
        <EditInfo />
        <Shortcuts />
      </aside>
      <section>
        <ul className="Search__list">
          <BlocTitle text="Results" />
          {users.length > 0 &&
            users?.map((us, i) => {
              if (user._id === us._id) return null
              return (
                <li key={i}>
                  <FriendCard friend={us} callback={handleSearch} />
                </li>
              )
            })}
        </ul>
      </section>
      <aside>
        <ProfilIntro user={user} />
      </aside>
      <SidebarRight />
    </div>
  )
}

export default Search
