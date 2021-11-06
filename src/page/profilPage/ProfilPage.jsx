import './ProfilPage.scss'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import EditInfo from '../../component/editInfo/EditInfo'
import Feed from '../../layout/feed/Feed'
import Friends from '../../component/friends/Friends'
import { useEffect, useState } from 'react/cjs/react.development'
import { PostContext } from './../../context/PostContext'
import ProfilIntro from '../../component/profilIntro/ProfilIntro'
import BannerProfil from '../../layout/bannerProfil/BannerProfil'
import Shortcuts from './../../component/shortcuts/Shortcuts'

const ProfilPage = () => {
  const { user } = useContext(AuthContext)
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
      <nav className="profilPage__nav">
        <ul className="profilPage__nav-list">
          <div className="profilPage__nav-username">
            <h3>
              {user?.firstName} {user?.lastName}
            </h3>
          </div>
          <li className="profilPage__nav-list-item">Timeline</li>
          <li className="profilPage__nav-list-item">Photo</li>
          <li className="profilPage__nav-list-item">Video</li>
          <li className="profilPage__nav-list-item">Friends</li>
          <li className="profilPage__nav-list-item">Groups</li>
          <li className="profilPage__nav-list-item">About</li>
          <li className="profilPage__nav-list-item">More</li>
        </ul>
      </nav>
      <main className="profilPage__main">
        <div className="profilPage__main-container">
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
        </div>
      </main>
    </section>
  )
}

export default ProfilPage
