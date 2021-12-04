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
  const { user, token } = useContext(AuthContext)
  const [posts, setPosts] = useState([])
  const [userPosts, setUserPosts] = useState([])

  useEffect(() => {
    const socket = io(urls.baseUrl)
    socket.on('connnection', () => console.log('connected to server'))
    socket.on('post-changed', (newPosts) => setPosts(newPosts))
    socket.on('message', (message) => console.log(message))
    socket.on('disconnect', () => console.log('Socket disconnecting'))
  }, [])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchPosts = useCallback(
    async (limit = 10) => {
      try {
        return fetchUrl(`posts/?limit=${limit}&userId=${user._id}`, {}, token)
          .then((res) => res.json())
          .then((data) => {
            setPosts((prev) => [...prev, ...data])
          })
      } catch (error) {
        console.log(error)
      } finally {
        setFetchPost(false)
      }
    },
    [user, token],
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
              authorId: user?._id,
              authorName: user?.username,
              image: imageUrl,
              video: videoUrl,
            }),
          },
          token,
        )

        setFetchPost(false)

        return res
      } catch (error) {
        console.log(error)
      }
    },
    [user, token],
  )

  const getUserPost = useCallback(async () => {
    const res = await fetchUrl(`posts/user/${user?._id}`, {}, token)
    const data = await res.json()
    setUserPosts(data)
  }, [user, token])

  const deletePost = useCallback(
    async (id) => {
      try {
        return await fetchUrl(`posts/${id}`, { method: 'DELETE' }, token)
      } catch (error) {
        console.log(error)
      }
    },
    [token],
  )

  const findOneAndUpdateFeed = async (id) => {
    try {
      const res = await fetchUrl(`posts/${id}`, { method: 'get' }, token)
      const data = await res.json()
      const newPosts = posts.map((post) => {
        if (post._id === id) return data
        else return post
      })
      setPosts(newPosts)
      console.log(data)
    } catch (err) {
      console.log(err)
    }
  }

  const updatePost = async (form, id) => {
    try {
      const res = await fetchUrl(
        `posts/${id}`,
        {
          method: 'PUT',
          body: JSON.stringify(form),
        },
        token,
      )
      if (res.ok) {
        findOneAndUpdateFeed(id)
      }
      return res
    } catch (error) {
      console.log(error)
    }
  }

  const handleUnlike = async (postId) => {
    const res = await fetchUrl(
      `posts/${postId}/dislike`,
      {
        method: 'put',
        body: JSON.stringify({ userId: user._id }),
      },
      token,
    )

    if (res.ok) {
      const data = await res.json()
      const newPost = posts.map((post) => {
        if (post._id === postId) return data
        else return post
      })

      setPosts(newPost)
    }
  }

  const handleLike = async (postId) => {
    const res = await fetchUrl(
      `posts/${postId}/like`,
      {
        method: 'put',
        body: JSON.stringify({ userId: user._id }),
      },
      token,
    )

    if (res.ok) {
      const data = await res.json()
      const newPost = posts.map((post) => {
        if (post._id === postId) return data
        else return post
      })

      setPosts(newPost)
    }
  }

  const value = {
    sendPosts,
    fetchPosts,
    getUserPost,
    deletePost,
    fetchPostLoader,
    updatePost,
    posts,
    userPosts,
    handleLike,
    handleUnlike,
  }

  return <Provider value={value}>{props.children}</Provider>
}
