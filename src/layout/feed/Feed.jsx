import { useCallback, useEffect, useState } from 'react'
import Post from '../../component/post/Post'
import { fetchUrl } from '../../helpers/fetch'
import './Feed.scss'

const Feed = () => {
  const [posts, setPosts] = useState([])

  const fetchPosts = useCallback(() => {
    fetchUrl('posts')
      .then((res) => res.json())
      .then((data) => setPosts(data))
  }, [])

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  return (
    <div className="feed">
      <div className="feed__reload" onClick={fetchPosts}>
        <button onClick={fetchPosts}>Reload</button>
      </div>
      {posts?.map((post) => {
        return <Post key={post._id} post={post} />
      })}
    </div>
  )
}

export default Feed
