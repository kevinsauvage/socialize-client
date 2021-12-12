import './Header.scss'
import { useContext, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import {
  RiDiscussLine,
  RiHome2Line,
  RiLogoutCircleRLine,
  RiNotification2Line,
  RiUser3Line,
} from 'react-icons/ri'

import { ImSearch } from 'react-icons/im'
import useForm from './../../hooks/useForm'
import NotificationDropDown from '../../component/notificationDropDown/NotificationDropDown'
import { NotificationContext } from '../../context/NotificationContext'
import { AuthContext } from '../../context/AuthContext'

const Header = () => {
  const history = useHistory()
  const { getUserNotification, userNotification } = useContext(
    NotificationContext,
  )
  const { user, logout } = useContext(AuthContext)
  const [displayNotification, setDisplayNotification] = useState(false)
  const [totalNotif, setTotalNotif] = useState(0)

  const submitCallback = (data) => {
    history.push({
      pathname: `/search`,
      state: data.search,
    })
  }

  const { formData, handleInputChange, handleSubmit } = useForm(
    {
      search: '',
    },
    submitCallback,
  )

  useEffect(() => user && getUserNotification(), [getUserNotification, user])

  useEffect(() => {
    if (!userNotification || userNotification.length === 0) return
    let total = 0

    userNotification.forEach((item) => {
      if (item.consulted === false) {
        total = total + 1
      } else return
    })
    setTotalNotif(total)
  }, [userNotification])

  const handleClose = () => setDisplayNotification(false)

  return (
    <header className="header">
      <div className="header__logo">
        <Link to="/">Socialize</Link>
      </div>
      <div className="header__content">
        <form
          action="search"
          className="header__search"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Search friend"
            className="header__input"
            name="search"
            value={formData.search}
            onChange={handleInputChange}
          />
          <ImSearch size={22} className="header__search-icon" />
        </form>
        <nav>
          <ul className="header__icons">
            <li className="header__icon">
              <Link to="/">
                <RiHome2Line size={22} />
              </Link>
            </li>
            <li className="header__icon">
              <div
                className="header__icon-wrapper"
                onClick={() => setDisplayNotification(!displayNotification)}
              >
                {totalNotif !== 0 && <span>{totalNotif}</span>}
                <RiNotification2Line size={22} />
              </div>
              {displayNotification && (
                <NotificationDropDown handleClose={handleClose} />
              )}
            </li>
            <li className="header__icon">
              <Link to="/">
                <RiDiscussLine size={22} />
              </Link>
            </li>
            <li className="header__icon">
              <Link to="/profil/timeline">
                <RiUser3Line size={22} />
              </Link>
            </li>
            {user && (
              <li className="header__icon" onClick={() => logout()}>
                <RiLogoutCircleRLine size={22} />
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
