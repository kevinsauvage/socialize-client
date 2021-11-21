/* eslint-disable no-unused-vars */
import { useContext, useState } from 'react'
import { RiVideoAddLine } from 'react-icons/ri'
import { AuthContext } from '../../../context/AuthContext'
import { uploadVideo } from '../../../helpers/uploadCloudinary'
import './VideosProfil.scss'

const VideosProfil = () => {
  const { user, updateUser } = useContext(AuthContext)
  const [index, setIndex] = useState(undefined)
  const [loading, setLoading] = useState(false)

  const onChangeVideo = async (e) => {
    setLoading(true)
    const data = await uploadVideo(e.target.files[0])
    const url = await data.eager[3].secure_url
    const response = await updateUser({
      videos: user.videos ? [...user?.videos, url] : [url],
    })
    if (!response.ok) window.alert('Oups, something went wrong, try again.')
    setLoading(false)
    return
  }

  // eslint-disable-next-line no-unused-vars
  const handleIndexUpdate = (newIndex) => {
    if (newIndex <= 0) return setIndex(0)
    if (newIndex >= user.images.length) return setIndex(user.images.length - 1)
    return setIndex(newIndex)
  }

  const handleVideoDelete = async (url) => {
    const newUserImages = await user.images.filter((item) => item !== url)
    const response = await updateUser({ images: newUserImages })
    if (!response.ok) window.alert('Oups, something went wrong, try again.')
    setLoading(false)
    return
  }

  return (
    <div className="VideosProfil">
      <div className="VideosProfil__container">
        {user?.videos?.map((item, i) => (
          <div key={i}>{item}</div>
        ))}

        <div
          className="VideosProfil__addBtn"
          onClick={() => document.querySelector('#addVideoGallery').click()}
        >
          <RiVideoAddLine />
        </div>
      </div>
      <input
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
