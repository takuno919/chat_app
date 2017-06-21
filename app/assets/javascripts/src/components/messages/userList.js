import React from 'react'
// import _ from 'lodash'
// import classNames from 'classnames'
// import Utils from '../../utils'
import MessagesStore from '../../stores/messages'
// import ChatStore from '../../stores/users'
import UsersStore from '../../stores/users'
import UserAction from '../../actions/users'

class UserList extends React.Component {

  constructor(props) {
    super(props)
    this.state = this.initialState
  }

  get initialState() {
    return this.getStateFromStore()
  }

  getStateFromStore() {
    return {
      openChatId: MessagesStore.getOpenChatId(),
      users: UsersStore.getUsers(),
    }
  }

  componentWillMount() {
    UsersStore.onChange(this.onStoreChange.bind(this))
    MessagesStore.onChange(this.onStoreChange.bind(this))
  }
  componentWillUnmount() {
    UsersStore.offChange(this.onStoreChange.bind(this))
    MessagesStore.offChange(this.onStoreChange.bind(this))
  }
  onStoreChange() {
    this.setState(this.getStateFromStore())
  }

  componentDidMount() {
    UserAction.getUsers()
  }

  handleUserListClick(user) {
    UserAction.setOpenChatId(user.id)
  }

  render() {
    const users = this.state.users
    return (
      <div className='user-list'>
        <ul className='user-list__list'>
          {users.map((user) => {
            return (
              <div key={user.id}
                onClick={this.handleUserListClick.bind(this, user)}
                style={{backgroundColor: user.id === this.state.openChatId ? 'blue' : 'initial'}}
              >
              {user.name}
              </div>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default UserList
