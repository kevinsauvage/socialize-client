import { createContext, useCallback, useContext, useState } from 'react'
import { fetchUrl } from './../helpers/fetch'
import { AuthContext } from './AuthContext'

export const PostContext = createContext()

const { Provider } = PostContext

export const PostProvider = (props) => {
  const [fetchPostLoader, setFetchPost] = useState(false)
  const { user, token } = useContext(AuthContext)
  const [posts, setPosts] = useState(undefined)
  const [userPosts, setUserPosts] = useState(undefined)
  const [limit, setLimit] = useState(10)
  const [userPostLimit, setLUserPostLimit] = useState(10)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchPosts = useCallback(async () => {
    try {
      setFetchPost(true)

      return fetchUrl(`posts/?limit=${limit}&userId=${user._id}`, {}, token)
        .then((res) => {
          setFetchPost(false)

          if (res && res.ok) {
            return res.json()
          }
        })
        .then((data) => data && setPosts(data))
    } catch (error) {
      console.log(error)
    }
  }, [token, user, limit])

  const sendPosts = useCallback(
    async (contentText, imageUrl, videoUrl) => {
      try {
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
        if (res.ok) {
          const post = await res.json()
          if (posts && posts?.length) setPosts([post, ...posts])
          if (userPosts && userPosts?.length) setUserPosts([post, ...userPosts])
          return true
        } else {
          return false
        }
      } catch (error) {
        console.log(error)
      }
    },
    [user, token, posts, userPosts],
  )

  const getUserPost = useCallback(async () => {
    const res = await fetchUrl(
      `posts/user/${user?._id}?limit=${userPostLimit}`,
      {},
      token,
    )
    const data = await res.json()
    return setUserPosts(data)
  }, [user, token, userPostLimit])

  const deletePost = useCallback(
    async (id) => {
      try {
        const res = await fetchUrl(`posts/${id}`, { method: 'DELETE' }, token)
        if (res.ok) {
          fetchPosts()
          getUserPost()
        }
        return res
      } catch (error) {
        console.log(error)
      }
    },
    [token, fetchPosts, getUserPost],
  )

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

      return setPosts(newPost)
    }

    return res
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

      return setPosts(newPost)
    }
    return res
  }

  const findOne = async (postId) =>
    await fetchUrl(`posts/${postId}`, { method: 'GET' }, token)

  const value = {
    sendPosts,
    fetchPosts,
    getUserPost,
    deletePost,
    fetchPostLoader,
    posts,
    userPosts,
    handleLike,
    handleUnlike,
    setLimit,
    findOne,
    setLUserPostLimit,
  }

  return <Provider value={value}>{props.children}</Provider>
}
