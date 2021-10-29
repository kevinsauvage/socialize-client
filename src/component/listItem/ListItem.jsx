import './ListItem.scss'

const ListItem = ({ icon, text, onClick }) => {
  return (
    <li className="listItem" onClick={() => onClick()}>
      {icon}
      <p className="listItem__text">{text}</p>
    </li>
  )
}

export default ListItem
