import React, { useEffect } from 'react'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'

import { getPostAction } from '../actions/postActions'
import { getCommentsAction } from '../actions/commentsActions'

import { Post } from '../components/Post'
import { Comment } from '../components/Comment'

const SinglePostPage = ({ match }: any) => {
  const dispatch = useDispatch()
  const loadingGetPost = useSelector((state: RootStateOrAny) => {
    return {
      post: state.post?.post?.loading
    }
  })
  const loadingGetComments = useSelector((state: RootStateOrAny) => {
    return {
      comments: state.comments?.comments?.loading
    }
  })
  const state = useSelector((state: RootStateOrAny) => state)
  const post = useSelector((state: RootStateOrAny) => state.post.post?.data)
  const comments = useSelector(
    (state: RootStateOrAny) => state.comments.comments?.data
  )
  useEffect(() => {
    const { id } = match.params
    dispatch(getPostAction({ params: { id } }))
    dispatch(getCommentsAction({ params: { postId: id } }))
  }, [dispatch, match])

  const renderPost = () => {
    if (loadingGetPost.post) return <p>Loading post...</p>
    return <Post post={post} />
  }

  const renderComments = () => {
    if (loadingGetComments.comments) return <p>Loading comments...</p>
    return comments.map((comment: any) => (
      <Comment key={comment.id} comment={comment} />
    ))
  }

  return (
    <section>
      {console.log(state)}
      {renderPost()}
      <h2>Comments</h2>
      {renderComments()}
    </section>
  )
}

export default SinglePostPage
