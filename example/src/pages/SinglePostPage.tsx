import React, { useEffect } from 'react'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'

import { getPostByIdAction } from '../actions/postActions'
import { getCommentsAction } from '../actions/commentsActions'

import { Post } from '../components/Post'
import { Comment } from '../components/Comment'

const SinglePostPage = ({ match }: any) => {
  const dispatch = useDispatch()
  const { loadingGetPostById, loadingGetComments } = useSelector(
    (state: RootStateOrAny) => {
      return {
        loadingGetPostById: state.postById?.postById?.loading,
        loadingGetComments: state.comments?.comments?.loading
      }
    }
  )
  //const state = useSelector((state) => state)
  const postById = useSelector(
    (state: RootStateOrAny) => state.postById.postById?.data
  )
  const comments = useSelector(
    (state: RootStateOrAny) => state.comments.comments?.data
  )
  useEffect(() => {
    const { id } = match.params
    /* *** with easy-redux *** */
    dispatch(getPostByIdAction({ paramsUrl: { id } }))
    dispatch(getCommentsAction({ paramsUrl: { postId: id } }))
  }, [dispatch, match])

  const renderPost = () => {
    if (loadingGetPostById) return <p>Loading post...</p>
    return <Post post={postById} />
  }

  const renderComments = () => {
    if (loadingGetComments) return <p>Loading comments...</p>
    return comments.map((comment: any) => (
      <Comment key={comment.id} comment={comment} />
    ))
  }

  return (
    <section>
      {renderPost()}
      <h2>Comments</h2>
      {renderComments()}
    </section>
  )
}

export default SinglePostPage
