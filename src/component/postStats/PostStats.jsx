import './PostStats.scss'
import { GoCommentDiscussion } from 'react-icons/go'
import { RiDislikeLine, RiHeart3Line } from 'react-icons/ri'
import { useContext } from 'react'
import { PostContext } from '../../context/PostContext'
import { AuthContext } from '../../context/AuthContext'

const PostStats = ({ totalComment, likes, postId }) => {
  const { updatePost } = useContext(PostContext)
  const { updateUser, user } = useContext(AuthContext)

  const handleUpdateLikes = async () => {
    if (user.likedPost.includes(postId)) {
      const res = await updatePost({ likes: parseInt(likes) - 1 }, postId)
      if (res.ok)
        await updateUser(
          { likedPost: user.likedPost.filter((item) => item !== postId) },
          user,
        )
      const data = await res.json()
      console.log(data)
    } else {
      const res = await updatePost({ likes: parseInt(likes) + 1 }, postId)
      if (res.ok)
        await updateUser(
          {
            likedPost: user.likedPost ? [...user.likedPost, postId] : [postId],
          },
          user,
        )

      const data = await res.json()
      console.log(data)
    }
  }

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
        onClick={handleUpdateLikes}
      >
        {user?.likedPost.includes(postId) ? (
          <RiDislikeLine className="postStats__icon" />
        ) : (
          <RiHeart3Line className="postStats__icon" />
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
