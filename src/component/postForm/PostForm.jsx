import { useContext, useState } from 'react'
import './PostForm.scss'
import { AuthContext } from './../../context/AuthContext'
import Avatar from '../avatar/Avatar'
import { fetchUrl } from './../../helpers/fetch'
import {
  AiOutlineFileImage,
  AiOutlineVideoCameraAdd,
} from 'react-icons/ai/index'

const PostForm = () => {
  const { user } = useContext(AuthContext)
  const [contentText, setContentText] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    fetchUrl('posts', {
      method: 'Post',
      body: JSON.stringify({
        body: contentText,
        authorId: `${user?.id}`,
        authorName: `${user?.firstName} ${user?.lastName}`,
      }),
    })
      .then((data) => data.json())
      .then((res) => console.log(res))
  }

  return (
    <div className="postForm">
      <Avatar AvatarImg={user?.img} />
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
            <AiOutlineFileImage />
          </li>
          <li className="postForm__btn">
            <AiOutlineVideoCameraAdd />
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
