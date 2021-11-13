import './EditBasicInfo.scss'
import { useContext, useMemo } from 'react'
import { useEffect } from 'react'
import { AuthContext } from '../../context/AuthContext'
import BlocTitle from '../blocTitle/BlocTitle'
import Input from '../input/Input'
import useForm from './../../hooks/useForm'
import FormBtns from '../formBtns/FormBtns'
import TextArea from '../textArea/TextArea'

const EditBasicInfo = () => {
  const { updateUser, user, findOne } = useContext(AuthContext)

  const submitCallback = async (form) => {
    await updateUser(form, user)
    await findOne(user)
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
      website: user?.website ? user?.website : '',
    }),
    [user],
  )

  const {
    formData,
    handleInputChange,
    handleSubmit,
    setFormData,
    loading,
  } = useForm(initialState, submitCallback)

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
            value={!loading ? formData?.firstName : ''}
            onChange={handleInputChange}
          />
          <Input
            label="Last Name"
            type="text"
            name="lastName"
            value={!loading ? formData?.lastName : ''}
            onChange={handleInputChange}
          />
        </div>
        <div className="EditBasicInfo__formRow">
          <Input
            label="BirthDay"
            type="Date"
            name="birthday"
            value={!loading ? formData?.birthday : ''}
            onChange={handleInputChange}
          />
          <Input
            label="Website"
            type="text"
            name="website"
            value={!loading ? formData?.website : ''}
            onChange={handleInputChange}
          />
        </div>
        <div className="EditBasicInfo__formRow">
          <Input
            label="Email"
            type="email"
            name="email"
            value={!loading ? formData?.email : ''}
            onChange={handleInputChange}
          />
          <Input
            label="Phone Number"
            type="phone"
            name="phone"
            onChange={handleInputChange}
            value={!loading ? formData?.phone : ''}
          />
        </div>
        <div className="EditBasicInfo__formRow">
          <Input
            label="City"
            type="text"
            name="city"
            value={!loading ? formData?.city : ''}
            onChange={handleInputChange}
          />
          <Input
            onChange={handleInputChange}
            label="Country"
            type="text"
            name="country"
            value={!loading ? formData?.country : ''}
          />
        </div>
        <div className="EditBasicInfo__formInputContainer">
          <TextArea
            name="about"
            label="About Me"
            onChange={handleInputChange}
            value={!loading ? formData?.about : ''}
          />
        </div>
        <FormBtns handleCancel={resetForm} handleSubmit={handleSubmit} />
      </form>
    </div>
  )
}

export default EditBasicInfo
