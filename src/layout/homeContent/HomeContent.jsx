import './HomeContent.scss'
import Shortcuts from '../../component/shortcuts/Shortcuts'
import EditInfo from './../../component/editInfo/EditInfo'
import Feed from '../feed/Feed'
import { useContext, useEffect } from 'react'
import { PostContext } from './../../context/PostContext'
import ProfilIntro from '../../component/profilIntro/ProfilIntro'
import { AuthContext } from '../../context/AuthContext'
import useIsBottom from '../../hooks/useIsBottom'

const HomeContent = () => {
  const { user } = useContext(AuthContext)
  const { fetchPosts, posts, setLimit } = useContext(PostContext)
  const bottom = useIsBottom()

  useEffect(() => user && fetchPosts(), [fetchPosts, user])

  useEffect(() => bottom && setLimit((prev) => prev + 10), [bottom, setLimit])

  return (
    <div className="homeContent">
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
