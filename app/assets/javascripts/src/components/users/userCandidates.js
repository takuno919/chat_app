import React from 'react'
// import request from 'superagent'
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
      friendshipId: MessagesStore.getFriendshipId(),
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
  // componentDidMount() {
  //   UserAction.getSearchUsers()
  // }

  handleUserCandidatesClick(user) {
    UserAction.createFriendshipId(user.id).then(() => {
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
              key={user.name}
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
