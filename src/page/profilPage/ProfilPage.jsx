import './ProfilPage.scss'
import { useContext } from 'react'
import EditInfo from '../../component/editInfo/EditInfo'
import Feed from '../../layout/feed/Feed'
import Friends from '../../component/friends/Friends'
import { useEffect, useState } from 'react'
import { PostContext } from './../../context/PostContext'
import ProfilIntro from '../../component/profilIntro/ProfilIntro'
import BannerProfil from '../../layout/bannerProfil/BannerProfil'
import Shortcuts from './../../component/shortcuts/Shortcuts'
import NavProfilPage from '../../component/NavProfilPage/NavProfilPage'
import PageMain from '../../layout/PageMain/PageMain'

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
      <BannerProfil />
      <NavProfilPage />
      <PageMain>
        <section className="profilPage__main-left">
          <Shortcuts />
          <EditInfo />
        </section>
        <section className="profilPage__main-center">
          <Feed posts={userPosts} />
        </section>
        <section className="profilPage__main-right">
          <ProfilIntro />
          <Friends />
        </section>
      </PageMain>
    </section>
  )
}

export default ProfilPage
