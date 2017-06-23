import React from 'react'
// import request from 'superagent'
import UsersStore from '../../stores/users'
// import UserAction from '../../actions/users'

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

  // hoge(e) {
  //   this.setState({
  //     term: e.target.value,
  //   })
  //   // UserActionを呼ぶ
  //   // これとreturnをsearch.jsに移す
  // }

  render() {
    const searchUsers = this.state.searchUsers
    return (
      <div>
        {searchUsers.map((user) => {
          return <div>{user.name}</div>
        })}
      </div>

    )
  }
}

export default UserCandidates
