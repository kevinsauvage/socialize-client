import BannerProfil from '../../../layout/bannerProfil/BannerProfil'
import PageMain from '../../../layout/PageMain/PageMain'
import NavProfilPage from './../../../component/NavProfilPage/NavProfilPage'

const FriendsProfil = () => {
  return (
    <div>
      <BannerProfil />
      <NavProfilPage />
      <PageMain>friends</PageMain>
    </div>
  )
}

export default FriendsProfil
