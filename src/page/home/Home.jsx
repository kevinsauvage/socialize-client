import './Home.scss'
import SidebarLeft from '../../layout/sidebarLeft/SidebarLeft'
import SidebarRight from '../../layout/sidebarRight/SidebarRight'
import HomeContent from '../../layout/homeContent/HomeContent'

const Home = () => {
  return (
    <div className="home">
      <div className="home__container">
        <SidebarLeft />
        <HomeContent />
        <SidebarRight />
      </div>
    </div>
  )
}

export default Home
