import './BannerProfil.scss'
import { AiOutlineFileImage } from 'react-icons/ai'
import { useCallback, useEffect, useState } from 'react'
import { useMousePosition } from './../../hooks/useMousePosition'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

const BannerProfil = () => {
  const [imagePreview, setImagePreview] = useState('')
  const [bgYposition, setBgYposition] = useState(0)
  const [pressPosition, setPressPosition] = useState()
  const [avatarPreview, setAvatarPreview] = useState(false)
  const mousePosition = useMousePosition()

  const { updateUser, user } = useContext(AuthContext)

  useEffect(() => {
    user?.bgProfilPosition && setBgYposition()
  }, [user])

  const updateBgPosition = useCallback(
    (releasePosition) => {
      if (pressPosition > releasePosition) {
        const plus = (pressPosition - releasePosition) / 3
        setBgYposition(bgYposition + plus)
      }
      if (pressPosition < releasePosition) {
        const minus = (releasePosition - pressPosition) / 3
        setBgYposition(bgYposition - minus)
      }
    },
    [pressPosition, bgYposition],
  )

  useEffect(() => {
    if (!imagePreview) return
    if (bgYposition < 0) setBgYposition(0)
    if (bgYposition > 100) setBgYposition(100)
  }, [bgYposition, imagePreview])

  const handlePress = () => {
    setPressPosition(mousePosition.y)
  }

  const handleRelease = () => {
    updateBgPosition(mousePosition.y)
  }

  const onImageChange = (e) => {
    const img = e.target.files[0]
    var reader = new FileReader()
    reader.onloadend = async () => setImagePreview(reader.result)

    reader.readAsDataURL(img)
  }

  const onAvatarChange = (e) => {
    const img = e.target.files[0]
    img.filename = 'userAvatar'
    updateAvatar(img)
  }

  const updateAvatar = async (img) => {
    var reader = new FileReader()
    reader.onloadend = async () => {
      console.log('RESULT')
      const response = await updateUser({ image: reader.result }, user)
      setAvatarPreview(reader.result)
      const json = await response.json()
      console.log(json)
    }
    reader.readAsDataURL(img)
  }

  const handleSubmitBg = async () => {
    const response = await updateUser(
      {
        backgroundImg: imagePreview,
        bgProfilPosition: bgYposition,
      },
      user,
    )
    const json = await response.json()
    console.log(json)
  }

  const handleCancel = () => {
    setBgYposition(user.bgProfilPosition)
    setImagePreview(undefined)
  }

  const handleClickAvatar = () => document.querySelector('#avatarInput').click()

  return (
    <div
      className="bannerProfil"
      onTouchStart={imagePreview ? handlePress : null}
      onTouchEnd={imagePreview ? handleRelease : null}
      onMouseDown={imagePreview ? handlePress : null}
      onMouseUp={imagePreview ? handleRelease : null}
      style={{
        backgroundImage: imagePreview
          ? 'url(' + imagePreview + ')'
          : 'url(' + user?.backgroundImg + ')',
        backgroundPosition: `100% ${
          imagePreview ? bgYposition : user?.bgProfilPosition
        }%`,
      }}
    >
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
            <img
              src={avatarPreview ? avatarPreview : user?.image}
              alt="avatar"
              className="bannerProfil__avatar"
              onClick={handleClickAvatar}
            />
          </div>
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
        </div>
        {imagePreview && (
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
