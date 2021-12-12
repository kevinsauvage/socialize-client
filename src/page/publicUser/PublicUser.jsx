import './PublicUser.scss'
import { useParams } from 'react-router'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import Header from '../../layout/header/Header'
import BannerProfil from '../../layout/bannerProfil/BannerProfil'
import PageMain from '../../layout/PageMain/PageMain'
import ProfilIntro from '../../component/profilIntro/ProfilIntro'
import AboutProfil from '../profilPage/aboutProfil/AboutProfil'
import PhotoProfil from '../profilPage/photoProfil/PhotoProfil'
import VideosProfil from '../profilPage/videosProfil/VideosProfil'

const PublicUser = () => {
  const { id } = useParams()

  const [user, setUser] = useState([])

  const { findOne } = useContext(AuthContext)

  useEffect(() => findOne(id).then((res) => setUser(res)), [id, findOne])

  useEffect(() => window.scrollTo(0, 0), [])

  return (
    <div className="PublicUser">
      <Header />
      <BannerProfil user={user} />
      <div className="PublicUser__band"></div>
      <PageMain>
        <aside></aside>
        <section>
          <AboutProfil user={user} />
          <PhotoProfil displayedUser={user} />
          <VideosProfil displayedUser={user} />
        </section>
        <aside>
          <ProfilIntro user={user} />
        </aside>
      </PageMain>
    </div>
  )
}

export default PublicUser
