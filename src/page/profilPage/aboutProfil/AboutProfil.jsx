import React from 'react'
import NavProfilPage from '../../../component/NavProfilPage/NavProfilPage'
import BannerProfil from '../../../layout/bannerProfil/BannerProfil'
import PageMain from '../../../layout/PageMain/PageMain'

const AboutProfil = () => {
  return (
    <div>
      <BannerProfil />
      <NavProfilPage />
      <PageMain>about</PageMain>
    </div>
  )
}

export default AboutProfil
