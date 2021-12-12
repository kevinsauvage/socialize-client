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
import ConfirmationMessage from '../confirmationMessage/ConfirmationMessage'
import { passwordValidation } from '../../helpers/passwordValidation'
import Loader from '../loader/Loader'

const EditPassword = () => {
  const [error, setError] = useState('')
  const [confirmation, setConfirmation] = useState('')
  const [loading, setLoading] = useState(false)
  const { updateUserPassword } = useContext(AuthContext)

  const submitCallback = useCallback(
    async (formData) => {
      if (
        !formData.newPassword ||
        !formData.confirmNewPassword ||
        !formData.oldPassword
      ) {
        return setError('Missing field')
      }

      if (formData.newPassword !== formData.confirmNewPassword) {
        return setError('Passwords are diferent')
      }

      if (passwordValidation(formData.newPassword)) {
        setLoading(true)
        const res = await updateUserPassword(formData)

        if (!res.ok) {
          const errorRes = await res.json()
          setLoading(false)

          return setError(errorRes.message)
        } else {
          setLoading(false)

          return setConfirmation('Password correctly changed.')
        }
      }

      return
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
    setConfirmation('')
    setError('')
  }, [formData]) // reset error/confirmaiton message when input change

  return (
    <div className="EditPassword">
      {loading && (
        <div className="EditPassword__loader">
          <Loader />
        </div>
      )}
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
        <ConfirmationMessage text={confirmation ? confirmation : ''} />
        <FormBtns handleCancel={handleReset} handleSubmit={handleSubmit} />
      </form>
    </div>
  )
}

export default EditPassword
