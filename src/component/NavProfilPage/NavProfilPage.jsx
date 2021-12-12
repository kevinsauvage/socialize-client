import { NavLink } from 'react-router-dom'
import './NavProfilPage.scss'

const NavProfilPage = ({ user }) => {
  return (
    <nav className="navProfilPage">
      <div className="navProfilPage__username">
        <h3>{user?.username}</h3>
      </div>
      <ul className="navProfilPage__list">
        <li className="navProfilPage__list-item">
          <NavLink
            activeClassName="navProfilPage__link--active"
            to="/profil/timeline"
          >
            Timeline
          </NavLink>
        </li>
        <li className="navProfilPage__list-item">
          <NavLink
            activeClassName="navProfilPage__link--active"
            to="/profil/inbox"
          >
            Inbox
          </NavLink>
        </li>
        <li className="navProfilPage__list-item">
          <NavLink
            activeClassName="navProfilPage__link--active"
            to="/profil/photos"
          >
            Photo
          </NavLink>
        </li>
        <li className="navProfilPage__list-item">
          <NavLink
            activeClassName="navProfilPage__link--active"
            to="/profil/videos"
          >
            Video
          </NavLink>
        </li>
        <li className="navProfilPage__list-item">
          <NavLink
            activeClassName="navProfilPage__link--active"
            to="/profil/friends"
          >
            Friends
          </NavLink>
          {user?.friendsRequests?.length !== 0 && (
            <span className="navProfilPage__list-item-hint">
              <p>{user?.friendsRequests?.length}</p>
            </span>
          )}
        </li>
        <li className="navProfilPage__list-item">
          <NavLink
            activeClassName="navProfilPage__link--active"
            to="/profil/about"
          >
            About
          </NavLink>
        </li>
        <li className="navProfilPage__list-item">
          <NavLink
            activeClassName="navProfilPage__link--active"
            to="/profil/edit/"
          >
            Edit
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default NavProfilPage
