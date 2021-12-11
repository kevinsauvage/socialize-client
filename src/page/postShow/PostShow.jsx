import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import EditInfo from '../../component/editInfo/EditInfo'
import Loader from '../../component/loader/Loader'
import Post from '../../component/post/Post'
import ProfilIntro from '../../component/profilIntro/ProfilIntro'
import Shortcuts from '../../component/shortcuts/Shortcuts'
import { AuthContext } from '../../context/AuthContext'
import { PostContext } from '../../context/PostContext'
import Header from '../../layout/header/Header'
import './PostShow.scss'

const PostShow = () => {
  const { user } = useContext(AuthContext)
  const { findOne } = useContext(PostContext)
  const { id } = useParams()
  const [post, setPost] = useState(undefined)

  useEffect(() => window.scrollTo(0, 0), [])

  useEffect(() => {
    id &&
      findOne(id)
        .then((res) => res.json())
        .then((data) => setPost(data))
  }, [id, findOne])

  return (
    <div className="PostShow">
      <Header />
      <aside>
        <EditInfo />
        <Shortcuts />
      </aside>
      <section>{post ? <Post post={post} /> : <Loader />}</section>
      <aside>
        <ProfilIntro user={user} />
      </aside>
    </div>
  )
}

export default PostShow
