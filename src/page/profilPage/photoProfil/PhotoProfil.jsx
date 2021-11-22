import './PhotoProfil.scss'
import { lazy, Suspense, useContext, useState } from 'react'
import { AuthContext } from '../../../context/AuthContext'
import { RiImageAddFill } from 'react-icons/ri'
import { MdDeleteForever } from 'react-icons/md'
import { uploadImage } from '../../../helpers/uploadCloudinary'
import Loader from '../../../component/loader/Loader'
import PageLoader from '../../../component/pageLoader/PageLoader'

const ModalPlayer = lazy(() =>
  import('../../../component/modalPlayer/ModalPlayer'),
)

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
        <Suspense fallback={<PageLoader />}>
          <ModalPlayer
            handleIndexUpdate={handleUpdate}
            index={index}
            comparation={user.images}
          >
            <img
              src={user.images[index]}
              alt="user gallery"
              className="PhotoProfil__galleryImg"
              width="600"
              height="450"
            />
          </ModalPlayer>
        </Suspense>
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
