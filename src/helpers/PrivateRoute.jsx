import { Route, Redirect } from 'react-router-dom'
import { getValue } from './localStorage.jsx'

const PrivateRoute = ({ component: Component, ...rest }) => {
  console.log(getValue('user'))
  return (
    <Route
      {...rest}
      render={(props) =>
        getValue('user') ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  )
}

export default PrivateRoute
