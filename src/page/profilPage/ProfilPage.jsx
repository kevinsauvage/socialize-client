import './ProfilPage.scss'
import { useEffect, useState, useContext } from 'react'
import { PostContext } from './../../context/PostContext'
import Feed from '../../layout/feed/Feed'
import ProfilPageWrapper from '../../layout/profilPageWrapper/ProfilPageWrapper'
import { Route, Switch } from 'react-router'
import PhotoProfil from './photoProfil/PhotoProfil'
import EditProfilInfo from './editProfilInfo/EditProfilInfo'
import VideosProfil from './videosProfil/VideosProfil'
import FriendsProfil from './friendsProfil/FriendsProfil'
import GroupsProfil from './groupsProfil/GroupsProfil'
import PagesProfil from './pagesProfil/PagesProfil'
import AboutProfil from './aboutProfil/AboutProfil'

const ProfilPage = () => {
  const { getUserPost } = useContext(PostContext)
  const [userPosts, setUserPosts] = useState([])

  useEffect(() => {
    getUserPost()
      .then((res) => res.json())
      .then((data) => setUserPosts(data))
  }, [getUserPost])

  return (
    <section className="profilPage">
      <ProfilPageWrapper>
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
      </ProfilPageWrapper>
    </section>
  )
}

export default ProfilPage
