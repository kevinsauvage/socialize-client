import './PostStats.scss'
import { GoCommentDiscussion } from 'react-icons/go/index'
import { RiHeart3Line } from 'react-icons/ri/index'

const PostStats = ({ totalComment }) => {
  return (
    <ul className="postStats">
      <li className="postStats__item postStats__item--comment">
        <GoCommentDiscussion className="postStats__icon" />
        <p className="postStats__value">{totalComment}</p>
      </li>
      <li className="postStats__item postStats__item--like">
        <RiHeart3Line className="postStats__icon" />
        <p className="postStats__value">2.2K</p>
      </li>
      <li className="postStats__item postStats__item--share">
        <button>Share</button>
      </li>
    </ul>
  )
}

export default PostStats
