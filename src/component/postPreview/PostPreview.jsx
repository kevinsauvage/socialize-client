import { useContext } from 'react'
import ReactPlayer from 'react-player'
import { AuthContext } from '../../context/AuthContext'
import { getDataFromTimestamp } from '../../helpers/getDataFromTimestamp'
import { imageUrl } from '../../helpers/upload'
import Avatar from '../avatar/Avatar'
import './PostPreview.scss'

const PostPreview = ({ body, image, video }) => {
  const { user } = useContext(AuthContext)
  return (
    <div className="PostPreview">
      <p className="PostPreview__title">Post preview</p>
      <header className="PostPreview__header">
        <Avatar avatarImg={`${imageUrl.avatar}${user._id}.jpg`} />
        <div className="PostPreview__detail">
          <h2 className="PostPreview__username">{user?.username}</h2>
          <i className="PostPreview__published">
            {getDataFromTimestamp(Date.now())}
          </i>
        </div>
      </header>
      <div className="PostPreview__content">
        <p className="PostPreview__description">{body}</p>
        {image && <img src={URL.createObjectURL(image)} alt="post img" />}
        {video && (
          <ReactPlayer
            url={URL.createObjectURL(video)}
            controls={true}
            width={'100%'}
            className="videoPlayer"
          />
        )}
      </div>
    </div>
  )
}

export default PostPreview
