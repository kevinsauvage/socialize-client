import { useContext, useState } from 'react'
import Post from '../../component/post/Post'
import './Feed.scss'
import { PostContext } from './../../context/PostContext'
import PostForm from '../../component/postForm/PostForm'
import Compressor from 'compressorjs'
import Loader from '../../component/loader/Loader'
import { uploadImage, uploadVideo } from '../../helpers/upload'

const Feed = ({ posts }) => {
  const [contentText, setContentText] = useState('')
  // eslint-disable-next-line no-unused-vars
  const [imagePreview, setImagePreview] = useState('')
  const [image, setImage] = useState('')
  const [video, setVideo] = useState('')
  const { sendPosts, fetchPostLoader } = useContext(PostContext)

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
    if (image) {
      const data = await uploadImage(image)
      const res = await sendPosts(contentText, data.eager?.[0]?.secure_url)
      if (res) {
        setContentText('')
        setImagePreview('')
        setImage('')
      }
    } else if (video) {
      const data = await uploadVideo(video)
      console.log(data)
      const res = await sendPosts(contentText, null, data.secure_url)

      if (res) {
        setContentText('')
        setImagePreview('')
        setVideo('')
      }
    } else {
      const res = await sendPosts(contentText)
      if (res) {
        setContentText('')
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
  const onVideoChange = async (e) => {
    const video = e.target.files[0]
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
