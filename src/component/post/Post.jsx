import Avatar from '../avatar/Avatar'
import './Post.scss'
import Img from '../../img/avatar.jpg'
import PostStats from '../postStats/PostStats'
import Comment from './../comment/Comment'
import { useCallback, useContext, useEffect, useState } from 'react'
import { fetchUrl } from './../../helpers/fetch'
import { AuthContext } from './../../context/AuthContext'
import { getDataFromTimestamp } from '../../helpers/getDataFromTimestamp'

const Post = ({ post }) => {
  const [comment, setComment] = useState()
  const [comments, setComments] = useState([])
  const { user } = useContext(AuthContext)

  const handleSubmit = () => {
    fetchUrl('comment', {
      method: 'POST',
      body: JSON.stringify({
        body: comment,
        authorId: `${user?.id}`,
        authorName: `${user?.firstName} ${user?.lastName}`,
        parentCommentId: '',
        postId: post._id,
      }),
    })
      .then((res) => {
        if (res.ok) {
          setComment('')
        }
      })
      .finally(() => getComments())
  }

  const getComments = useCallback(() => {
    fetchUrl(`comment/${post._id}`)
      .then((res) => res.json())
      .then((data) => setComments(data))
  }, [post])

  useEffect(() => {
    getComments()
  }, [getComments])

  return (
    <div className="post">
      <header className="post__header">
        <Avatar />
        <div className="post__detail">
          <h2 className="post__username">{post.authorName}</h2>
          <i className="post__published">
            {getDataFromTimestamp(post.createdAt)}
          </i>
        </div>
      </header>
      <div className="post__content">
        <img src={Img} alt="post img" />
        <p className="post__description">{post.body}</p>
        <PostStats totalComment={comments.length} />
      </div>
      <div className="post__comments">
        {comments?.map((comment) => (
          <Comment comment={comment} />
        ))}
      </div>
      <div className="post__add-comment">
        <Avatar />
        <textarea
          type="text"
          placeholder="Post your comment"
          className="post__input"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
      <button onClick={handleSubmit}>Comment</button>
    </div>
  )
}

export default Post
