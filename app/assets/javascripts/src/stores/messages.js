// stores/messages.js
import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
// import UserStore from '../stores/user' // 追記
import {ActionTypes} from '../constants/app'

class ChatStore extends BaseStore {
  addChangeListener(callback) {
    this.on('change', callback)
  }
  removeChangeListener(callback) {
    this.off('change', callback)
  }

  setMessages(messages) {
    this.set('messages', messages)
  }

  getMessages() {
    if (!this.get('messages')) this.setMessages([])
    return this.get('messages')
  }
}
const MessagesStore = new ChatStore()

MessagesStore.dispatchToken = Dispatcher.register(payload => {
  const action = payload.action
  switch (action.type) {
    case ActionTypes.GET_MESSAGES:
      const messages = action.json
      MessagesStore.setMessages(messages)
      MessagesStore.emitChange()
      break
  }

  return true
})

export default MessagesStore
