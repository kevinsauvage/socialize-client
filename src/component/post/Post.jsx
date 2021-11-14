import './Post.scss'
import Avatar from '../avatar/Avatar'
import PostStats from '../postStats/PostStats'
import Comment from './../comment/Comment'
import { useCallback, useContext, useEffect, useState } from 'react'
import { fetchUrl } from './../../helpers/fetch'
import { getDataFromTimestamp } from '../../helpers/getDataFromTimestamp'
import AddComment from '../addComment/AddComment'
import { AuthContext } from './../../context/AuthContext'

const Post = ({ post, newPostImg }) => {
  const [comments, setComments] = useState([])
  const [comment, setComment] = useState()
  const { user } = useContext(AuthContext)

  const getComments = useCallback(() => {
    fetchUrl(`comment/${post._id}`)
      .then((res) => res.json())
      .then((data) => setComments(data))
  }, [post])

  useEffect(() => getComments(), [getComments])

  const handleSubmit = async () => {
    const res = await fetchUrl('comment', {
      method: 'POST',
      body: JSON.stringify({
        body: comment,
        authorId: `${user?._id}`,
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
    <div className="post">
      <header className="post__header">
        <Avatar avatarImg={post.authorAvatar} />
        <div className="post__detail">
          <h2 className="post__username">{post.authorName}</h2>
          <i className="post__published">
            {getDataFromTimestamp(post.createdAt)}
          </i>
        </div>
      </header>
      <div className="post__content">
        <p className="post__description">{post.body}</p>
        {post.image && <img src={post.image} alt="post img" />}
        {newPostImg && <img src={newPostImg} alt="post img" />}
        <PostStats totalComment={comments.length} />
      </div>
      <div className="post__comments">
        {comments?.map((comment) => (
          <Comment key={comment._id} comment={comment} />
        ))}
      </div>
      <AddComment
        value={comment}
        getComments={getComments}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      />
    </div>
  )
}

export default Post
