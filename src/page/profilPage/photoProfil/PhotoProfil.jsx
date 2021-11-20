import './PhotoProfil.scss'
import { useContext, useState } from 'react'
import { AuthContext } from '../../../context/AuthContext'
import { RiImageAddFill } from 'react-icons/ri'
import { TiArrowLeftOutline, TiArrowRightOutline } from 'react-icons/ti'
import { CgCloseO } from 'react-icons/cg'
import { MdDeleteForever } from 'react-icons/md'
import uploadImage from '../../../helpers/uploadImage'
import Loader from '../../../component/loader/Loader'

const PhotoProfil = () => {
  const { user, updateUser } = useContext(AuthContext)
  const [index, setIndex] = useState(undefined)
  const [loading, setLoading] = useState(false)

  const onChangePhoto = async (e) => {
    setLoading(true)
    const data = await uploadImage(e.target.files[0])
    const url = await data.eager[3].secure_url
    const response = await updateUser({ images: [...user.images, url] })
    if (!response.ok) window.alert('Oups, something went wrong, try again.')
    setLoading(false)
    return
  }

  const handleUpdate = (newIndex) => {
    if (newIndex <= 0) return setIndex(0)
    if (newIndex >= user.images.length) return setIndex(user.images.length - 1)
    return setIndex(newIndex)
  }

  const handleImageDelete = async (url) => {
    const newUserImages = await user.images.filter((item) => item !== url)
    const response = await updateUser({ images: newUserImages })
    if (!response.ok) window.alert('Oups, something went wrong, try again.')
    setLoading(false)
    return
  }

  return (
    <div className="PhotoProfil">
      <div className="PhotoProfil__container">
        {user?.images?.map((url, i) => (
          <div key={url} className="PhotoProfil__img">
            <MdDeleteForever
              onClick={() => handleImageDelete(url)}
              className="PhotoProfil__imgDelete"
            />
            <img onClick={() => setIndex(i)} src={url} alt="user gallery" />
          </div>
        ))}
        {loading && (
          <div className="PhotoProfil__imgLoader">
            <Loader />
          </div>
        )}
        <div
          onClick={() => document.querySelector('#addPhotoGallery').click()}
          className="PhotoProfil__addBtn"
        >
          <RiImageAddFill />
        </div>
      </div>
      {index !== undefined && (
        <div className="PhotoProfil__gallery">
          <CgCloseO
            className="PhotoProfil__galleryClose"
            onClick={() => setIndex(undefined)}
          />
          <div
            onClick={() => handleUpdate(index - 1)}
            className={
              index <= 0
                ? 'PhotoProfil__galleryArrow PhotoProfil__galleryArrow--leftInactive'
                : 'PhotoProfil__galleryArrow'
            }
          >
            <TiArrowLeftOutline />
          </div>
          <img
            src={user.images[index]}
            alt="user gallery"
            className="PhotoProfil__galleryImg"
            width="600"
            height="450"
          />
          <div
            onClick={() => handleUpdate(index + 1)}
            className={
              index >= user.images.length - 1
                ? 'PhotoProfil__galleryArrow PhotoProfil__galleryArrow--rightInactive'
                : 'PhotoProfil__galleryArrow'
            }
          >
            <TiArrowRightOutline />
          </div>
        </div>
      )}
      <input
        id="addPhotoGallery"
        name="image"
        type="file"
        accept=".jpeg, .jpg, .png "
        style={{ display: 'none' }}
        onChange={onChangePhoto}
      />
    </div>
  )
}

export default PhotoProfil
