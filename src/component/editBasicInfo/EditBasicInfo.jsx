import { useContext, useRef } from 'react'
import { useEffect, useState } from 'react/cjs/react.development'
import { AuthContext } from '../../context/AuthContext'
import BlocTitle from '../blocTitle/BlocTitle'
import './EditBasicInfo.scss'

const Input = ({ label, type, name, value, onChange, ...rest }) => {
  const [focus, setFocus] = useState(false)
  const inputRef = useRef()

  const handleClickLabel = () => inputRef.current.focus()

  return (
    <div className={'EditBasicInfo__formInputContainer'} {...rest}>
      <label
        className={
          value?.length !== 0
            ? 'EditBasicInfo__input-label--focus EditBasicInfo__input-label'
            : focus
            ? 'EditBasicInfo__input-label--focus EditBasicInfo__input-label'
            : 'EditBasicInfo__input-label'
        }
        onClick={handleClickLabel}
        htmlFor={name}
      >
        {label}
      </label>
      <input
        ref={inputRef}
        type={type}
        name={name}
        onChange={onChange}
        value={value}
        className={
          value?.length !== 0
            ? 'EditBasicInfo__input EditBasicInfo__input--focus'
            : focus
            ? 'EditBasicInfo__input EditBasicInfo__input--focus'
            : 'EditBasicInfo__input'
        }
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
    </div>
  )
}

const EditBasicInfo = () => {
  const [focus, setFocus] = useState(false)
  const textareaRef = useRef()
  const { updateUser, user, findOne } = useContext(AuthContext)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    country: '',
    about: '',
    birthday: '',
  })

  useEffect(() => {
    setFormData({
      firstName: user?.firstName ? user?.firstName : '',
      lastName: user?.lastName ? user?.lastName : '',
      email: user?.email ? user?.email : '',
      phone: user?.phone ? user?.phone : '',
      city: user?.city ? user?.city : '',
      country: user?.country ? user?.country : '',
      about: user?.about ? user?.about : '',
      birthday: user?.birthday ? user?.birthDay : '',
    })
  }, [user])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await updateUser(formData)
    const json = await res.json()
    resetForm()
    console.log(json)
    findOne(user)
  }

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      city: '',
      country: '',
      about: '',
      birthDay: '',
    })
  }

  return (
    <div className="EditBasicInfo">
      <BlocTitle text="Edit Basic Information" />
      <form
        action="submit"
        className="EditBasicInfo__form"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <div className="EditBasicInfo__formRow">
          <Input
            label="First Name"
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          <Input
            label="Last Name"
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        <Input
          label="BirthDay"
          type="Date"
          name="birthday"
          value={formData.birthday}
          onChange={handleChange}
          style={{ width: '48%' }}
        />
        <Input
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <Input
          label="Phone Number"
          type="phone"
          name="phone"
          onChange={handleChange}
          value={formData.phone}
        />
        <div className="EditBasicInfo__formRow">
          <Input
            label="City"
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
          <Input
            onChange={handleChange}
            label="Country"
            type="text"
            name="country"
            value={formData.country}
          />
        </div>

        <div className="EditBasicInfo__formInputContainer">
          <label
            className={
              formData.about.length !== 0
                ? 'EditBasicInfo__textarea-label EditBasicInfo__textarea-label--focus'
                : focus
                ? 'EditBasicInfo__textarea-label EditBasicInfo__textarea-label--focus'
                : 'EditBasicInfo__textarea-label'
            }
            htmlFor="about"
          >
            About me
          </label>
          <textarea
            value={formData.about}
            type="text"
            ref={textareaRef}
            name="about"
            onChange={handleChange}
            className={
              formData.about.length !== 0
                ? 'EditBasicInfo__textarea EditBasicInfo__textarea--focus'
                : focus
                ? 'EditBasicInfo__textarea EditBasicInfo__textarea--focus'
                : 'EditBasicInfo__textarea'
            }
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
          />
        </div>
        <div className="EditBasicInfo__btns">
          <button className="EditBasicInfo__btn EditBasicInfo__btn--cancel">
            Cancel
          </button>
          <button className="EditBasicInfo__btn EditBasicInfo__btn--update">
            Update
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditBasicInfo
