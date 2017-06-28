import React from 'react'
import MessagesStore from '../../stores/messages'
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
      friendship: MessagesStore.getFriendship(),
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
    UserAction.destroyFriendship(user.id).then(() => {
      window.location.href = '/'
    })
  }

  render() {
    const {users} = this.state
    return (
      <div className='user-list'>
        <ul className='user-list__list'>
          {users.map((user) => {
            return (
              <div key={user.id}>
                <div
                  onClick={this.handleUserListClick.bind(this, user)}
                  style={{backgroundColor: user.id === this.state.openChatId ? 'blue' : 'initial'}}
                >
                  {user.name}
                  <span
                    onClick={this.handleDestroyUserListClick.bind(this, user)}
                    style={{float: 'right'}}
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
