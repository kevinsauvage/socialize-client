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
import ReactPlayer from 'react-player'
import { Link } from 'react-router-dom'

const Post = ({ post, newPostImg }) => {
  const [comments, setComments] = useState([])
  const [comment, setComment] = useState()
  const [author, setAuthor] = useState(undefined)
  const { deletePost, commentPost } = useContext(PostContext)
  const { user, findOne } = useContext(AuthContext)

  const getComments = useCallback(() => {
    fetchUrl(`comment/${post._id}`)
      .then((res) => res.json())
      .then((data) => setComments(data))
  }, [post])

  useEffect(() => {
    findOne(post.authorId).then((data) => setAuthor(data))
  }, [findOne, post.authorId])

  useEffect(() => {
    getComments()
  }, [getComments])

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
        <Avatar avatarImg={author?.avatar} />
        <div className="post__detail">
          <Link to={`/user/${post?.authorId}`}>
            <h2 className="post__username">{author?.username}</h2>
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
