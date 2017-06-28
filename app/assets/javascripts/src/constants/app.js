import keyMirror from 'keymirror'

export const ActionTypes = keyMirror({
  UPDATE_OPEN_CHAT_ID: null,
  POST_MESSAGE: null,
  GET_MESSAGES: null,
  GET_USERS: null,
  SET_OPEN_CHAT_ID: null,
  GET_SEARCH_USERS: null,
  CREATE_FRIENDSHIP: null,
  DESTROY_FRIENDSHIP: null,
})

export function CSRFToken() {
  return document.querySelector('meta[name="csrf-token"]').getAttribute('content')
}

const Root = window.location.origin || `${window.location.protocol}//${window.location.hostname}`
const APIRoot = `${Root}/api`
export const APIEndpoints = {
  MESSAGES: APIRoot + '/messages',
  USERS: APIRoot + '/users',
  FRIENDSHIPS: APIRoot + '/friendships',
}
