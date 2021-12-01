import './App.scss'
import { lazy, Suspense } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom'
import { AuthProvider } from '../../context/AuthContext'
import { PostProvider } from '../../context/PostContext'
import PageLoader from './../../component/pageLoader/PageLoader'
import { getValue } from '../../helpers/localStorage'
import PublicUser from '../../page/publicUser/PublicUser'
import { CommentProvider } from '../../context/CommentContext'

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
          <CommentProvider>
            <Router>
              <Suspense fallback={<PageLoader />}>
                <Switch>
                  <Route path="/login" component={Login} />
                  <Route path="/register" component={Register} />
                  <Route path="/user/:id" component={PublicUser} />
                  {!getValue('user') && <Redirect to="/login" />}
                  <Route path="/" exact component={Home} />
                  <Route path="/profil" component={ProfilPage} />
                  <Route path="/search" component={Search} />
                </Switch>
              </Suspense>
            </Router>
          </CommentProvider>
        </PostProvider>
      </AuthProvider>
    </div>
  )
}

export default App
