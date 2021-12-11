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
import { getValue } from '../../helpers/localStorage'
import { CommentProvider } from '../../context/CommentContext'
import { NotificationProvider } from '../../context/NotificationContext'

import PageLoader from './../../component/pageLoader/PageLoader'

const Search = lazy(() => import('../../page/search/Search'))
const ProfilPage = lazy(() => import('./../../page/profilPage/ProfilPage'))
const Register = lazy(() => import('../../page/register/Register'))
const Login = lazy(() => import('../../page/login/Login'))
const Home = lazy(() => import('../../page/home/Home'))
const PostShow = lazy(() => import('../../page/postShow/PostShow'))
const PublicUser = lazy(() => import('../../page/publicUser/PublicUser'))

const App = () => {
  return (
    <div className="app">
      <AuthProvider>
        <PostProvider>
          <CommentProvider>
            <NotificationProvider>
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
                    <Route path="/posts/:id" component={PostShow} />
                  </Switch>
                </Suspense>
              </Router>
            </NotificationProvider>
          </CommentProvider>
        </PostProvider>
      </AuthProvider>
    </div>
  )
}

export default App
