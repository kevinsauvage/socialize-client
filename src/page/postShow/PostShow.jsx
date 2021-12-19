import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Loader from '../../component/loader/Loader'
import Post from '../../component/post/Post'
import { AuthContext } from '../../context/AuthContext'
import { PostContext } from '../../context/PostContext'
import ProfilPageWrapper from '../../layout/profilPageWrapper/ProfilPageWrapper'

const PostShow = () => {
  const { user } = useContext(AuthContext)
  const { findOne } = useContext(PostContext)
  const { id } = useParams()
  const [post, setPost] = useState(undefined)

  useEffect(() => window.scrollTo(0, 0), [id])

  useEffect(() => {
    id &&
      findOne(id)
        .then((res) => res.json())
        .then((data) => {
          setPost(data)
        })
  }, [id, findOne])

  return (
    <div className="PostShow">
      <ProfilPageWrapper user={user}>
        <section>
          {post ? (
            <Post post={post} />
          ) : (
            <Loader style={{ padding: '100px 0' }} />
          )}
        </section>
      </ProfilPageWrapper>
    </div>
  )
}

export default PostShow
