import request from 'superagent'
import Dispatcher from '../dispatcher'
import {ActionTypes} from '../constants/app'

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
      .get('/api/users') // 取得したいjsonがあるURLを指定する
      .end((error, res) => {
        if (!error && res.status === 200) { // 200はアクセスが成功した際のステータスコードです。
          const json = JSON.parse(res.text)
          Dispatcher.handleServerAction({
            type: ActionTypes.GET_USERS,
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
