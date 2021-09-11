# `fast-create-redux`

> create reducers and actions quickly with types ('START_LOADING','STOP_LOADING','ERROR') will be create automaticaly

[![NPM](https://img.shields.io/npm/v/fast-create-redux.svg)](https://www.npmjs.com/package/fast-create-redux) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save fast-create-redux
npm install --save-dev @types/fast-create-redux

# OR
yarn add  fast-create-redux
yarn add -D @types/fast-create-redux
```

## Create actions with dispatchActions and dispatchActionsWithApi

```jsx
import { dispatchActionsWithApi } from 'fast-create-redux'

const API_POSTS_URL = 'https://jsonplaceholder.typicode.com/posts'
const API_POSTS_URL_BY_USER_ID =
  'https://jsonplaceholder.typicode.com/posts?userId=[userId]' //replace userId with object params
const API_POSTS_UPDATE_URL = 'https://jsonplaceholder.typicode.com/posts/[id]'
export const { getPostsAction,getPostsByUserIdAction, addPostAction,updatePostAction } = dispatchActionsWithApi([
  {
    name: 'getPosts',
    url: API_POSTS_URL,
    method: 'GET',

    //** if you must to add config axios *//
    config: {
      headers: {
        'Content-type': 'application/json'
        //Authorization: 'Your Token' // if you have token
      }
    }
  },
  {
    name: 'getPostsByUserId',
    url: API_POSTS_URL,
    method: 'GET',
  },
  {
    name: 'addPost',
    url: API_POSTS_URL,
    method: 'POST',
    //**** if you must to modify payload after call api ***//
    setPayload: ({ data, res }) => {
      // data : data come from component ==> {title:'React', body:'Awesome Framewok',userId: 1}
      // res : response from api axios

      return res.data // value of action.payload
    }
    //** End Modify ***//
  }
])

const Posts = ()=>{
  ............
  useEffect(() => {
    dispatch(getPostsAction())
  }, [dispatch])
  const getPostByUser = () => {
   dispatch(getPostByUserIdAction({ params: { id } })) // replace id in variable API_POSTS_URL_BY_USER_ID
  }
  const addPost = () => {
    dispatch(
      addPostAction({
        title:'React',
        body:'Awesome Framewok',
        userId: 1
      })
    )
  }
  const updatePost = () => {
    dispatch(
      updatePostAction({
        body: { title, body },// body api
        params: { id: post?.id }// replace id in variable API_POSTS_URL_BY_USER_ID
      })
    )
  }
  return ........
}
```

## dispatchActionsWithApi

dispatchActionsWithApi is function to create actions with call api.

| Options    | Description                                                                                                                                      |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| api        | (option) The instance of axios with a custom config                                                                                              |
| name       | (required) The name (camelCase) of the function action (Required to be the same name of stateKey from dispatchActionsWithApi or dispatchActions) |
| url        | (required) The url of api                                                                                                                        |
| method     | (required) The method to fetch api                                                                                                               |
| config     | (option) The config options for making requests                                                                                                  |
| setPayload | (option) The callback to modify payload and return with new value. arg(data:data come from component and res come from api)                      |

## dispatchActions

dispatchActions is function to create simple actions.

| Options    | Description                                                                                                                                      |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| name       | (required) The name (camelCase) of the function action (Required to be the same name of stateKey from dispatchActionsWithApi or dispatchActions) |
| setPayload | (option) The callback to modify payload and return with new value                                                                                |

## Create reducers with actionsCondition

## actionsCondition

actionsCondition is function to create simple reducer.

| Options    | Description                                                                                                             |
| ---------- | ----------------------------------------------------------------------------------------------------------------------- |
| name       | (required) The name (camelCase) of the function action (Required to be the same name of stateKey from actionsCondition) |
| setPayload | (option) The callback to modify payload and return with new value                                                       |

## License

MIT © [maamountoj](https://github.com/maamountoj)
