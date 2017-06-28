import React from 'react'
import UsersStore from '../../stores/users'
import UserAction from '../../actions/users'
import MessagesStore from '../../stores/messages'

class UserCandidates extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.initialState
  }
  get initialState() {
    return this.getStateFromStore()
  }

  getStateFromStore() {
    return {
      searchUsers: UsersStore.getSearchUsers(),
      friendship: MessagesStore.getFriendship(),
    }
  }
  componentWillMount() {
    UsersStore.onChange(this.onStoreChange.bind(this))
  }
  componentWillUnmount() {
    UsersStore.offChange(this.onStoreChange.bind(this))
  }
  onStoreChange() {
    this.setState(this.getStateFromStore())
  }

  handleUserCandidatesClick(user) {
    UserAction.createFriendship(user.id).then(() => {
      window.location.href = '/'
    })
  }

  render() {
    const searchUsers = this.state.searchUsers
    return (
      <div>
        {searchUsers.map((user) => {
          return (
            <div
              key={user.id}
              onClick={this.handleUserCandidatesClick.bind(this, user)}
            >
              {user.name}
            </div>
          )
        })}
      </div>
    )
  }
}

export default UserCandidates
