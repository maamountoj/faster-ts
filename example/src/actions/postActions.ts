import { dispatchActionsWithApi } from 'faster-ts'

/* export const GET_POST = 'GET POST'
export const START_LOADING_GET_POST = 'START_LOADING_GET_POST'
export const STOP_LOADING_GET_POST = 'STOP_LOADING_GET_POST'

export const startLoadingPost = () => ({
  type: START_LOADING_GET_POST,
  payload: true
})
export const stopLoadingPost = () => ({
  type: STOP_LOADING_GET_POST,
  payload: false
})
export const getPost = (post) => ({
  type: GET_POST,
  payload: post
})

export function getPostAction(id) {
  return async (dispatch) => {
    dispatch(startLoadingPost())

    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      )
      const data = await response.json()

      dispatch(getPost(data))
    } catch (error) {
      dispatch(stopLoadingPost())
    }
    dispatch(stopLoadingPost())
  }
} */
/* Became To like this */
const API_POST_URL = `https://jsonplaceholder.typicode.com/posts/[id]`
export const { getPostAction }: any = dispatchActionsWithApi([
  {
    name: 'getPost',
    url: API_POST_URL,
    method: 'get',
    setPayload: (data: any) => {
      return data?.res.data
    }
  }
])
