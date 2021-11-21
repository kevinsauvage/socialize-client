import { createContext, useCallback, useContext, useState } from 'react'
import { fetchUrl } from './../helpers/fetch'
import { AuthContext } from './AuthContext'

export const PostContext = createContext()

const { Provider } = PostContext

export const PostProvider = (props) => {
  const [fetchPostLoader, setFetchPost] = useState(false)
  const { user } = useContext(AuthContext)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchPosts = useCallback(async () => {
    try {
      return await fetchUrl(`posts/${user._id}`)
    } catch (error) {
      console.log(error)
    } finally {
      setFetchPost(false)
    }
  }, [user])

  const sendPosts = useCallback(
    async (contentText, imageUrl, videoUrl) => {
      try {
        setFetchPost(true)

        const res = await fetchUrl('posts', {
          method: 'Post',
          body: JSON.stringify({
            body: contentText,
            authorId: `${user?._id}`,
            image: imageUrl,
            video: videoUrl,
          }),
        })

        setFetchPost(false)

        return res
      } catch (error) {
        console.log(error)
      }
    },
    [user],
  )

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

  const deletePost = useCallback(async (id) => {
    try {
      return await fetchUrl(`posts/${id}`, { method: 'DELETE' })
    } catch (error) {
      console.log(error)
    }
  }, [])

  const updatePost = useCallback(
    async (form, id) => {
      try {
        const res = await fetchUrl(`posts/${id}`, {
          method: 'PUT',
          body: JSON.stringify(form),
        })
        await fetchPosts()
        return res
      } catch (error) {
        console.log(error)
      }
    },
    [fetchPosts],
  )

  const value = {
    sendPosts,
    fetchPosts,
    getUserPost,
    deletePost,
    commentPost,
    fetchPostLoader,
    updatePost,
  }

  return <Provider value={value}>{props.children}</Provider>
}
