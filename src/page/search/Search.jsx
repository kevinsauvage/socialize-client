import './Search.scss'
import { useContext, useState, useEffect } from 'react'
import { AuthContext } from './../../context/AuthContext'
import { useLocation } from 'react-router'
import EditInfo from './../../component/editInfo/EditInfo'
import Shortcuts from '../../component/shortcuts/Shortcuts'
import ProfilIntro from '../../component/profilIntro/ProfilIntro'
import FriendCard from '../../component/friendsCards/FriendCard'
import BlocTitle from '../../component/blocTitle/BlocTitle'
import Header from './../../layout/header/Header'
import { useCallback } from 'react'
import PageMain from '../../layout/PageMain/PageMain'
import useIsBottom from '../../hooks/useIsBottom'

const Search = () => {
  const { searchUsers, user, setLimit } = useContext(AuthContext)
  const location = useLocation()
  const [users, setUsers] = useState([])
  const bottom = useIsBottom()

  useEffect(() => window.scrollTo(0, 0), [])

  const handleSearch = useCallback(() => {
    return searchUsers(location.state)
      .then((res) => res && res.ok && res.json())
      .then((users) => users && setUsers(users))
  }, [location, searchUsers])

  useEffect(() => handleSearch(), [handleSearch])
  useEffect(() => bottom && setLimit((prev) => prev + 10), [bottom, setLimit])

  return (
    <div className="Search">
      <Header />
      <PageMain>
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
      </PageMain>
    </div>
  )
}

export default Search
