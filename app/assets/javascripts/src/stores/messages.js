// stores/messages.js
import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
import UserStore from '../stores/users'
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

  setOpenChatId(id) {
    this.set('openChatId', id)
  }
  getOpenChatId() {
    if (!this.get('openChatId')) this.setOpenChatId(null)
    return this.get('openChatId')
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

    case ActionTypes.POST_MESSAGE:
      const userID = action.userID
      messages[userID].messages.push({
        content: action.message,
        from: UserStore.user.id,
        to: UserStore.user.id,
      })
      MessagesStore.emitChange()
      break

    case ActionTypes.UPDATE_OPEN_CHAT_ID:
      // openChatID = action.userID
      MessagesStore.emitChange()
      break

    case ActionTypes.SET_OPEN_CHAT_ID:
      const openChatId = action.id
      MessagesStore.setOpenChatId(openChatId)
      MessagesStore.emitChange()
      break
  }

  return true
})

export default MessagesStore
