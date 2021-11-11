import NavProfilPage from '../../../component/NavProfilPage/NavProfilPage'
import BannerProfil from '../../../layout/bannerProfil/BannerProfil'
import PageMain from '../../../layout/PageMain/PageMain'
import LastNotification from './../../../component/lastNotification/LastNotification'
import ProfilIntro from '../../../component/profilIntro/ProfilIntro'
import { useState } from 'react/cjs/react.development'
import { useLocation } from 'react-router'
import EditBasicInfo from './../../../component/editBasicInfo/EditBasicInfo'
import EditPassword from './../../../component/editPassword/EditPassword'

const EditProfilInfo = () => {
  const location = useLocation()
  const [displayElement] = useState(location.pathname.split('/')[3])

  console.log(displayElement)
  return (
    <div className="editProfilInfo">
      <BannerProfil />
      <NavProfilPage />
      <PageMain>
        <section>
          <LastNotification />
        </section>
        <section>
          {displayElement === 'basic_info' && <EditBasicInfo />}
          {displayElement === 'change_password' && <EditPassword />}
        </section>
        <section>
          <ProfilIntro />
        </section>
      </PageMain>
    </div>
  )
}

export default EditProfilInfo
