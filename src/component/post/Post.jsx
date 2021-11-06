import './Post.scss'
import Avatar from '../avatar/Avatar'
import PostStats from '../postStats/PostStats'
import Comment from './../comment/Comment'
import { useCallback, useEffect, useState } from 'react'
import { fetchUrl } from './../../helpers/fetch'
import { getDataFromTimestamp } from '../../helpers/getDataFromTimestamp'
import AddComment from '../addComment/AddComment'

const Post = ({ post, newPostImg }) => {
  const [comments, setComments] = useState([])

  const getComments = useCallback(() => {
    fetchUrl(`comment/${post._id}`)
      .then((res) => res.json())
      .then((data) => setComments(data))
  }, [post])

  useEffect(() => getComments(), [getComments])

  return (
    <div className="post">
      <header className="post__header">
        <Avatar AvatarImg={post.authorAvatar} />
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
      <AddComment post={post} getComments={getComments} />
    </div>
  )
}

export default Post
