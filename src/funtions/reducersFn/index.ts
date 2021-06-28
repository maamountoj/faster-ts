import _ from 'lodash'
import { handleActions } from 'redux-actions'

export const actionsCondition = (data: any) => {
  let reducerMap = {}
  let initialState = {}
  data.map((val: any) => {
    const { key, stateKey, initStateKey, setState } = val
    const newVal = key.replace(/[A-Z]/g, (m: any) => '_' + m).toUpperCase()
    initialState = {
      ...initialState,
      [stateKey]: { data: initStateKey, loading: false, error: '' }
      // [`loading${key.charAt(0).toUpperCase() + key.slice(1)}`]: false
    }
    reducerMap = {
      ...reducerMap,
      [newVal]: {
        next: (state: any, action: any) => {
          if (_.has(val, 'setState')) {
            return {
              ...state,
              [stateKey]: { ...state[stateKey], data: setState(state, action) }
            }
          } else {
            return {
              ...state,
              [stateKey]: { ...state[stateKey], data: action?.payload }
            }
          }
        }
      },
      [`START_LOADING_${newVal}`]: {
        next: (state: any) => {
          return {
            ...state,
            [stateKey]: { ...state[stateKey], loading: true }
            // [`loading${key.charAt(0).toUpperCase() + key.slice(1)}`]: true
          }
        }
      },
      [`STOP_LOADING_${newVal}`]: {
        next: (state: any) => {
          return {
            ...state,
            [stateKey]: { ...state[stateKey], loading: false }
            //[`loading${key.charAt(0).toUpperCase() + key.slice(1)}`]: false
          }
        }
      },
      [`ERROR_${newVal}`]: {
        next: (state: any, action: any) => {
          return {
            ...state,
            [stateKey]: { ...state[stateKey], error: action.payload }
          }
        }
      }
    }
  })
  return handleActions(reducerMap, initialState)
}
/* export const loadData =(key)=>(state:any, action:any) => {
   return { 
        ...state,
        [key]: action.payload
    }
}; */
