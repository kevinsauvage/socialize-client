import { useContext } from 'react'
import './PostForm.scss'
import { AuthContext } from './../../context/AuthContext'
import Avatar from '../avatar/Avatar'

import {
  AiOutlineFileImage,
  AiOutlineVideoCameraAdd,
} from 'react-icons/ai/index'

const PostForm = ({
  onImageChange,
  handleSubmit,
  setContentText,
  contentText,
}) => {
  const { user } = useContext(AuthContext)
  return (
    <div className="postForm">
      <Avatar avatarImg={user?.image} />
      <form action="submit" className="postForm__form" onSubmit={handleSubmit}>
        <textarea
          name="postContent"
          rows="5"
          className="postForm__text-area"
          placeholder="Write something"
          value={contentText}
          onChange={(e) => setContentText(e.target.value)}
        ></textarea>
        <ul className="postForm__btns">
          <li className="postForm__btn">
            <AiOutlineVideoCameraAdd />
          </li>
          <li className="postForm__btn">
            <label htmlFor="file">
              <AiOutlineFileImage id="icon" htmlFor="fileInput" />
            </label>
            <input
              id="file"
              name="file"
              type="file"
              accept=".jpeg, .jpg, .png "
              onChange={onImageChange}
            />
          </li>
          <li className="postForm__btn">
            <button onClick={handleSubmit}>Post</button>
          </li>
        </ul>
      </form>
    </div>
  )
}

export default PostForm
