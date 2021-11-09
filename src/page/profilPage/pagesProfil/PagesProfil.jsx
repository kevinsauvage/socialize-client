import React from 'react'
import NavProfilPage from '../../../component/NavProfilPage/NavProfilPage'
import BannerProfil from '../../../layout/bannerProfil/BannerProfil'
import PageMain from '../../../layout/PageMain/PageMain'

const PagesProfil = () => {
  return (
    <div>
      <BannerProfil />
      <NavProfilPage />
      <PageMain>Pages</PageMain>
    </div>
  )
}

export default PagesProfil
