import BlocTitle from '../blocTitle/BlocTitle'
import './EditPassword.scss'
import Input from './../input/Input'
import { useContext, useState } from 'react'
import useForm from './../../hooks/useForm'
import { useCallback } from 'react'
import FormBtns from '../formBtns/FormBtns'
import { AuthContext } from '../../context/AuthContext'
import { useEffect } from 'react'
import ErrorMessage from './../errorMessage/ErrorMessage'

const EditPassword = () => {
  const [error, setError] = useState('')
  const { updateUserPassword } = useContext(AuthContext)

  const submitCallback = useCallback(
    (formData) => {
      if (
        !formData.newPassword ||
        !formData.confirmNewPassword ||
        !formData.oldPassword
      ) {
        setError('Missing field')
        return
      }

      if (formData.newPassword !== formData.confirmNewPassword) {
        setError('Passwords are diferent')
      }
      updateUserPassword(formData)
        .then((res) => res.json())
        .then((data) => console.log(data))
    },
    [updateUserPassword],
  )

  const { formData, handleInputChange, handleSubmit, handleReset } = useForm(
    {
      newPassword: '',
      confirmNewPassword: '',
      oldPassword: '',
    },
    submitCallback,
  )

  useEffect(() => {
    setError('')
  }, [formData])

  return (
    <div className="EditPassword">
      <BlocTitle text="Change Password" />
      <form action="submit" onSubmit={handleSubmit}>
        <Input
          label="New Password"
          type="password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleInputChange}
        />
        <Input
          label="Confirm Password"
          type="password"
          name="confirmNewPassword"
          value={formData.confirmNewPassword}
          onChange={handleInputChange}
        />
        <Input
          label="Current Password"
          type="password"
          name="oldPassword"
          value={formData.oldPassword}
          onChange={handleInputChange}
        />
        <ErrorMessage text={error ? error : ''} />
        <FormBtns handleCancel={handleReset} handleSubmit={handleSubmit} />
      </form>
    </div>
  )
}

export default EditPassword
