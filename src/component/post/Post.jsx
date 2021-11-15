import './Post.scss'
import Avatar from '../avatar/Avatar'
import PostStats from '../postStats/PostStats'
import Comment from './../comment/Comment'
import { useCallback, useContext, useEffect, useState } from 'react'
import { fetchUrl } from './../../helpers/fetch'
import { getDataFromTimestamp } from '../../helpers/getDataFromTimestamp'
import AddComment from '../addComment/AddComment'
import EditionBtns from '../editionBtns/EditionBtns'
import { PostContext } from './../../context/PostContext'
import { AuthContext } from './../../context/AuthContext'

const Post = ({ post, newPostImg }) => {
  const [comments, setComments] = useState([])
  const [comment, setComment] = useState()
  const { deletePost, commentPost } = useContext(PostContext)
  const { user } = useContext(AuthContext)

  const getComments = useCallback(() => {
    fetchUrl(`comment/${post._id}`)
      .then((res) => res.json())
      .then((data) => setComments(data))
  }, [post])

  useEffect(() => getComments(), [getComments])

  const handleSubmit = async () => {
    const res = await commentPost(comment, post._id)
    if (res.ok) {
      setComment('')
      getComments()
    }
  }

  return (
    <div className="post">
      {user?._id === post?.authorId && (
        <EditionBtns handleDelete={() => deletePost(post._id)} />
      )}
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
        handleChange={(e) => setComment(e.target.value)}
      />
    </div>
  )
}

export default Post
