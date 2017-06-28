import request from 'superagent'
import Dispatcher from '../dispatcher'
import {ActionTypes, APIEndpoints, CSRFToken} from '../constants/app'

export default {
  setOpenChatId(id) {
    Dispatcher.handleViewAction({
      type: ActionTypes.SET_OPEN_CHAT_ID,
      id: id,
    })
  },

  getUsers() {
    return new Promise((resolve, reject) => {
      request
      .get('/api/users')
      .end((error, res) => {
        if (!error && res.status === 200) {
          const json = JSON.parse(res.text)
          Dispatcher.handleServerAction({
            type: ActionTypes.GET_USERS,
            json,
          })
          resolve(json)
        } else {
          reject(res)
        }
      })
    })
  },

  getSearchUsers(term) {
    return new Promise((resolve, reject) => {
      request
      .get('/api/users/search')
      .query({term: term})
      .end((error, res) => {
        if (!error && res.status === 200) {
          const json = JSON.parse(res.text)
          Dispatcher.handleServerAction({
            type: ActionTypes.GET_SEARCH_USERS,
            json,
          })
          resolve(json)
        } else {
          reject(res)
        }
      })
    })
  },

  createFriendshipId(userId) {
    return new Promise((resolve, reject) => {
      request
      .post(`${APIEndpoints.FRIENDSHIPS}`)
      .set('X-CSRF-Token', CSRFToken())
      .send({user_id: userId})
      .end((error, res) => {
        if (!error && res.status === 200) {
          const json = JSON.parse(res.text)
          Dispatcher.handleViewAction({
            type: ActionTypes.CREATE_FRIENDSHIP_ID,
            userID: userId,
            json,
          })
          resolve(json)
        } else {
          reject(res)
        }
      })
    })
  },

  destroyFriendshipId(userId) {
    return new Promise((resolve, reject) => {
      request
      .delete(`${APIEndpoints.FRIENDSHIPS}/${userId}`)
      .set('X-CSRF-Token', CSRFToken())
      .send({user_id: userId}) 
      .end((error, res) => {
        if (!error && res.status === 200) {
          const json = JSON.parse(res.text)
          Dispatcher.handleViewAction({
            type: ActionTypes.DESTROY_FRIENDSHIP_ID,
            userID: userId,
            json,
          })
          resolve(json)
        } else {
          reject(res)
        }
      })
    })
  },
}
