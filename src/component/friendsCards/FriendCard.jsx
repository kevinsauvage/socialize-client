import './FriendCard.scss'
import defaultImg from '../../img/avatarDefault.png'

const FriendCard = ({ user, onClick, btnText }) => {
  return (
    <div className="FriendCard">
      <div className="FriendCard__left">
        <img
          src={user.image || defaultImg}
          alt="user avatar"
          className="FriendCard__img"
        />
        <h2 className="FriendCard__name">
          {user.firstName} {user.lastName}
        </h2>
      </div>
      <button className="FriendCard__btn" onClick={() => onClick(user)}>
        {btnText}
      </button>
    </div>
  )
}

export default FriendCard
