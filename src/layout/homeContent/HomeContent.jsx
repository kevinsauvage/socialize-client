import Shortcuts from '../../component/shortcuts/Shortcuts'
import './HomeContent.scss'
import PostForm from './../../component/postForm/PostForm'

const HomeContent = () => {
  return (
    <div className="homeContent">
      <aside className="homeContent__sidebar">
        <Shortcuts />
      </aside>
      <div className="homecontent__central">
        <PostForm />
      </div>
      <aside className="homeContent__sidebar">
        <Shortcuts />
      </aside>
    </div>
  )
}

export default HomeContent
