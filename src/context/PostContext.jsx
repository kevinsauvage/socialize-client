import {
  createContext,
  useCallback,
  useContext,
  useState,
  useEffect,
} from 'react'
import { io } from 'socket.io-client'
import { urls } from '../ApiCall/apiUrl'
import { fetchUrl } from './../helpers/fetch'
import { AuthContext } from './AuthContext'

export const PostContext = createContext()

const { Provider } = PostContext

export const PostProvider = (props) => {
  const [fetchPostLoader, setFetchPost] = useState(false)
  const { user } = useContext(AuthContext)
  const [posts, setPosts] = useState([])
  const [userPosts, setUserPosts] = useState([])
  const [userNotification, setUserNotification] = useState([])

  useEffect(() => {
    const socket = io(urls.baseUrl)
    socket.on('connnection', () => console.log('connected to server'))
    socket.on('post-changed', (newPosts) => setPosts(newPosts))
    socket.on('message', (message) => console.log(message))
    socket.on('disconnect', () => console.log('Socket disconnecting'))
  }, [])

  console.log(user)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchPosts = useCallback(
    async (limit = 10) => {
      try {
        return fetchUrl(`posts/${user._id}?limit=${limit}`, null, user.token)
          .then((res) => res.json())
          .then((data) => {
            console.log(data)
            setPosts((prev) => [...prev, ...data])
          })
      } catch (error) {
        console.log(error)
      } finally {
        setFetchPost(false)
      }
    },
    [user],
  )

  const sendPosts = useCallback(
    async (contentText, imageUrl, videoUrl) => {
      try {
        setFetchPost(true)

        const res = await fetchUrl(
          'posts',
          {
            method: 'Post',
            body: JSON.stringify({
              body: contentText,
              authorId: `${user?._id}`,
              image: imageUrl,
              video: videoUrl,
            }),
          },
          user.token,
        )

        setFetchPost(false)

        return res
      } catch (error) {
        console.log(error)
      }
    },
    [user],
  )

  const getUserPost = useCallback(async () => {
    const res = await fetchUrl(`posts/user/${user?._id}`, {}, user.token)
    const data = await res.json()
    setUserPosts(data)
  }, [user])

  const commentPost = useCallback(
    async (comment, id) => {
      try {
        return await fetchUrl(
          'comment',
          {
            method: 'POST',
            body: JSON.stringify({
              body: comment,
              authorId: `${user?._id}`,
              authorName: `${user?.firstName} ${user?.lastName}`,
              parentCommentId: '',
              postId: id,
            }),
          },
          user.token,
        )
      } catch (error) {
        console.log(error)
      }
    },
    [user],
  )

  const deletePost = useCallback(
    async (id) => {
      try {
        return await fetchUrl(`posts/${id}`, { method: 'DELETE' }, user.token)
      } catch (error) {
        console.log(error)
      }
    },
    [user],
  )

  const updatePost = async (form, id) => {
    try {
      const res = await fetchUrl(
        `posts/${id}`,
        {
          method: 'PUT',
          body: JSON.stringify(form),
        },
        user.token,
      )
      await fetchPosts(10)
      return res
    } catch (error) {
      console.log(error)
    }
  }

  const sendNotification = async (authorId, type, postId) => {
    const body = {
      type: type,
      userId: user._id,
      authorId: authorId,
      postId: postId,
    }

    try {
      const res = await fetchUrl(
        'notification',
        {
          method: 'Post',
          body: JSON.stringify(body),
        },
        user.token,
      )
      const data = await res.json()
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  const getUserNotification = useCallback(async () => {
    console.log('get user notif')
    const res = await fetchUrl(
      `notification/${user._id}`,
      {
        method: 'Get',
      },
      user.token,
    )
    const data = await res.json()
    console.log(data)
    setUserNotification(data)
  }, [user])

  useEffect(() => {
    user && getUserNotification()
  }, [getUserNotification, user])

  const value = {
    sendPosts,
    fetchPosts,
    getUserPost,
    deletePost,
    commentPost,
    fetchPostLoader,
    updatePost,
    posts,
    userPosts,
    sendNotification,
    getUserNotification,
    userNotification,
  }

  return <Provider value={value}>{props.children}</Provider>
}
