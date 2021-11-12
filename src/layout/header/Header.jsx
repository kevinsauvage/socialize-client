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
import useForm from './../../hooks/useForm'
import { useHistory } from 'react-router'

const Header = () => {
  const history = useHistory()

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

  return (
    <header className="header">
      <form style={{ display: 'none' }}>
        <input type="file" id="fileDialogId" />
      </form>
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
