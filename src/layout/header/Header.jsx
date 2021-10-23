import './Header.scss'
import {
  RiDiscussLine,
  RiHome2Line,
  RiNotification2Line,
  RiUser3Line,
  RiMenuFoldLine,
} from 'react-icons/ri'

import { ImSearch } from 'react-icons/im'

const Header = () => {
  return (
    <header className="header">
      <div className="header__logo">Socialize</div>
      <div className="header__content">
        <form action="search" className="header__search">
          <input
            type="text"
            placeholder="Search friend"
            className="header__input"
          />
          <ImSearch size={22} className="header__search-icon" />
        </form>
        <div className="header__icons">
          <div className="header__icon">
            <RiHome2Line size={22} />
          </div>
          <div className="header__icon">
            <RiNotification2Line size={22} />
          </div>
          <div className="header__icon">
            <RiDiscussLine size={22} />
          </div>
          <div className="header__icon">
            <RiUser3Line size={22} />
          </div>
          <div className="header__icon">
            <RiMenuFoldLine size={22} />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
