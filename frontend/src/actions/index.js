import axios from 'axios'

class Ajax {
  get(url) {
    return ajax('GET', url)
  }

  post(url, body) {
    return ajax('POST', url, body)
  }

  put(url, body) {
    return ajax('PUT', url, body)
  }

  delete(url) {
    return ajax('DELETE', url)
  }
}

const ajax = (method, url, body) => {
  return axios(`${process.env.REACT_APP_BACKEND}/` + url, {
    method,
    headers: {
      'Authorization': 'whatever-you-want',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    data: JSON.stringify(body),
  }).then(response => response.data)
}

export default new Ajax();
