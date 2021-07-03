import { dispatchActionsWithApi } from 'faster-ts'
/* export const GET_POSTS = 'GET POSTS'
export const START_LOADING_GET_POSTS = 'START_LOADING_GET_POSTS'
export const STOP_LOADING_GET_POSTS = 'STOP_LOADING_GET_POSTS'

export const startLoadingPosts = () => ({
  type: START_LOADING_GET_POSTS,
  payload: true
})
export const stopLoadingPosts = () => ({
  type: STOP_LOADING_GET_POSTS,
  payload: true
})
export const getPosts = (posts) => ({
  type: GET_POSTS,
  payload: posts
})

export function getPostsAction() {
  return async (dispatch) => {
    dispatch(startLoadingPosts())

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts')
      const data = await response.json()

      dispatch(getPosts(data))
    } catch (error) {
      dispatch(stopLoadingPosts())
    }
    dispatch(stopLoadingPosts())
  }
} */
/* Became To like this */
const API_POSTS_URL = 'https://jsonplaceholder.typicode.com/posts'
export const { getPostsAction, addPostAction }: any = dispatchActionsWithApi([
  {
    name: 'getPosts',
    url: API_POSTS_URL,
    method: 'get',
    setPayload: (data: any) => {
      return data?.res.data
    }
  },
  {
    name: 'addPost',
    url: API_POSTS_URL,
    method: 'get',
    setPayload: (data: any) => {
      return data?.res.data
    }
  }
])
