import React, { useEffect } from 'react'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'

import { getPostsAction } from '../actions/postsActions'

import { Post } from '../components/Post'

const PostsPage = () => {
  const dispatch = useDispatch()
  const loadingGetPosts = useSelector((state:RootStateOrAny) => state.posts.loadingGetPosts)
  const posts = useSelector((state:RootStateOrAny) => state.posts.posts)
  useEffect(() => {
    dispatch(getPostsAction())
    //dispatch(getPostsAction())
  }, [dispatch])

  const renderPosts = () => {
    if (loadingGetPosts) return <p>Loading posts...</p>
    return posts.map((post:any) => <Post key={post.id} post={post} excerpt />)
  }

  return (
    <section>
      <h1>Posts</h1>
      {renderPosts()}
    </section>
  )
}

/* const mapStateToProps = (state) => ({
  loading: state.posts.loading,
  posts: state.posts.posts,
  hasErrors: state.posts.hasErrors
}) */

export default PostsPage
