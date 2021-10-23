import './ListItem.scss'

const ListItem = ({ icon, text }) => {
  return (
    <li className="listItem">
      {icon}
      <p className="listItem__text">{text}</p>
    </li>
  )
}

export default ListItem
