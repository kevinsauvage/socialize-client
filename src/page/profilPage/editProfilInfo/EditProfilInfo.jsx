import NavProfilPage from '../../../component/NavProfilPage/NavProfilPage'
import BannerProfil from '../../../layout/bannerProfil/BannerProfil'
import PageMain from '../../../layout/PageMain/PageMain'
import './EditProfilInfo.scss'

const EditProfilInfo = () => {
  return (
    <div className="editProfilInfo">
      <BannerProfil />
      <NavProfilPage />
      <PageMain>edit</PageMain>
    </div>
  )
}

export default EditProfilInfo
