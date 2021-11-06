import './App.scss'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { AuthProvider } from '../../context/AuthContext'
import Home from '../../page/home/Home'
import Login from '../../page/login/Login'
import Register from '../../page/register/Register'
import { PostProvider } from '../../context/PostContext'
import ProfilPage from './../../page/profilPage/ProfilPage'
import { getValue } from '../../helpers/localStorage'
import Header from './../header/Header'

const App = () => {
  return (
    <div className="App">
      <AuthProvider>
        <PostProvider>
          <Router>
            {getValue('user') ? (
              <>
                <Header />
                <Route path="/" exact component={Home} />
                <Route path="/profil" exact component={ProfilPage} />
              </>
            ) : (
              <Redirect to="/login" />
            )}
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </Router>
        </PostProvider>
      </AuthProvider>
    </div>
  )
}

export default App
