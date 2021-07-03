import { createActions } from 'redux-actions'
import _ from 'lodash'
import { fetchApi } from '../apiFn'

export const prepareActions = (val: any) => {
  const newVal = val.replace(/[A-Z]/g, (m: any) => '_' + m).toUpperCase()
  return createActions(
    `START_LOADING_${newVal}`,
    `${newVal}`,
    `STOP_LOADING_${newVal}`,
    `ERROR_${newVal}`
  )
}
export const dispatchActions = (data: any) => {
  let dataFns = {}
  data?.map((val: any) => {
    const dispatchActions = prepareActions(val?.name)
    const slice = 4
    let index = 0
    while (index < _.keys(dispatchActions).length) {
      const partsKeys = _.keys(dispatchActions).splice(index, slice)
      dataFns = {
        ...dataFns,
        [`${val?.name}Action`]: (data = {}) => async (dispatch: any) => {
          dispatch(dispatchActions[partsKeys[0]](true))
          try {
            _.has(val, 'setPayload')
              ? dispatch(dispatchActions[partsKeys[1]](val.setPayload(data)))
              : dispatch(dispatchActions[partsKeys[1]](data))
            dispatch(dispatchActions[partsKeys[2]](false))
          } catch (error) {
            dispatch(dispatchActions[partsKeys[2]](false))
            dispatch(dispatchActions[partsKeys[3]](error))
          }
        }
      }
      index = index + slice
    }
  })

  return dataFns
}
export const dispatchActionsWithApi = (data: any) => {
  let dataFns = {}
  data?.map((val: any) => {
    const { api, name, url, method, config } = val
    const dispatchActions = prepareActions(name)
    const slice = 4
    let index = 0
    //val = val.charAt(0).toUpperCase() + val.slice(1);
    while (index < _.keys(dispatchActions).length) {
      const partsKeys = _.keys(dispatchActions).splice(index, slice)
      dataFns = {
        ...dataFns,
        [`${name}Action`]: (data: any) => async (dispatch: any) => {
          let res
          dispatch(dispatchActions[partsKeys[0]](true))
          try {
            if (!_.isEmpty(api)) {
              _.has(data, 'params')
                ? (res = await fetchApi({
                    api: api,
                    method,
                    url,
                    params: data?.params,
                    body:
                      _.has(data, 'body') && method == 'get' ? '' : data.body,
                    config
                  }))
                : (res = await fetchApi({
                    api: api,
                    method,
                    url,
                    body: method == 'get' ? '' : data,
                    config
                  }))
            } else {
              _.has(data, 'params')
                ? (res = await fetchApi({
                    method,
                    url,
                    params: data?.params,
                    body:
                      _.has(data, 'body') && method == 'get' ? '' : data.body,
                    config
                  }))
                : (res = await fetchApi({
                    method,
                    url,
                    body: method == 'get' ? '' : data,
                    config
                  }))
            }
            /* console.log(res1);
            const res = await api.post(urlApi, data); */
            _.has(val, 'setPayload')
              ? dispatch(
                  dispatchActions[partsKeys[1]](val?.setPayload({ data, res }))
                )
              : dispatch(dispatchActions[partsKeys[1]](res.data))

            dispatch(dispatchActions[partsKeys[2]](false))
          } catch (error) {
            dispatch(dispatchActions[partsKeys[2]](false))
            dispatch(dispatchActions[partsKeys[3]](error))
          }
        }
      }
      index = index + slice
    }
  })

  return dataFns
}

/* export const dispatchActionsWithGet = (data, API_URL) => {
  const dispatchActions = prepareActions(data);
  let dataFns = {};
  const slice = 3;
  data.map((val) => {
    let index = 0;
    let array = [];
    val.split("_").map((val) => {
      array = [...array, val.charAt(0).toUpperCase() + val.slice(1)];
    });
    //val = val.charAt(0).toUpperCase() + val.slice(1);
    while (index < _.keys(dispatchActions).length) {
      const partsKeys = _.keys(dispatchActions).splice(index, slice);
      dataFns = {
        ...dataFns,
        [`fetch${array.join("")}`]: () => async (dispatch) => {
          dispatch(dispatchActions[partsKeys[0]]());
          await api
            .get(API_URL)
            .then((res) => {
              console.log(res.data);
              dispatch(dispatchActions[partsKeys[1]](res.data));
            })
            .catch((err) => {
              dispatch(dispatchActions[partsKeys[2]](err.message));
            });
        },
      };
      index = index + slice;
    }
  });

  console.log(dataFns, "fffffffffff");
  return dataFns;
}; */
/* export const dispatchActionsWithGetById = (data) => {
  const dispatchActions = prepareActions(data);
  let dataFns = {};
  const slice = 3;
  data.map((val) => {
    let index = 0;
    let array = [];
    val.split("_").map((val) => {
      array = [...array, val.charAt(0).toUpperCase() + val.slice(1)];
    });
    //val = val.charAt(0).toUpperCase() + val.slice(1);
    while (index < _.keys(dispatchActions).length) {
      const partsKeys = _.keys(dispatchActions).splice(index, slice);
      dataFns = {
        ...dataFns,
        [`fetch${array.join("")}`]: (API_URL) => async (dispatch) => {
          dispatch(dispatchActions[partsKeys[0]]());
          await api
            .get(API_URL)
            .then((res) => {
              dispatch(dispatchActions[partsKeys[1]](res.data));
            })
            .catch((err) => {
              dispatch(dispatchActions[partsKeys[2]](err.message));
            });
        },
      };
      index = index + slice;
    }
  });
  return dataFns;
};
 */
