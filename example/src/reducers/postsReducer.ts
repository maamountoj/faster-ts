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
  { key: 'getPosts', stateKey: 'posts', initStateKey: [] }
])

export default postsReducer
