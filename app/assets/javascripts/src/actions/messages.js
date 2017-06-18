// actions/messages.js
import request from 'superagent'
import Dispatcher from '../dispatcher'
import {ActionTypes} from '../constants/app' // 追記

export default {
  changeOpenChat(newUserID) {
    Dispatcher.handleViewAction({
      type: ActionTypes.UPDATE_OPEN_CHAT_ID, // 変更箇所
      userID: newUserID,
    })
  },
  // 追記
  sendMessage(userID, message) {
    Dispatcher.handleViewAction({
      type: ActionTypes.SEND_MESSAGE, // 変更箇所
      userID: userID,
      message: message,
      timestamp: +new Date(),
    })
  },

  getMessages() {
    return new Promise((resolve, reject) => {
      request
      .get('/api/messages') // 取得したいjsonがあるURLを指定する
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
}
