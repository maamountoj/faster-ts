import { actionsCondition } from 'faster-ts'
/* import * as actions from '../actions/postActions'

export const initialState = {
  loadingGetPost: false,
  post: {}
}

export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case actions.START_LOADING_GET_POST:
      return { ...state, loadingGetPost: true }
    case actions.GET_POST:
      return { post: action.payload, loading: false }
    case actions.STOP_LOADING_GET_POST:
      return { ...state, loadingGetPost: false }
    default:
      return state
  }
} */

/* ***************** Post Reducer ***************/

const postReducer = actionsCondition([
  {
    key: 'getPost',
    stateKey: 'post',
    initStateKey: {}
  }
])

export default postReducer
