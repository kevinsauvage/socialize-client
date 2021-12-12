import NavProfilPage from '../../component/NavProfilPage/NavProfilPage'
import BannerProfil from '../bannerProfil/BannerProfil'
import PageMain from '../PageMain/PageMain'
import './ProfilPageWrapper.scss'
import EditInfo from './../../component/editInfo/EditInfo'
import Shortcuts from './../../component/shortcuts/Shortcuts'
import ProfilIntro from '../../component/profilIntro/ProfilIntro'
import Header from './../header/Header'

const ProfilPageWrapper = ({ children, user }) => {
  return (
    <div className="ProfilPageWrapper">
      <Header />
      <BannerProfil user={user} />
      <NavProfilPage user={user} />
      <PageMain>
        <aside>
          <EditInfo />
          <Shortcuts />
        </aside>
        <section>{children}</section>
        <aside>
          <ProfilIntro user={user} />
        </aside>
      </PageMain>
    </div>
  )
}

export default ProfilPageWrapper
