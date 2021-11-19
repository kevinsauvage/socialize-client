import './App.scss'
import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { AuthProvider } from '../../context/AuthContext'
import { PostProvider } from '../../context/PostContext'
import PageLoader from './../../component/pageLoader/PageLoader'
import PrivateRoute from './../../helpers/PrivateRoute'

const Search = lazy(() => import('../../page/search/Search'))
const ProfilPage = lazy(() => import('./../../page/profilPage/ProfilPage'))
const Register = lazy(() => import('../../page/register/Register'))
const Login = lazy(() => import('../../page/login/Login'))
const Home = lazy(() => import('../../page/home/Home'))

const App = () => {
  return (
    <div className="app">
      <AuthProvider>
        <PostProvider>
          <Router>
            <Suspense fallback={<PageLoader />}>
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <PrivateRoute path="/" exact component={Home} />
              <PrivateRoute path="/profil" component={ProfilPage} />
              <PrivateRoute path="/search" component={Search} />
            </Suspense>
          </Router>
        </PostProvider>
      </AuthProvider>
    </div>
  )
}

export default App
