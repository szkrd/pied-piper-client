// TODO proper error handling
export function getJSON (url) {
  return fetch(url, { method: 'GET' })
    .then(response => {
      if (response.status < 400) {
        return response.json()
      }
    })
}

function upJSON (method, url, value) {
  return fetch(url, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method,
    body: JSON.stringify(value)
  }).then(response => {
    if (response.status === 204) {
      return response
    }
    return response.json()
  })
}

export const putJSON = (url, value) => upJSON('PUT', url, value)
export const postJSON = (url, value) => upJSON('POST', url, value)
export const deleteJSON = (url, value) => upJSON('DELETE', url, value)
