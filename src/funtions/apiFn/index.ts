import axios from 'axios'
import _ from 'lodash'

const getWithParamsUrl = (path: any, params: any) => {
  const regex = /\[(.*?)\]/g
  let index = 0
  let replacePath
  if (!_.isEmpty(params)) {
    replacePath = path.replace(regex, (match: any, name: any, surname: any) => {
      console.log(match)
      console.log(surname)
      let replaceStr = `${params[name]}`
      index = index + 1
      return replaceStr
    })
  } else {
    replacePath = path
  }

  return replacePath
}

const getApi: any = async ({ api, url, paramsUrl: params, config }: any) => {
  let response = null
  let path = getWithParamsUrl(url, params)
  let res = null
  try {
    if (!_.isEmpty(api)) {
      _.isEmpty(config)
        ? (res = await api.get(path))
        : (res = await api.get(path, config))
    } else {
      _.isEmpty(config)
        ? (res = await axios.get(path))
        : (res = await axios.get(path, config))
    }

    response = res.data
  } catch (err) {
    console.log(err)
  }
  return response
}

const postApi = async ({ api, url, paramsUrl: params, body, config }: any) => {
  console.log('postApi')
  let response = null
  let path = getWithParamsUrl(url, params)
  let res = null
  try {
    if (!_.isEmpty(api)) {
      _.isEmpty(config)
        ? (res = await api.post(path, body, config))
        : (res = await api.post(path, body))
    } else {
      _.isEmpty(config)
        ? (res = await axios.post(path, body, config))
        : (res = await axios.post(path, body))
    }

    response = res.data
  } catch (err) {
    console.log(err)
  }
  return response
}

const putApi = async ({ api, url, paramsUrl: params, body, config }: any) => {
  let response = null
  let path = getWithParamsUrl(url, params)
  let res = null
  try {
    if (!_.isEmpty(api)) {
      _.isEmpty(config)
        ? (res = await api.put(path, body, config))
        : (res = await api.put(path, body))
    } else {
      _.isEmpty(config)
        ? (res = await api.put(path, body, config))
        : (res = await api.put(path, body))
    }

    response = res
  } catch (err) {
    console.log(err)
  }
  return response
}

const deleteApi = async ({ api, url, params, config }: any) => {
  let response = null
  let path = getWithParamsUrl(url, params)
  let res = null
  try {
    if (!_.isEmpty(api)) {
      _.isEmpty(config)
        ? (res = await api.delete(path))
        : (res = await api.delete(path, config))
    } else {
      _.isEmpty(config)
        ? (res = await axios.delete(path))
        : (res = await axios.delete(path, config))
    }

    response = res.data
  } catch (err) {
    console.log(err)
  }
  return response
}

const fetchApi = async ({
  api,
  method,
  url,
  paramsUrl: params,
  body,
  config
}: any) => {
  method = method.toLowerCase()
  console.log({ method, url, paramsUrl: params, body, config })
  let response = null
  let path = getWithParamsUrl(url, params)
  let res = null
  try {
    if (method === 'get' || method === 'delete') {
      if (!_.isEmpty(api)) {
        _.isEmpty(config)
          ? (res = await api[method](path))
          : (res = await api[method](path, config))
      } else {
        _.isEmpty(config)
          ? (res = await axios[method](path))
          : (res = await axios[method](path, config))
      }

      response = res
    } else if (method === 'post' || method === 'put') {
      if (!_.isEmpty(api)) {
        _.isEmpty(config)
          ? (res = await api[method](path, body, config))
          : (res = await api[method](path, body))
      } else {
        _.isEmpty(config)
          ? (res = await axios[method](path, body, config))
          : (res = await axios[method](path, body))
      }
      response = res
    } else {
      console.error('Ensure your method please')
    }
  } catch (err) {
    console.log(err)
  }
  console.log('responseresponse', response)
  return response
}
export { fetchApi, getApi, postApi, putApi, deleteApi }
