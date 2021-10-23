import { useContext } from 'react'
import './PostForm.scss'
import { AuthContext } from './../../context/AuthContext'
import Avatar from '../avatar/Avatar'
import {
  AiOutlineFileImage,
  AiOutlineVideoCameraAdd,
} from 'react-icons/ai/index'

const PostForm = () => {
  const { storedUser } = useContext(AuthContext)

  return (
    <div className="postForm">
      <Avatar AvatarImg={storedUser?.img} />
      <form action="submit" className="postForm__form">
        <textarea
          name="postContent"
          rows="5"
          className="postForm__text-area"
          placeholder="Write something"
        ></textarea>
        <ul className="postForm__btns">
          <li className="postForm__btn">
            <AiOutlineFileImage />
          </li>
          <li className="postForm__btn">
            <AiOutlineVideoCameraAdd />
          </li>
          <li className="postForm__btn">
            <button>Post</button>
          </li>
        </ul>
      </form>
    </div>
  )
}

export default PostForm
