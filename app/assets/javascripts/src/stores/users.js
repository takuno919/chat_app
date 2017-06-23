import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
import {ActionTypes} from '../constants/app'

class UserStore extends BaseStore {
  addChangeListener(callback) {
    this.on('change', callback)
  }
  removeChangeListener(callback) {
    this.off('change', callback)
  }

  setUsers(users) {
    this.set('users', users)
  }

  getUsers() {
    if (!this.get('users')) this.setUsers([])
    return this.get('users')
  }

  setSearchUsers(searchUsers) {
    this.set('searchUsers', searchUsers)
  }

  getSearchUsers() {
    if (!this.get('searchUsers')) this.setSearchUsers([])
    return this.get('searchUsers')
  }

}

const UsersStore = new UserStore()

UsersStore.dispatchToken = Dispatcher.register(payload => {
  const action = payload.action
  switch (action.type) {
    case ActionTypes.GET_USERS:
      const users = action.json
      UsersStore.setUsers(users)
      UsersStore.emitChange()
      break

    case ActionTypes.GET_SEARCH_USERS:
      const searchUsers = action.json
      UsersStore.setSearchUsers(searchUsers)
      UsersStore.emitChange()
      break
  }

  return true
})

export default UsersStore
