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

const PhotoProfil = ({ displayedUser }) => {
  const { updateUser, user } = useContext(AuthContext)
  const [index, setIndex] = useState(undefined)
  const [loading, setLoading] = useState(false)

  const onChangePhoto = async (e) => {
    setLoading(true)
    const data = await uploadImage(e.target.files[0])
    const url = await data.eager[3].secure_url
    const response = await updateUser({
      images: [...displayedUser.images, url],
    })
    if (!response.ok) window.alert('Oups, something went wrong, try again.')
    setLoading(false)
    return
  }

  const handleUpdate = (newIndex) => {
    if (newIndex <= 0) return setIndex(0)
    if (newIndex >= displayedUser.images.length)
      return setIndex(displayedUser.images.length - 1)
    return setIndex(newIndex)
  }
  console.log(displayedUser, user)

  const handleImageDelete = async (url) => {
    const newUserImages = await displayedUser.images.filter(
      (item) => item !== url,
    )
    const response = await updateUser({ images: newUserImages })
    if (!response.ok) window.alert('Oups, something went wrong, try again.')
    setLoading(false)
    return
  }

  return (
    <div className="PhotoProfil">
      <div className="PhotoProfil__container">
        {displayedUser?.images?.map((url, i) => (
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
        {displayedUser?._id === user?._id ? (
          <div
            onClick={() =>
              displayedUser === user &&
              document.querySelector('#addPhotoGallery').click()
            }
            className="PhotoProfil__addBtn"
          >
            <RiImageAddFill />
          </div>
        ) : (
          displayedUser?.images?.length === 0 && (
            <p className="PhotoProfil__noPicture">No picture to show</p>
          )
        )}
      </div>
      {index !== undefined && (
        <Suspense fallback={<PageLoader />}>
          <ModalPlayer
            handleIndexUpdate={handleUpdate}
            index={index}
            comparation={displayedUser.images}
          >
            <img
              src={displayedUser.images[index]}
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
