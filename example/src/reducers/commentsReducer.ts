import { actionsCondition } from 'faster-ts'
/* import * as actions from '../actions/commentsActions'

export const initialState = {
  loadingGetComments: false,
  comments: []
}

export default function commentsReducer(state = initialState, action) {
  switch (action.type) {
    case actions.START_LOADING_GET_COMMENTS:
      return { ...state, loadingGetComments: true }
    case actions.GET_COMMENTS:
      return { comments: action.payload, loading: false }
    case actions.STOP_LOADING_GET_COMMENTS:
      return { ...state, loadingGetComments: false }
    default:
      return state
  }
} */
/* ***************** Post Reducer ***************/

const commentsReducer = actionsCondition([
  { key: 'getComments', stateKey: 'comments', initStateKey: [] }
])

export default commentsReducer
