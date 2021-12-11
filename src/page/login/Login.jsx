import logo from '../../img/logo/logo.png'
import { Link } from 'react-router-dom'
import './Login.scss'
import { AuthContext } from '../../context/AuthContext'
import { useContext, useState } from 'react'
import Loader from '../../component/loader/Loader'

const Login = () => {
  const { login } = useContext(AuthContext)
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [isLoading, setLoading] = useState(false)

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await login(formData)
    setLoading(false)
  }

  return (
    <div className="login">
      <div className="login__left">
        <img src={logo} alt="" />
      </div>
      <div className="login__right">
        {isLoading ? (
          <Loader />
        ) : (
          <div className="login__form">
            <h1 className="login__title">Login</h1>
            <p className="login__subtitle">
              Not a member yet ? <Link to="/register">Sign up here</Link>{' '}
            </p>
            <form action="submit" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Username"
                name="email"
                onChange={handleChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
              />
              <Link className="login__password-recovery" to="password-recovery">
                Forgot password?
              </Link>
              <div className="login__btn">
                <button>Login</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

export default Login
