import { createContext, useCallback, useContext, useState } from 'react'
import { fetchUrl } from './../helpers/fetch'
import { AuthContext } from './AuthContext'

export const PostContext = createContext()

const { Provider } = PostContext

export const PostProvider = (props) => {
  const [posts, setPosts] = useState([])
  const [fetchPostLoader, setFetchPost] = useState(false)

  const { user } = useContext(AuthContext)

  const sendPosts = useCallback(
    async (contentText, imageUrl) => {
      try {
        setFetchPost(true)
        return await fetchUrl('posts', {
          method: 'Post',
          body: JSON.stringify({
            body: contentText,
            authorId: `${user?._id}`,
            authorName: `${user?.firstName} ${user?.lastName}`,
            image: imageUrl,
          }),
        })
      } catch (error) {
        console.log(error)
      }
    },
    [user],
  )

  const fetchPosts = useCallback(async () => {
    try {
      const res = await fetchUrl(`posts/${user._id}`)
      if (res.ok) {
        const data = await res.json()
        setPosts(data)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setFetchPost(false)
    }
  }, [user])

  const getUserPost = useCallback(async () => {
    return await fetchUrl(`posts/user/${user?._id}`)
  }, [user])

  const commentPost = useCallback(
    async (comment, id) => {
      try {
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
      } catch (error) {
        console.log(error)
      }
    },
    [user],
  )

  const deletePost = useCallback(
    async (id) => {
      try {
        return await fetchUrl(`posts/${id}`, { method: 'DELETE' })
      } catch (error) {
        console.log(error)
      } finally {
        fetchPosts()
      }
    },
    [fetchPosts],
  )

  const updatePost = useCallback(
    async (form, id) => {
      try {
        return await fetchUrl(`posts/${id}`, {
          method: 'PUT',
          body: JSON.stringify(form),
        })
      } catch (error) {
        console.log(error)
      } finally {
        fetchPosts()
      }
    },
    [fetchPosts],
  )

  const value = {
    sendPosts,
    fetchPosts,
    posts,
    getUserPost,
    deletePost,
    commentPost,
    fetchPostLoader,
    updatePost,
  }

  return <Provider value={value}>{props.children}</Provider>
}
