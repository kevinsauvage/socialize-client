import { createContext, useContext, useCallback } from 'react'
import { fetchUrl } from '../helpers/fetch'
import { AuthContext } from './AuthContext'

export const CommentContext = createContext()

const { Provider } = CommentContext

export const CommentProvider = (props) => {
  const { user, token } = useContext(AuthContext)
  const getComments = async (id, opt) => {
    return await fetchUrl(`comment/${id}`, null, token, opt)
  }

  const getSubComments = async (id, signal) => {
    return await fetchUrl(`subComment/${id}`, {}, token, signal)
  }

  const sendSubComment = async (
    subComment,
    commentId,
    postAuthorId,
    postId,
  ) => {
    return await fetchUrl(
      'comment',
      {
        method: 'POST',
        body: JSON.stringify({
          body: subComment,
          authorId: user?._id,
          authorName: user?.username,
          parentCommentId: commentId,
          postAuthorId: postAuthorId,
          postId: postId,
        }),
      },
      token,
    )
  }

  const commentPost = useCallback(
    async (comment, id, postAuthorId) => {
      try {
        return await fetchUrl(
          'comment',
          {
            method: 'POST',
            body: JSON.stringify({
              body: comment,
              authorId: user?._id,
              authorName: user?.username,
              parentCommentId: '',
              postAuthorId: postAuthorId,
              postId: id,
            }),
          },
          token,
        )
      } catch (error) {
        console.log(error)
      }
    },
    [user, token],
  )

  const value = {
    getComments,
    sendSubComment,
    getSubComments,
    commentPost,
  }

  return <Provider value={value}>{props.children}</Provider>
}
