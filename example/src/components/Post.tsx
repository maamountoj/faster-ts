import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { deletePostAction, updatePostAction } from '../actions/postsActions'
import '../assets/style.css'
import CustomModal from './CustomModal'

export const Post = ({ post, excerpt }: any) => {
  const dispatch = useDispatch()
  /*  const loadingUpdatePost = useSelector(
    (state: RootStateOrAny) => state.posts?.posts?.loadingUpdatePost
  ) */
  const [modalIsOpen, setIsOpen] = React.useState(false)
  const [title, setTitle] = React.useState(post?.title)
  const [body, setBody] = React.useState(post?.body)

  function openModal() {
    setIsOpen(true)
  }

  const updatePost = () => {
    dispatch(
      updatePostAction({
        body: { title, body },
        paramsUrl: { id: post?.id }
      })
    )
    setIsOpen(false)
  }
  function toggleModal() {
    setIsOpen(!modalIsOpen)
  }
  useEffect(() => {
    setBody(post?.body)
    setTitle(post?.title)
  }, [post?.title, post?.body])
  return (
    <>
      <article className={excerpt ? 'post-excerpt' : 'post'}>
        <h2>{post?.title}</h2>
        <p>{excerpt ? post?.body?.substring(0, 100) : post?.body}</p>

        {excerpt && (
          <>
            <Link to={`/posts/${post?.id}`} className='button'>
              View
            </Link>
            <div className='button' onClick={openModal}>
              Update
            </div>
            <div
              className='button'
              onClick={() => {
                dispatch(deletePostAction({ paramsUrl: { id: post?.id } }))
              }}
            >
              Delete
            </div>
          </>
        )}
      </article>
      <CustomModal
        modalIsOpen={modalIsOpen}
        toggleModal={toggleModal}
        contentLabel='Example Modal'
      >
        <form>
          <h1>Update Post #{post?.id}</h1>
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
          <button className='button' onClick={updatePost}>
            Submit
          </button>
        </form>
      </CustomModal>
    </>
  )
}
