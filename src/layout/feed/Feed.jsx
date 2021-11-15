import { useContext, useEffect, useState } from 'react'
import Post from '../../component/post/Post'
import './Feed.scss'
import { PostContext } from './../../context/PostContext'
import PostForm from '../../component/postForm/PostForm'
import { AuthContext } from '../../context/AuthContext'

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
    var reader = new FileReader()
    reader.onloadend = async () => {
      console.log('RESULT')
      setImagePreview(reader.result)
    }
    reader.readAsDataURL(img)
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
        {posts?.map((post) => {
          return <Post key={post._id} post={post} />
        })}
      </div>
    </div>
  )
}

export default Feed
