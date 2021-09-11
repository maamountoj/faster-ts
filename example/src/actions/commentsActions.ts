import { dispatchActionsWithApi } from 'faster-create-redux-ts'

/* Became To like this */
const API_COMMENTS_URL = `http://localhost:7071/comments?postId=[postId]`
export const { getCommentsAction }: any = dispatchActionsWithApi([
  {
    name: 'getComments',
    url: API_COMMENTS_URL,
    method: 'get'
  }
])

/* 

export const GET_COMMENTS = 'GET_COMMENTS'
export const START_LOADING_GET_COMMENTS = 'START_LOADING_GET_COMMENTS'
export const STOP_LOADING_GET_COMMENTS = 'STOP_LOADING_GET_COMMENTS'
export const startLoadingComments = () => ({
  type: START_LOADING_GET_COMMENTS,
  payload: true
})
export const stopLoadingComments = () => ({
  type: STOP_LOADING_GET_COMMENTS,
  payload: true
})
export const getComments = (comments) => ({
  type: GET_COMMENTS,
  payload: comments
})

export function getCommentsAction(postId) {
  return async (dispatch) => {
    dispatch(startLoadingComments())

    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
      )
      const data = await response.json()

      dispatch(getComments(data))
    } catch (error) {
      dispatch(stopLoadingComments())
    }
    dispatch(stopLoadingComments())
  }
} */
