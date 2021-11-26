import './HomeContent.scss'
import Shortcuts from '../../component/shortcuts/Shortcuts'
import Friends from '../../component/friends/Friends'
import EditInfo from './../../component/editInfo/EditInfo'
import Feed from '../feed/Feed'
import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { PostContext } from './../../context/PostContext'
import ProfilIntro from '../../component/profilIntro/ProfilIntro'
import { AuthContext } from '../../context/AuthContext'

const HomeContent = () => {
  const { user } = useContext(AuthContext)
  const { fetchPosts, posts } = useContext(PostContext)
  const [limit, setLimit] = useState(10)
  const containerRef = useRef()

  useEffect(() => user && fetchPosts(limit), [fetchPosts, user, limit])

  const handleScroll = useCallback(() => {
    const bottom =
      Math.ceil(window.innerHeight + window.scrollY) >=
      document.documentElement.scrollHeight

    if (bottom) return setLimit((prev) => prev + 10)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

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
        <Friends />
      </aside>
    </div>
  )
}

export default HomeContent
