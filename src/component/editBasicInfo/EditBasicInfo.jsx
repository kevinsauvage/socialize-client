import { useContext, useMemo, useRef } from 'react'
import { useEffect, useState } from 'react/cjs/react.development'
import { AuthContext } from '../../context/AuthContext'
import BlocTitle from '../blocTitle/BlocTitle'
import './EditBasicInfo.scss'
import Input from '../input/Input'
import useForm from './../../hooks/useForm'
import FormBtns from '../formBtns/FormBtns'

const EditBasicInfo = () => {
  const [focus, setFocus] = useState(false)
  const textareaRef = useRef()
  const { updateUser, user, findOne } = useContext(AuthContext)

  const submitCallback = async (form) => {
    await updateUser(form)
    await findOne(user.id)
  }

  const initialState = useMemo(
    () => ({
      firstName: user?.firstName ? user?.firstName : '',
      lastName: user?.lastName ? user?.lastName : '',
      email: user?.email ? user?.email : '',
      phone: user?.phone ? user?.phone : '',
      city: user?.city ? user?.city : '',
      country: user?.country ? user?.country : '',
      about: user?.about ? user?.about : '',
      birthday: user?.birthday ? user?.birthday : '',
    }),
    [user],
  )

  const { formData, handleInputChange, handleSubmit, setFormData } = useForm(
    initialState,
    submitCallback,
  )

  useEffect(() => setFormData(initialState), [user, setFormData, initialState])

  const resetForm = () => setFormData(initialState)

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
            value={formData?.firstName}
            onChange={handleInputChange}
          />
          <Input
            label="Last Name"
            type="text"
            name="lastName"
            value={formData?.lastName}
            onChange={handleInputChange}
          />
        </div>
        <Input
          label="BirthDay"
          type="Date"
          name="birthday"
          value={formData?.birthday}
          onChange={handleInputChange}
          style={{ width: '48%' }}
        />
        <Input
          label="Email"
          type="email"
          name="email"
          value={formData?.email}
          onChange={handleInputChange}
        />
        <Input
          label="Phone Number"
          type="phone"
          name="phone"
          onChange={handleInputChange}
          value={formData?.phone}
        />
        <div className="EditBasicInfo__formRow">
          <Input
            label="City"
            type="text"
            name="city"
            value={formData?.city}
            onChange={handleInputChange}
          />
          <Input
            onChange={handleInputChange}
            label="Country"
            type="text"
            name="country"
            value={formData?.country}
          />
        </div>
        <div className="EditBasicInfo__formInputContainer">
          <label
            className={
              formData?.about?.length !== 0
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
            value={formData?.about}
            type="text"
            ref={textareaRef}
            name="about"
            onChange={handleInputChange}
            className={
              formData?.about?.length !== 0
                ? 'EditBasicInfo__textarea EditBasicInfo__textarea--focus'
                : focus
                ? 'EditBasicInfo__textarea EditBasicInfo__textarea--focus'
                : 'EditBasicInfo__textarea'
            }
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
          />
        </div>
        <FormBtns handleCancel={resetForm} handleSubmit={handleSubmit} />
      </form>
    </div>
  )
}

export default EditBasicInfo
