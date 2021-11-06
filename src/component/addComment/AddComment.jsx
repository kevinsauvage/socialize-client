import Avatar from '../avatar/Avatar'
import './AddComment.scss'
import { fetchUrl } from './../../helpers/fetch'
import { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'

const AddComment = ({ post, getComments }) => {
  const [comment, setComment] = useState()
  const { user } = useContext(AuthContext)

  const handleSubmit = async () => {
    const res = await fetchUrl('comment', {
      method: 'POST',
      body: JSON.stringify({
        body: comment,
        authorId: `${user?.id}`,
        authorName: `${user?.firstName} ${user?.lastName}`,
        parentCommentId: '',
        postId: post._id,
      }),
    })

    if (res.ok) {
      setComment('')
      getComments()
    }
  }
  const handleChange = (e) => setComment(e.target.value)

  return (
    <>
      <div className="add-comment">
        <Avatar AvatarImg={user?.image} />
        <textarea
          type="text"
          placeholder="Post your comment"
          className={
            comment
              ? 'add-comment__input add-comment__input--active'
              : 'add-comment__input'
          }
          value={comment}
          onChange={handleChange}
        />
      </div>
      {comment && (
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
