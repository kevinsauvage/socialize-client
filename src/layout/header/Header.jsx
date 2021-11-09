import './Header.scss'
import {
  RiDiscussLine,
  RiHome2Line,
  RiNotification2Line,
  RiUser3Line,
  RiMenuFoldLine,
} from 'react-icons/ri'

import { ImSearch } from 'react-icons/im'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="header">
      <form style={{ display: 'none' }}>
        <input type="file" id="fileDialogId" />
      </form>
      <div className="header__logo">
        <Link to="/">Socialize</Link>
      </div>
      <div className="header__content">
        <form action="search" className="header__search">
          <input
            type="text"
            placeholder="Search friend"
            className="header__input"
          />
          <ImSearch size={22} className="header__search-icon" />
        </form>
        <nav>
          <ul className="header__icons">
            <li className="header__icon">
              <RiHome2Line size={22} />
            </li>
            <li className="header__icon">
              <RiNotification2Line size={22} />
            </li>
            <li className="header__icon">
              <RiDiscussLine size={22} />
            </li>
            <li className="header__icon">
              <Link to="/profil/timeline">
                <RiUser3Line size={22} />
              </Link>
            </li>
            <li className="header__icon">
              <RiMenuFoldLine size={22} />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
