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
import EditProfilInfo from '../../page/profilPage/editProfilInfo/EditProfilInfo'
import AboutProfil from './../../page/profilPage/aboutProfil/AboutProfil'
import PhotoProfil from '../../page/profilPage/photoProfil/PhotoProfil'
import GroupsProfil from '../../page/profilPage/groupsProfil/GroupsProfil'
import FriendsProfil from '../../page/profilPage/friendsProfil/FriendsProfil'
import VideosProfil from '../../page/profilPage/videosProfil/VideosProfil'
import PagesProfil from '../../page/profilPage/pagesProfil/PagesProfil'

const App = () => {
  return (
    <div className="app">
      <AuthProvider>
        <PostProvider>
          <Router>
            {getValue('user') ? (
              <>
                <Header />
                <Route path="/" exact component={Home} />
                <Route path="/profil/timeline" component={ProfilPage} />
                <Route path="/profil/photos" component={PhotoProfil} />
                <Route path="/profil/edit" component={EditProfilInfo} />
                <Route path="/profil/videos" component={VideosProfil} />
                <Route path="/profil/about" component={AboutProfil} />
                <Route path="/profil/pages" component={PagesProfil} />
                <Route path="/profil/friends" component={FriendsProfil} />
                <Route path="/profil/groups" component={GroupsProfil} />
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
