import './App.scss'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { AuthProvider } from '../../context/AuthContext'
import PrivateRoute from '../../helpers/PrivateRoute'
import Home from '../../page/home/Home'
import Login from '../../page/login/Login'
import Register from '../../page/register/Register'

const App = () => {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <PrivateRoute path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Router>
      </AuthProvider>
    </div>
  )
}

export default App
