import { createContext, useContext } from 'react'
import { fetchUrl } from '../helpers/fetch'
import { AuthContext } from './AuthContext'

export const CommentContext = createContext()

const { Provider } = CommentContext

export const CommentProvider = (props) => {
  const { user } = useContext(AuthContext)
  const getComments = async (id) => {
    return await fetchUrl(`comment/${id}`, null, user.token)
  }

  const getSubComments = async (id) => {
    return await fetchUrl(`subComment/${id}`, {}, user.token)
  }

  const sendSubComment = async (subComment, commentId) => {
    return await fetchUrl(
      'comment',
      {
        method: 'POST',
        body: JSON.stringify({
          body: subComment,
          authorId: `${user?.id}`,
          authorName: `${user?.firstName} ${user?.lastName}`,
          parentCommentId: commentId,
        }),
      },
      user.token,
    )
  }

  const value = {
    getComments,
    sendSubComment,
    getSubComments,
  }

  return <Provider value={value}>{props.children}</Provider>
}
