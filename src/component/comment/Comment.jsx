import './Comment.scss'
import { useCallback, useContext, useEffect, useState } from 'react'
import { getDataFromTimestamp } from '../../helpers/getDataFromTimestamp'
import { FaComments } from 'react-icons/fa'
import Avatar from '../avatar/Avatar'
import AddComment from '../addComment/AddComment'
import { CommentContext } from '../../context/CommentContext'

const Comment = ({ comment }) => {
  const [addComment, setAddComment] = useState(false)
  const [subComment, setSubComment] = useState('')
  const [subComments, setSubComments] = useState([])
  const { getSubComments, sendSubComment } = useContext(CommentContext)

  const handleGetSubcomment = useCallback(
    (id) => {
      getSubComments(id)
        .then((res) => res.json())
        .then((data) => setSubComments(data))
    },
    [getSubComments],
  )

  useEffect(() => {
    handleGetSubcomment(comment._id)
  }, [handleGetSubcomment, comment])

  const handleSubmit = async () => {
    const res = await sendSubComment(subComment, comment._id)
    if (res.ok) {
      console.log('getsub')
      handleGetSubcomment(comment._id)
      setSubComment('')
    }
  }

  const handleChange = (e) => setSubComment(e.target.value)

  return (
    <div className="comment">
      <div className="comment__container">
        <Avatar />
        <div className="comment__content">
          <div className="comment__wrapper">
            <div className="comment__detail">
              <h5>{comment?.authorName}</h5>
              <i className="comment__published">
                {getDataFromTimestamp(comment.createdAt)}
              </i>
              <div
                className="comment__add-btn"
                onClick={() => setAddComment(!addComment)}
              >
                {!comment.parentCommentId && <FaComments />}
              </div>
            </div>
            <div className="comment__text">
              <p>{comment?.body}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="comment__subcomment">
        {subComments.map((comment) => (
          <Comment key={comment._id} comment={comment} />
        ))}
        {addComment && (
          <AddComment
            value={subComment}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
          />
        )}
      </div>
    </div>
  )
}

export default Comment
