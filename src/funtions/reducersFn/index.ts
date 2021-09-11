import _ from 'lodash'
import { handleActions } from 'redux-actions'

export const actionsCondition = (data: any) => {
  let reducerMap = {}
  let initialState = {}
  data.map(async (val: any) => {
    const { key, stateKey, initStateKey, setState } = val
    const newVal = key.replace(/[A-Z]/g, (m: any) => '_' + m).toUpperCase()

    /****** Initial State ******  */

    initialState = {
      ...initialState,
      [stateKey]: {
        ...initialState[stateKey],
        data: initStateKey,
        [`loading${key.charAt(0).toUpperCase() + key.slice(1)}`]: false,
        [`error${key.charAt(0).toUpperCase() + key.slice(1)}`]: ''
      }
    }
    if (_.has(val, 'anotherActions')) {
      val?.anotherActions.map((value: any) => {
        initialState = {
          ...initialState,
          [stateKey]: {
            ...initialState[stateKey],
            [`loading${
              value?.key.charAt(0).toUpperCase() + value?.key.slice(1)
            }`]: false,
            [`error${
              value?.key.charAt(0).toUpperCase() + value?.key.slice(1)
            }`]: ''
          }
          // [`loading${key.charAt(0).toUpperCase() + key.slice(1)}`]: false
        }
      })
    }
    /***** End initial State ****** */
    if (_.has(val, 'anotherActions')) {
      val.anotherActions.map((value: any) => {
        const newAction = value?.key
          .replace(/[A-Z]/g, (m: any) => '_' + m)
          .toUpperCase()
        reducerMap = {
          ...reducerMap,
          [newAction]: {
            next: (state: any, action: any) => {
              if (_.has(value, 'setState')) {
                return {
                  ...state,
                  [stateKey]: {
                    ...state[stateKey],
                    data: value?.setState(state[stateKey], action)
                  }
                }
              } else {
                return {
                  ...state,
                  [stateKey]: { ...state[stateKey], data: action?.payload }
                }
              }
            }
          },
          [`START_LOADING_${newAction}`]: {
            next: (state: any) => {
              return {
                ...state,
                [stateKey]: {
                  ...state[stateKey],
                  [`loading${
                    value?.key.charAt(0).toUpperCase() + value?.key.slice(1)
                  }`]: true
                }
                // [`loading${key.charAt(0).toUpperCase() + key.slice(1)}`]: true
              }
            }
          },
          [`STOP_LOADING_${newAction}`]: {
            next: (state: any) => {
              return {
                ...state,
                [stateKey]: {
                  ...state[stateKey],
                  [`loading${
                    value?.key.charAt(0).toUpperCase() + value?.key.slice(1)
                  }`]: false
                }
                //[`loading${key.charAt(0).toUpperCase() + key.slice(1)}`]: false
              }
            }
          },
          [`ERROR_${newAction}`]: {
            next: (state: any, action: any) => {
              return {
                ...state,
                [stateKey]: {
                  ...state[stateKey],
                  [`error${
                    value?.key.charAt(0).toUpperCase() + value?.key.slice(1)
                  }`]: action.payload
                }
              }
            }
          }
        }
      })
    }
    reducerMap = {
      ...reducerMap,
      [newVal]: {
        next: (state: any, action: any) => {
          if (_.has(val, 'setState')) {
            return {
              ...state,
              [stateKey]: {
                ...state[stateKey],
                data: setState(state[stateKey], action)
              }
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
            [stateKey]: {
              ...state[stateKey],
              [`loading${key.charAt(0).toUpperCase() + key.slice(1)}`]: true
            }
            // [`loading${key.charAt(0).toUpperCase() + key.slice(1)}`]: true
          }
        }
      },
      [`STOP_LOADING_${newVal}`]: {
        next: (state: any) => {
          return {
            ...state,
            [stateKey]: {
              ...state[stateKey],
              [`loading${key.charAt(0).toUpperCase() + key.slice(1)}`]: false
            }
            //[`loading${key.charAt(0).toUpperCase() + key.slice(1)}`]: false
          }
        }
      },
      [`ERROR_${newVal}`]: {
        next: (state: any, action: any) => {
          return {
            ...state,
            [stateKey]: {
              ...state[stateKey],
              [`error${
                key.charAt(0).toUpperCase() + key.slice(1)
              }`]: action.payload
            }
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
