import _ from 'lodash'
import React, { useEffect } from 'react'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'

import { getPostsAction, addPostAction } from '../actions/postsActions'
import CustomModal from '../components/CustomModal'

import { Post } from '../components/Post'

const PostsPage = () => {
  const dispatch = useDispatch()
  const loadingGetPosts = useSelector(
    (state: RootStateOrAny) => state.posts?.posts?.loadingGetPosts
  )
  const loadingAddPost = useSelector(
    (state: RootStateOrAny) => state.posts?.posts?.loadingAddPost
  )
  const posts = useSelector((state: RootStateOrAny) => state.posts.posts?.data)
  const [modalIsOpen, setIsOpen] = React.useState(false)
  const [title, setTitle] = React.useState('')
  const [body, setBody] = React.useState('')
  useEffect(() => {
    dispatch(getPostsAction())
  }, [dispatch])
  const addPost = () => {
    dispatch(
      addPostAction({
        title,
        body,
        userId: 1
      })
    )
    setIsOpen(false)
    setTitle('')
    setBody('')
  }
  const renderPosts = () => {
    if (loadingGetPosts) return <p>Loading posts...</p>

    return _.orderBy(posts, ['id'], ['desc'])?.map((post: any) => (
      <Post key={post.id} post={post} excerpt />
    ))
  }
  function openModal() {
    setIsOpen(true)
  }
  function toggleModal() {
    setIsOpen(!modalIsOpen)
  }
  return (
    <section>
      <h1>Posts</h1>
      <div
        style={{
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between'
        }}
      >
        <p>
          <strong>Total:{posts?.length}</strong>
        </p>
        <button className='button' onClick={openModal}>
          {loadingAddPost ? '...Loading' : 'Add Post'}
        </button>
        <CustomModal
          modalIsOpen={modalIsOpen}
          contentLabel='Example Modal'
          toggleModal={toggleModal}
        >
          <form>
            <h1>Add Post</h1>
            <label>
              Title:
              <input
                name='title'
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </label>
            <label>
              Body:
              <textarea
                name='body'
                value={body}
                onChange={(e) => setBody(e.target.value)}
                required
              />
            </label>
            <button className='button' onClick={addPost}>
              Submit
            </button>
          </form>
        </CustomModal>
      </div>
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
