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
    const res = await fetchUrl(`posts/${user._id}`)
    if (res.ok) {
      const data = await res.json()
      setPosts(data)
    }
  }, [user])

  const getUserPost = async () => {
    return await fetchUrl(`posts/user/${user?._id}`)
  }

  const commentPost = async (comment, id) => {
    return await fetchUrl('comment', {
      method: 'POST',
      body: JSON.stringify({
        body: comment,
        authorId: `${user?._id}`,
        authorName: `${user?.firstName} ${user?.lastName}`,
        parentCommentId: '',
        postId: id,
      }),
    })
  }

  const deletePost = async (id) => {
    return await fetchUrl(`posts/${id}`, {
      method: 'DELETE',
    }).then(() => fetchPosts())
  }
  const value = {
    sendPosts,
    fetchPosts,
    posts,
    getUserPost,
    deletePost,
    commentPost,
  }

  return <Provider value={value}>{props.children}</Provider>
}
