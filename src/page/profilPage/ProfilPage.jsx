import './ProfilPage.scss'
import { useEffect, useState, useContext, lazy, Suspense } from 'react'
import { Route, Switch, useLocation } from 'react-router'
import { PostContext } from './../../context/PostContext'
import ProfilPageWrapper from '../../layout/profilPageWrapper/ProfilPageWrapper'
import Loader from '../../component/loader/Loader'

const PhotoProfil = lazy(() => import('./photoProfil/PhotoProfil'))
const EditProfilInfo = lazy(() => import('./editProfilInfo/EditProfilInfo'))
const VideosProfil = lazy(() => import('./videosProfil/VideosProfil'))
const FriendsProfil = lazy(() => import('./friendsProfil/FriendsProfil'))
const GroupsProfil = lazy(() => import('./groupsProfil/GroupsProfil'))
const PagesProfil = lazy(() => import('./pagesProfil/PagesProfil'))
const AboutProfil = lazy(() => import('./aboutProfil/AboutProfil'))
const Feed = lazy(() => import('../../layout/feed/Feed'))

const ProfilPage = () => {
  const { getUserPost } = useContext(PostContext)
  const [userPosts, setUserPosts] = useState([])
  const location = useLocation()

  useEffect(() => {
    getUserPost()
      .then((res) => res.json())
      .then((data) => setUserPosts(data))
  }, [getUserPost])

  return (
    <section className="profilPage">
      <ProfilPageWrapper>
        <Suspense fallback={<Loader />}>
          <Switch>
            <Route path="/profil/timeline">
              <Feed posts={userPosts} />
            </Route>
            <Route path="/profil/photos" component={PhotoProfil} />
            <Route path="/profil/edit" component={EditProfilInfo} />
            <Route path="/profil/videos" component={VideosProfil} />
            <Route path="/profil/Friends" component={FriendsProfil} />
            <Route path="/profil/groups" component={GroupsProfil} />
            <Route path="/profil/pages" component={PagesProfil} />
            <Route path="/profil/about" component={AboutProfil} />
          </Switch>
        </Suspense>
      </ProfilPageWrapper>
    </section>
  )
}

export default ProfilPage
