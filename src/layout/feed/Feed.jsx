import { useContext, useEffect, useState } from 'react'
import Post from '../../component/post/Post'
import './Feed.scss'
import { PostContext } from './../../context/PostContext'
import PostForm from '../../component/postForm/PostForm'
import { AuthContext } from '../../context/AuthContext'
import Compressor from 'compressorjs'
import Loader from '../../component/loader/Loader'

const Feed = ({ posts }) => {
  const [contentText, setContentText] = useState('')
  const [imagePreview, setImagePreview] = useState('')
  const { user } = useContext(AuthContext)
  const { fetchPosts, sendPosts } = useContext(PostContext)

  useEffect(() => user && fetchPosts(), [fetchPosts, user])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (imagePreview) {
      const res = await sendPosts(contentText, imagePreview, user?.image)
      if (res.ok) {
        setContentText('')
        fetchPosts()
        setImagePreview('')
      }
    } else {
      const res = await sendPosts(contentText, null, user?.image)
      if (res.ok) {
        setContentText('')
        fetchPosts()
        setImagePreview('')
      }
    }
  }

  const onImageChange = (event) => {
    const img = event.target.files[0]
    new Compressor(img, {
      quality: 0.6,
      success(result) {
        var reader = new FileReader()
        reader.onloadend = async () => setImagePreview(reader.result)
        reader.readAsDataURL(result)
      },
      error(err) {
        console.log(err.message)
      },
    })
  }

  return (
    <div className="feed">
      <PostForm
        handleSubmit={handleSubmit}
        onImageChange={onImageChange}
        contentText={contentText}
        setContentText={setContentText}
      />
      <div>
        {posts?.length > 0 ? (
          posts?.map((post) => {
            return <Post key={post._id} post={post} />
          })
        ) : (
          <Loader />
        )}
      </div>
    </div>
  )
}

export default Feed
