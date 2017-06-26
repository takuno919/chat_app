import React from 'react'
// import _ from 'lodash'
// import classNames from 'classnames'
// import Utils from '../../utils'
import MessagesStore from '../../stores/messages'
// import ChatStore from '../../stores/users'
import UsersStore from '../../stores/users'
import UserAction from '../../actions/users'
import MessagesAction from '../../actions/messages'

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
      friendshipId: MessagesStore.getFriendshipId(),
      // receiveFriendshipId: MessageStore.receiveFriendshipId(),
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
    MessagesAction.getMessages(user.id)
  }

  handleDestroyUserListClick(user, e) {
    e.stopPropagation()
    UserAction.destroyFriendshipId(user.id).then(() => {
      window.location.href = '/'
    })
  }

  render() {
    const users = this.state.users
    return (
      <div className='user-list'>
        <ul className='user-list__list'>
          {users.map((user) => {
            return (
              <div>
                <div key={user.id}
                  onClick={this.handleUserListClick.bind(this, user)}
                  style={{backgroundColor: user.id === this.state.openChatId ? 'blue' : 'initial'}}
                >
                  {user.name}
                  <span
                    onClick={this.handleDestroyUserListClick.bind(this, user)}
                  >
                  Delete
                  </span>

                </div>
              </div>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default UserList
