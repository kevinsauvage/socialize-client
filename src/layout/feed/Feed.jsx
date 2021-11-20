import { useContext, useEffect, useState } from 'react'
import Post from '../../component/post/Post'
import './Feed.scss'
import { PostContext } from './../../context/PostContext'
import PostForm from '../../component/postForm/PostForm'
import { AuthContext } from '../../context/AuthContext'
import Compressor from 'compressorjs'
import Loader from '../../component/loader/Loader'
import uploadImage from '../../helpers/uploadImage'

const Feed = ({ posts }) => {
  const [contentText, setContentText] = useState('')
  // eslint-disable-next-line no-unused-vars
  const [imagePreview, setImagePreview] = useState('')
  const [image, setImage] = useState('')
  const { user } = useContext(AuthContext)
  const { fetchPosts, sendPosts, fetchPostLoader } = useContext(PostContext)

  useEffect(() => user && fetchPosts(), [fetchPosts, user])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (image) {
      const data = await uploadImage(image, 400)
      const res = await sendPosts(contentText, data.eager?.[0]?.secure_url)
      if (res.ok) {
        setContentText('')
        fetchPosts()
        setImagePreview('')
      }
    } else {
      const res = await sendPosts(contentText)
      if (res.ok) {
        setContentText('')
        fetchPosts()
        setImagePreview('')
      }
    }
  }

  const onImageChange = (event) => {
    const img = event.target.files[0]
    setImage(img)
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
        {fetchPostLoader && (
          <Loader style={{ margin: '100px 0', transform: 'scale(0.4)' }} />
        )}
        {posts?.length > 0 ? (
          posts?.map((post) => {
            return <Post key={post._id} post={post} />
          })
        ) : (
          <Loader style={{ margin: '100px 0' }} />
        )}
      </div>
    </div>
  )
}

export default Feed
