import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
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

  setFriendship(id) {
    this.set('friendship', id)
  }
  getFriendship() {
    if (!this.get('friendship')) this.setFriendship(null)
    return this.get('friendship')
  }

}

const MessagesStore = new ChatStore()

MessagesStore.dispatchToken = Dispatcher.register(payload => {
  const action = payload.action
  switch (action.type) {
    case ActionTypes.GET_MESSAGES:
      {
        const messages = action.json
        MessagesStore.setMessages(messages)
        MessagesStore.emitChange()
        break
      }

    case ActionTypes.POST_MESSAGE:
      {
        const messages = MessagesStore.getMessages()
        messages.push(action.json)
        MessagesStore.emitChange()
        break
      }

    case ActionTypes.UPDATE_OPEN_CHAT_ID:
      MessagesStore.emitChange()
      break

    case ActionTypes.SET_OPEN_CHAT_ID:
      const openChatId = action.id
      MessagesStore.setOpenChatId(openChatId)
      MessagesStore.emitChange()
      break

    case ActionTypes.CREATE_FRIENDSHIP:
      const {friendship} = action
      MessagesStore.setFriendship(friendship)
      MessagesStore.emitChange()
      break

    case ActionTypes.DESTROY_FRIENDSHIP:
      MessagesStore.emitChange()
      break
  }

  return true
})

export default MessagesStore
