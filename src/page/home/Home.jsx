import './Home.scss'
import { useEffect } from 'react'
import SidebarLeft from '../../layout/sidebarLeft/SidebarLeft'
import SidebarRight from '../../layout/sidebarRight/SidebarRight'
import HomeContent from '../../layout/homeContent/HomeContent'
import Header from './../../layout/header/Header'

const Home = () => {
  useEffect(() => window.scrollTo(0, 0), [])
  return (
    <div className="home">
      <Header />
      <div className="home__container">
        <SidebarLeft />
        <HomeContent />
        <SidebarRight />
      </div>
    </div>
  )
}

export default Home
