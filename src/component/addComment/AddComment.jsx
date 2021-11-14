import { useContext } from 'react'
import Avatar from '../avatar/Avatar'
import './AddComment.scss'
import { AuthContext } from './../../context/AuthContext'

const AddComment = ({ value, handleSubmit, handleChange }) => {
  const { user } = useContext(AuthContext)

  return (
    <>
      <div className="add-comment">
        <Avatar avatarImg={user?.image} />
        <textarea
          type="text"
          placeholder="Post your comment"
          className={
            value
              ? 'add-comment__input add-comment__input--active'
              : 'add-comment__input'
          }
          value={value}
          onChange={handleChange}
        />
      </div>
      {value && (
        <button
          className="add-comment__send-btn"
          onClick={(e) => handleSubmit(e)}
        >
          Send
        </button>
      )}
    </>
  )
}

export default AddComment
