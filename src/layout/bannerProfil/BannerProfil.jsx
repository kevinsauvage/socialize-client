import './BannerProfil.scss'
import { AiOutlineFileImage } from 'react-icons/ai'
import { useState } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import Loader from '../../component/loader/Loader'
import { MdAddPhotoAlternate } from 'react-icons/md'
import { getValue } from '../../helpers/localStorage'
import NoAvatar from '../../img/avatarDefault.png'
import { uploadImage } from '../../helpers/upload'

const BannerProfil = ({ user }) => {
  const [imagePreview, setImagePreview] = useState('')
  const [avatarLoading, setAvatarLoading] = useState(false)
  const [currentUser] = useState(getValue('user'))
  const { updateUser } = useContext(AuthContext)

  const onImageChange = (e) => {
    const img = e.target.files[0]
    var reader = new FileReader()
    reader.onloadend = async () =>
      setImagePreview({ img: reader.result, file: img })
    reader.readAsDataURL(img)
  }

  const onAvatarChange = async (e) => {
    setAvatarLoading(true)
    const file = e.target.files[0]
    const dataCloudinary = await uploadImage(file, user._id)
    const response = await updateUser({
      avatar: dataCloudinary.eager[1].secure_url,
    })
    setAvatarLoading(false)
    const json = await response.json()
    console.log(json)
  }

  const handleSubmitBg = async () => {
    const data = await uploadImage(imagePreview.file)
    const response = await updateUser({
      backgroundImg: data.eager[2].secure_url,
    })
    if (response.ok) setImagePreview(undefined)
    const json = await response.json()
    console.log(json)
  }

  const handleCancel = () => setImagePreview(undefined)

  const handleClickAvatar = () => document.querySelector('#avatarInput').click()

  return (
    <div
      className="bannerProfil"
      style={{
        backgroundImage: imagePreview?.img
          ? 'url(' + imagePreview?.img + ')'
          : 'url(' + user?.backgroundImg + ')',
      }}
    >
      <form style={{ display: 'none' }}>
        <input type="file" id="fileDialogId" />
      </form>
      <input
        id="avatarInput"
        name="image"
        type="file"
        accept=".jpeg, .jpg, .png "
        style={{ display: 'none' }}
        onChange={onAvatarChange}
      />
      <div className="bannerProfil__container">
        <div className="bannerProfil__content">
          <div className="bannerProfil__avatar-wrapper">
            {user._id === currentUser._id ? (
              avatarLoading ? (
                <Loader style={{ transform: 'scale(0.3)' }} />
              ) : user.avatar ? (
                <img
                  src={user?.avatar}
                  alt="avatar"
                  className="bannerProfil__avatar"
                  onClick={handleClickAvatar}
                />
              ) : (
                <MdAddPhotoAlternate
                  onClick={handleClickAvatar}
                  size={35}
                  color="whitesmoke"
                />
              )
            ) : (
              <img
                src={user?.avatar || NoAvatar}
                alt="avatar"
                className="bannerProfil__avatar-public"
              />
            )}
          </div>
          {user._id === currentUser._id && (
            <>
              <label htmlFor="file" className="bannerProfil__edit-cover">
                <AiOutlineFileImage id="icon" htmlFor="fileInput" /> Edit Cover
                Photo
              </label>
              <input
                id="file"
                name="file"
                type="file"
                accept=".jpeg, .jpg, .png "
                onChange={onImageChange}
              />
            </>
          )}
        </div>
        {imagePreview?.img && (
          <div className="bannerProfil__btns">
            <div
              className="bannerProfil__btn bannerProfil__btn--confirm"
              onClick={handleSubmitBg}
            >
              <button>Confirm</button>
            </div>
            <div
              className="bannerProfil__btn bannerProfil__btn--cancel"
              onClick={handleCancel}
            >
              <button>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default BannerProfil
