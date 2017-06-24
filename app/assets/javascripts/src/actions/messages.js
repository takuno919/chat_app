// actions/messages.js
import request from 'superagent'
import Dispatcher from '../dispatcher'
import {ActionTypes, APIEndpoints, CSRFToken} from '../constants/app'

export default {
  changeOpenChat(newUserID) {
    Dispatcher.handleViewAction({
      type: ActionTypes.UPDATE_OPEN_CHAT_ID,
      userID: newUserID,
    })
  },

  getMessages(to) {
    return new Promise((resolve, reject) => {
      request
      .get('/api/messages') // 取得したいjsonがあるURLを指定する
      .query({to: to})
      .end((error, res) => {
        if (!error && res.status === 200) { // 200はアクセスが成功した際のステータスコードです。
          const json = JSON.parse(res.text)
          Dispatcher.handleServerAction({
            type: ActionTypes.GET_MESSAGES,
            json, // json: jsonと同じ。keyとvalueが一致する場合、このように省略出来ます。
          })
          resolve(json)
        } else {
          reject(res)
        }
      })
    })
  },

  postMessage(content, to) {
    return new Promise((resolve, reject) => {
      request
      .post(`${APIEndpoints.MESSAGES}`)
      .set('X-CSRF-Token', CSRFToken())
      .send({content: content, to: to}) // これによりサーバ側に送りたいデータを送ることが出来ます。
      .end((error, res) => {
        if (!error && res.status === 200) {
          const json = JSON.parse(res.text)
          Dispatcher.handleViewAction({
            type: ActionTypes.POST_MESSAGE,
            // content: content,
            // from: from,
            // to: to,
            // timestamp: +new Date(),
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
