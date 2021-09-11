//import * as actions from '../actions/postsActions'
import { actionsCondition } from 'faster-ts'

/* export const initialState = {
  loadingGetPosts: false,
  posts: []
}

export default function postsReducer(state = initialState, action) {
  switch (action.type) {
    case actions.START_LOADING_GET_POSTS:
      return { ...state, loadingGetPosts: true }
    case actions.GET_POSTS:
      return { posts: action.payload, loading: false }
    case actions.STOP_LOADING_GET_POSTS:
      return { ...state, loadingGetPosts: false }
    default:
      return state
  }
} */
/* ***************** Posts Reducer ***************/

const postsReducer = actionsCondition([
  {
    key: 'getPosts',
    stateKey: 'posts',
    initStateKey: [],
    anotherActions: [
      {
        key: 'updatePost',
        setState: (posts: any, action: any) => {
          console.log({ posts, action })
          console.log('action.payload.id ', action.payload.id)
          return [
            ...posts?.data.map((post: any) =>
              post.id === action.payload.id ? action.payload : post
            )
          ]
        }
      },
      {
        key: 'deletePost',
        setState: (posts: any, action: any) => {
          console.log({ posts, action })
          return [
            ...posts?.data.filter((post: any) => post.id !== action.payload)
          ]
        }
      },
      {
        key: 'addPost',
        setState: (posts: any, action: any) => {
          console.log({ posts, action })
          return [action.payload, ...posts?.data]
        }
      }
    ]
  }
])

export default postsReducer
