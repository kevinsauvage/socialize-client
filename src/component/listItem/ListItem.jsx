import { NavLink } from 'react-router-dom'
import './ListItem.scss'

const ListItem = ({ icon, text, onClick, to, activeClassName }) => {
  return (
    <li className="listItem" onClick={() => onClick && onClick()}>
      {icon}
      {to ? (
        <NavLink
          to={to}
          activeClassName="listItem__link--active"
          className="listItem__link"
        >
          {text}
        </NavLink>
      ) : (
        <p className="listItem__text">{text}</p>
      )}
    </li>
  )
}

export default ListItem
