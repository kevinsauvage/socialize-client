import './Post.scss'
import Avatar from '../avatar/Avatar'
import PostStats from '../postStats/PostStats'
import Comment from './../comment/Comment'
import { useCallback, useContext, useEffect, useState } from 'react'
import { getDataFromTimestamp } from '../../helpers/getDataFromTimestamp'
import AddComment from '../addComment/AddComment'
import EditionBtns from '../editionBtns/EditionBtns'
import { PostContext } from './../../context/PostContext'
import { AuthContext } from './../../context/AuthContext'
import ReactPlayer from 'react-player'
import { Link } from 'react-router-dom'
import { CommentContext } from '../../context/CommentContext'
import { imageUrl } from '../../helpers/upload'

const Post = ({ post, newPostImg }) => {
  const [comments, setComments] = useState([])
  const [comment, setComment] = useState()
  const { deletePost } = useContext(PostContext)
  const { commentPost } = useContext(CommentContext)
  const { getComments } = useContext(CommentContext)
  const { user } = useContext(AuthContext)

  const handleGetComment = useCallback(
    async (id, opt) => {
      const res = await getComments(id, opt)
      const data = await res.json()
      return setComments(data)
    },
    [getComments],
  )

  useEffect(() => {
    const abortCtrl = new AbortController()
    handleGetComment(post._id, abortCtrl.signal)
    return () => abortCtrl.abort()
  }, [post._id, handleGetComment])

  const handleSubmit = async () => {
    const res = await commentPost(comment, post._id, post.authorId)
    if (res.ok) {
      setComment('')
      return handleGetComment(post._id)
    } else {
      return window.alert('Something went wrong, try again')
    }
  }

  return (
    <div className="post">
      {user?._id === post?.authorId && (
        <EditionBtns handleDelete={() => deletePost(post._id)} />
      )}

      <header className="post__header">
        <Avatar avatarImg={`${imageUrl.avatar}${post.authorId}.jpg`} />
        <div className="post__detail">
          <Link to={`/user/${post?.authorId}`}>
            <h2 className="post__username">{post?.authorName}</h2>
          </Link>
          <i className="post__published">
            {getDataFromTimestamp(post.createdAt)}
          </i>
        </div>
      </header>

      <div className="post__content">
        <p className="post__description">{post.body}</p>

        {post.image && <img src={post.image} alt="post img" />}

        {post.video && (
          <ReactPlayer
            url={post.video}
            controls={true}
            width={'100%'}
            className="videoPlayer"
          />
        )}

        {newPostImg && <img src={newPostImg} alt="post img" />}

        <PostStats
          totalComment={comments.length}
          likes={post.likes}
          postId={post._id}
        />
      </div>

      <div className="post__comments">
        {comments?.map((comment) => (
          <Comment key={comment._id} comment={comment} post={post} />
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
