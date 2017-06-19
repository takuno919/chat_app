import React from 'react'
// import _ from 'lodash'
// import classNames from 'classnames'
// import Utils from '../../utils'
// import MessagesStore from '../../stores/messages'
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
    const users = UsersStore.getUsers()
    return {
      users: users,
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

  componentDidMount() {
    UserAction.getUsers()
  }

  render() {
    const users = this.state.users
    return (
      <div className='user-list'>
        <ul className='user-list__list'>
          {users.map((user) => {
            return (
              <div key={user.id}>{user.name}</div>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default UserList
