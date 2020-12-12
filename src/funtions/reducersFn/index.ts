import _ from 'lodash'
import { handleActions } from 'redux-actions'

export const actionsCondition = (data:any) => {
  let reducerMap = {}
  let initialState = {}
  data.map((val:any) => {
    const { key, stateKey, initStateKey, setState } = val
    const newVal = key.replace(/[A-Z]/g, (m:any) => '_' + m).toUpperCase()
    initialState = {
      ...initialState,
      [stateKey]: initStateKey,
      [`loading${key.charAt(0).toUpperCase() + key.slice(1)}`]: false
    }
    reducerMap = {
      ...reducerMap,
      [newVal]: {
        next: (state:any, action:any) => {
          if (_.has(val, 'setState')) {
            return {
              ...state,
              [stateKey]: setState(state, action)
            }
          } else {
            return {
              ...state,
              [stateKey]: action?.payload
            }
          }
        }
      },
      [`START_LOADING_${newVal}`]: {
        next: (state:any, action:any) => {
          console.log(action)
          return {
            ...state,
            [`loading${key.charAt(0).toUpperCase() + key.slice(1)}`]: true
          }
        }
      },
      [`STOP_LOADING_${newVal}`]: {
        next: (state:any, action:any) => {
          console.log(action)
          return {
            ...state,
            [`loading${key.charAt(0).toUpperCase() + key.slice(1)}`]: false
          }
        }
      }
    }
  })
  return handleActions(reducerMap, initialState)
}
/* export const loadData =(key)=>(state, action) => {
   return { 
        ...state,
        [key]: action.payload
    }
}; */
