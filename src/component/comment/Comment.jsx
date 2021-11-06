import { getDataFromTimestamp } from '../../helpers/getDataFromTimestamp'
import Avatar from '../avatar/Avatar'
import './Comment.scss'
import { FaComments } from 'react-icons/fa/index'
import { useCallback, useContext, useEffect, useState } from 'react'
import AddComment from '../addComment/AddComment'
import { fetchUrl } from './../../helpers/fetch'
import { AuthContext } from './../../context/AuthContext'

const Comment = ({ comment }) => {
  const [addComment, setAddComment] = useState(false)
  const [subComment, setSubComment] = useState('')
  const [subComments, setSubComments] = useState([])

  const { user } = useContext(AuthContext)

  const handleSubmit = async () => {
    const res = await fetchUrl('comment', {
      method: 'POST',
      body: JSON.stringify({
        body: subComment,
        authorId: `${user?.id}`,
        authorName: `${user?.firstName} ${user?.lastName}`,
        parentCommentId: comment._id,
      }),
    })

    if (res.ok) {
      setSubComment('')
      getSubComments()
    }
  }

  const getSubComments = useCallback(() => {
    fetchUrl(`subComment/${comment._id}`)
      .then((res) => res.json())
      .then((data) => setSubComments(data))
  }, [])

  useEffect(() => getSubComments(), [getSubComments])

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
