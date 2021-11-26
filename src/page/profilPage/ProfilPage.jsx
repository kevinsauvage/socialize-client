import './ProfilPage.scss'
import { useEffect, useState, useContext, lazy, Suspense } from 'react'
import { Route, Switch } from 'react-router'
import { PostContext } from './../../context/PostContext'
import ProfilPageWrapper from '../../layout/profilPageWrapper/ProfilPageWrapper'
import Loader from '../../component/loader/Loader'
import { AuthContext } from '../../context/AuthContext'

const PhotoProfil = lazy(() => import('./photoProfil/PhotoProfil'))
const EditProfilInfo = lazy(() => import('./editProfilInfo/EditProfilInfo'))
const VideosProfil = lazy(() => import('./videosProfil/VideosProfil'))
const FriendsProfil = lazy(() => import('./friendsProfil/FriendsProfil'))
const AboutProfil = lazy(() => import('./aboutProfil/AboutProfil'))
const Feed = lazy(() => import('../../layout/feed/Feed'))

const ProfilPage = () => {
  const { getUserPost } = useContext(PostContext)
  const { user } = useContext(AuthContext)
  const [userPosts, setUserPosts] = useState([])

  useEffect(() => {
    user &&
      getUserPost()
        .then((res) => res.json())
        .then((data) => setUserPosts(data))
  }, [getUserPost, user])

  return (
    <section className="profilPage">
      <ProfilPageWrapper user={user}>
        <Suspense fallback={<Loader />}>
          <Switch>
            <Route path="/profil/timeline">
              <Feed posts={userPosts} />
            </Route>
            <Route path="/profil/photos">
              <PhotoProfil user={user} />
            </Route>
            <Route path="/profil/edit" component={EditProfilInfo} />
            <Route path="/profil/videos">
              <VideosProfil user={user} />
            </Route>
            <Route path="/profil/Friends" component={FriendsProfil} />
            <Route path="/profil/about">
              <AboutProfil user={user} />
            </Route>
          </Switch>
        </Suspense>
      </ProfilPageWrapper>
    </section>
  )
}

export default ProfilPage
