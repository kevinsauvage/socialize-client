import React, { useContext, useState } from 'react'
import logo from '../../img/logo/logo.png'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import './Register.scss'
import Loader from '../../component/loader/Loader'
import { passwordValidation } from '../../helpers/passwordValidation'
import { validateEmail } from '../../helpers/emailValidation'
import ErrorMessage from '../../component/errorMessage/ErrorMessage'

const Register = () => {
  const { register, error, setError } = useContext(AuthContext)
  const [isLoading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    setError('')
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.firstName) return setError('Enter a first name.')
    if (!formData.lastName) return setError('Enter a last name.')
    if (!formData.email) return setError('Enter an email.')
    if (!formData.password) return setError('Enter an password.')

    if (!validateEmail(formData.email)) {
      return setError('Enter a valid email.')
    }

    const user = {
      ...formData,
      username: `${formData.firstName} ${formData.lastName}`,
    }

    if (passwordValidation(formData.password)) {
      setLoading(true)
      await register(user).finally(() => setLoading(false))
    }

    return
  }

  return (
    <div className="register">
      <div className="register__left">
        <img src={logo} alt="logo" width="200" height="200" />
      </div>
      <div className="register__right">
        {isLoading ? (
          <Loader />
        ) : (
          <div className="register__form">
            <h1 className="register__title">Register</h1>
            <p className="register__subtitle">
              Already a member ? <Link to="/login">Sign in here</Link>
            </p>
            <form action="submit" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="First name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
              <input
                type="email"
                placeholder="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <input
                type="password"
                name="password"
                value={formData.password}
                placeholder="Password"
                onChange={handleChange}
              />
              <ErrorMessage text={error ? error : ''} />
              <div className="register__btn">
                <button>Register</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

export default Register
