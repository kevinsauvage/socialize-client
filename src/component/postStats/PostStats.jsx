import './PostStats.scss'
import { GoCommentDiscussion } from 'react-icons/go'
import { RiDislikeLine, RiHeart3Line } from 'react-icons/ri'
import { useContext } from 'react'
import { PostContext } from '../../context/PostContext'
import { AuthContext } from '../../context/AuthContext'

const PostStats = ({ totalComment, likes, postId }) => {
  const { handleLike, handleUnlike } = useContext(PostContext)
  const { user } = useContext(AuthContext)

  return (
    <ul className="postStats">
      <li className="postStats__item postStats__item--comment">
        <GoCommentDiscussion className="postStats__icon" />
        <p className="postStats__value">{totalComment}</p>
      </li>
      <li
        className={
          !user?.likedPost.includes(postId)
            ? 'postStats__item postStats__item--like'
            : 'postStats__item postStats__item--like--unlike'
        }
      >
        {user?.likedPost.includes(postId) ? (
          <div onClick={() => handleUnlike(postId)}>
            <RiDislikeLine className="postStats__icon" />
          </div>
        ) : (
          <div onClick={() => handleLike(postId)}>
            <RiHeart3Line className="postStats__icon" />
          </div>
        )}
        <p className="postStats__value">{likes}</p>
      </li>
      <li className="postStats__item postStats__item--share">
        <button>Share</button>
      </li>
    </ul>
  )
}

export default PostStats
