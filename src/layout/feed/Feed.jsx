import { useContext, useState } from 'react'
import Post from '../../component/post/Post'
import './Feed.scss'
import { PostContext } from './../../context/PostContext'
import PostForm from '../../component/postForm/PostForm'
import Loader from '../../component/loader/Loader'
import { uploadImage, uploadVideo } from '../../helpers/upload'
import PostPreview from '../../component/postPreview/PostPreview'

const Feed = ({ posts }) => {
  const [contentText, setContentText] = useState('')
  const [image, setImage] = useState('')
  const [video, setVideo] = useState('')
  const { sendPosts, fetchPostLoader } = useContext(PostContext)
  const [loading, setLoading] = useState(false)

  const validateFile = (file) => {
    var video = document.createElement('video')
    video.preload = 'metadata'

    video.onloadedmetadata = function () {
      window.URL.revokeObjectURL(video.src)

      if (video.duration > 120)
        return window.alert(
          'Video is to big, only video less then 2 minute accepted.',
        )

      setVideo(file)
    }

    video.src = URL.createObjectURL(file)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    if (image) {
      const data = await uploadImage(image)
      const res = await sendPosts(contentText, data.eager?.[0]?.secure_url)
      if (res) {
        setContentText('')
        setImage('')
      } else window.alert('Oups, something went wrong. Please try again.')
    } else if (video) {
      const data = await uploadVideo(video)
      const res = await sendPosts(contentText, null, data.secure_url)

      if (res) {
        setContentText('')
        setVideo('')
      } else window.alert('Oups, something went wrong. Please try again.')
    } else {
      const res = await sendPosts(contentText)
      if (res) {
        setContentText('')
      } else window.alert('Oups, something went wrong. Please try again.')
    }
    setLoading(false)
  }

  const onImageChange = (event) => {
    const img = event.target.files[0]
    setImage(img)
    setVideo(undefined)
  }

  const onVideoChange = async (e) => {
    const video = e.target.files[0]
    setImage(undefined)
    validateFile(video)
  }

  return (
    <div className="feed">
      <PostForm
        handleSubmit={handleSubmit}
        onImageChange={onImageChange}
        contentText={contentText}
        onVideoChange={onVideoChange}
        setContentText={setContentText}
      />
      {(contentText || video || image) && !loading && (
        <PostPreview body={contentText} image={image} video={video} />
      )}
      {loading && <Loader style={{ padding: '100px 0' }} />}
      <div>
        {!posts && !fetchPostLoader ? (
          <Loader style={{ paddingTop: '100px' }} />
        ) : posts?.length === 0 ? (
          <p className="feed__noPost">No post to show</p>
        ) : (
          posts?.map((post, i) => {
            return <Post key={post._id + i} post={post} />
          })
        )}
      </div>
      {fetchPostLoader && (
        <Loader style={{ margin: '100px 0', transform: 'scale(0.4)' }} />
      )}
    </div>
  )
}

export default Feed
