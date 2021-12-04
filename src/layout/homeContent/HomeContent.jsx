import './HomeContent.scss'
import Shortcuts from '../../component/shortcuts/Shortcuts'
import EditInfo from './../../component/editInfo/EditInfo'
import Feed from '../feed/Feed'
import { useContext, useEffect, useRef, useState } from 'react'
import { PostContext } from './../../context/PostContext'
import ProfilIntro from '../../component/profilIntro/ProfilIntro'
import { AuthContext } from '../../context/AuthContext'
import useIsBottom from '../../hooks/useIsBottom'

const HomeContent = () => {
  const { user } = useContext(AuthContext)
  const { fetchPosts, posts } = useContext(PostContext)
  const [limit, setLimit] = useState(10)
  const containerRef = useRef()
  const bottom = useIsBottom()

  useEffect(() => user && fetchPosts(limit), [fetchPosts, user, limit])

  useEffect(() => bottom && setLimit((prev) => prev + 10), [bottom])

  return (
    <div className="homeContent" ref={containerRef}>
      <aside>
        <EditInfo />
        <Shortcuts />
      </aside>
      <section>
        <Feed posts={posts} />
      </section>
      <aside>
        <ProfilIntro user={user} />
      </aside>
    </div>
  )
}

export default HomeContent
