import React, { useContext, useState } from 'react'
import logo from '../../img/logo/logo.png'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import './Register.scss'
import { useHistory } from 'react-router'
import Loader from '../../component/loader/Loader'

const Register = () => {
  const { register } = useContext(AuthContext)
  const history = useHistory()
  const [isLoading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  })

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const user = {
      ...formData,
      username: `${formData.firstName} ${formData.lastName}`,
    }

    const response = await register(user)
    setLoading(false)

    if (response.ok) {
      history.push('/login')
    }
  }

  return (
    <div className="register">
      <div className="register__left">
        <img src={logo} alt="logo" />
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
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="Last Name"
                name="lastName"
                onChange={handleChange}
              />
              <input
                type="email"
                placeholder="email"
                name="email"
                onChange={handleChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
              />
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
