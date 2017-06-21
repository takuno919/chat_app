// src/constants/app.js
import keyMirror from 'keymirror'

export const ActionTypes = keyMirror({
  UPDATE_OPEN_CHAT_ID: null,
  POST_MESSAGE: null,
  GET_MESSAGES: null,
  GET_USERS: null,
})

export function CSRFToken() {
  return document.querySelector('meta[name="csrf-token"]').getAttribute('content')
}

const Root = window.location.origin || `${window.location.protocol}//${window.location.hostname}`
const APIRoot = `${Root}/api`
export const APIEndpoints = {
  MESSAGES: APIRoot + '/messages',
  USERS: APIRoot + '/users',
}
