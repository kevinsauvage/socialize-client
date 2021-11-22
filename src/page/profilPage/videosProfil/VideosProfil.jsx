import './VideosProfil.scss'
import { useContext, useRef, useState } from 'react'
import { RiVideoAddLine } from 'react-icons/ri'
import { AuthContext } from '../../../context/AuthContext'
import { uploadVideo } from '../../../helpers/uploadCloudinary'
import { MdDeleteForever, MdOutlinePlayCircleOutline } from 'react-icons/md'
import VideoPlayerModal from '../../../component/videoPlayerModal/VideoPlayerModal'
import Loader from '../../../component/loader/Loader'

const VideosProfil = () => {
  const { user, updateUser } = useContext(AuthContext)
  const [index, setIndex] = useState(undefined)
  const [loading, setLoading] = useState(false)
  const input = useRef(null)

  const onChangeVideo = async (e) => {
    setLoading(true)
    const data = await uploadVideo(e.target.files[0])
    const url = await data.eager[3].secure_url
    const response = await updateUser({
      videos: user.videos ? [...user?.videos, url] : [url],
    })
    if (!response.ok) window.alert('Oups, something went wrong, try again.')
    input.current.value = ''
    setLoading(false)
    return
  }

  // eslint-disable-next-line no-unused-vars
  const handleIndexUpdate = (newIndex) => {
    if (newIndex === undefined) setIndex(newIndex)
    if (newIndex <= 0) return setIndex(0)
    if (newIndex >= user.images.length) return setIndex(user.images.length - 1)
    return setIndex(newIndex)
  }

  const handleVideoDelete = async (url) => {
    const newUserVideo = await user.videos.filter((item) => item !== url)
    const response = await updateUser({ videos: newUserVideo })
    if (!response.ok) window.alert('Oups, something went wrong, try again.')
    setLoading(false)
    return
  }

  return (
    <div className="VideosProfil">
      {index !== undefined && (
        <VideoPlayerModal
          url={user.videos[index]}
          handleIndexUpdate={handleIndexUpdate}
          index={index}
        />
      )}
      <div className="VideosProfil__container">
        {user?.videos?.map((item, i) => (
          <div className="VideosProfil__videoThumbnail">
            <img
              key={i}
              src={item.substr(0, item.lastIndexOf('.')) + '.jpg'}
              width="200"
              height="150"
              alt="user video thumbnail"
            />
            <div className="VideosProfil__videoThumbnail-hover">
              <MdOutlinePlayCircleOutline
                className="VideosProfil__play"
                onClick={() => handleIndexUpdate(i - 1)}
              />
              <MdDeleteForever
                onClick={() => handleVideoDelete(item)}
                className="VideosProfil__delete"
              />
            </div>
          </div>
        ))}
        {loading && (
          <div className="VideosProfil__loader">
            <Loader />
          </div>
        )}
        <div
          className="VideosProfil__addBtn"
          onClick={() => document.querySelector('#addVideoGallery').click()}
        >
          <RiVideoAddLine />
        </div>
      </div>
      <input
        ref={input}
        id="addVideoGallery"
        name="image"
        type="file"
        accept=".mp4"
        style={{ display: 'none' }}
        onChange={onChangeVideo}
      />
    </div>
  )
}

export default VideosProfil
