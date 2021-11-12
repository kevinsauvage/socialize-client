import { createContext, useCallback, useContext, useState } from 'react'
import { fetchUrl } from './../helpers/fetch'
import { AuthContext } from './AuthContext'

export const PostContext = createContext()

const { Provider } = PostContext

export const PostProvider = (props) => {
  const [posts, setPosts] = useState([])

  const { user } = useContext(AuthContext)

  const sendPosts = async (contentText, image, authorAvatar) => {
    const res = await fetchUrl('posts', {
      method: 'Post',
      body: JSON.stringify({
        body: contentText,
        authorId: `${user?._id}`,
        authorName: `${user?.firstName} ${user?.lastName}`,
        image: image,
        authorAvatar: authorAvatar,
      }),
    })
    return res
  }

  const fetchPosts = useCallback(async () => {
    const res = await fetchUrl('posts')
    if (res.ok) {
      const data = await res.json()
      setPosts(data)
    }
  }, [])

  const getUserPost = async () => {
    return await fetchUrl(`posts/user/${user?._id}`)
  }

  const value = {
    sendPosts,
    fetchPosts,
    posts,
    getUserPost,
  }

  return <Provider value={value}>{props.children}</Provider>
}
