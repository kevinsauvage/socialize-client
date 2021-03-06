import './PostForm.scss'
import { useContext } from 'react'
import { AuthContext } from './../../context/AuthContext'
import Avatar from '../avatar/Avatar'
import { AiOutlineFileImage, AiOutlineVideoCameraAdd } from 'react-icons/ai'

const PostForm = ({
  onImageChange,
  onVideoChange,
  handleSubmit,
  setContentText,
  contentText,
}) => {
  const { user } = useContext(AuthContext)

  return (
    <div className="postForm">
      <Avatar avatarImg={user?.avatar} />
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
          <li className="postForm__btn" htmlFor="videoInput">
            <label htmlFor="videoInput">
              <AiOutlineVideoCameraAdd htmlFor="videoInput" />
            </label>
            <input
              id="videoInput"
              name="video"
              type="file"
              accept=".mp4"
              onChange={onVideoChange}
            />
          </li>
          <li className="postForm__btn">
            <label htmlFor="fileInput">
              <AiOutlineFileImage id="icon" htmlFor="fileInput" />
            </label>
            <input
              id="fileInput"
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
