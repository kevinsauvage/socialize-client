import './App.scss'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { AuthProvider } from '../../context/AuthContext'
import Home from '../../page/home/Home'
import Login from '../../page/login/Login'
import Register from '../../page/register/Register'
import { PostProvider } from '../../context/PostContext'
import ProfilPage from './../../page/profilPage/ProfilPage'
import Search from '../../page/search/Search'
import PrivateRoute from './../../helpers/PrivateRoute'

const App = () => {
  return (
    <div className="app">
      <AuthProvider>
        <PostProvider>
          <Router>
            <PrivateRoute path="/" exact component={Home} />
            <PrivateRoute path="/profil" component={ProfilPage} />
            <PrivateRoute path="/search" component={Search} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </Router>
        </PostProvider>
      </AuthProvider>
    </div>
  )
}

export default App
