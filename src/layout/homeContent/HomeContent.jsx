import './HomeContent.scss'
import Shortcuts from '../../component/shortcuts/Shortcuts'
import Friends from '../../component/friends/Friends'
import EditInfo from './../../component/editInfo/EditInfo'
import Feed from '../feed/Feed'
import { useContext, useEffect, useState } from 'react'
import { PostContext } from './../../context/PostContext'
import ProfilIntro from '../../component/profilIntro/ProfilIntro'
import { AuthContext } from '../../context/AuthContext'
import { io } from 'socket.io-client'
import { urls } from '../../ApiCall/apiUrl'

const HomeContent = () => {
  const { user } = useContext(AuthContext)
  const { fetchPosts } = useContext(PostContext)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    user &&
      fetchPosts &&
      fetchPosts()
        .then((res) => res.json())
        .then((data) => setPosts(data))
  }, [fetchPosts, user])

  useEffect(() => {
    const socket = io(urls.baseUrl)
    socket.on('connnection', () => console.log('connected to server'))
    socket.on('post-changed', (newPosts) => setPosts(newPosts))
    socket.on('message', (message) => console.log(message))
    socket.on('disconnect', () => console.log('Socket disconnecting'))
  }, [])

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
        <Friends />
      </aside>
    </div>
  )
}

export default HomeContent
