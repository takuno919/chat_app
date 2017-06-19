import React from 'react'
// import _ from 'lodash'
// import classNames from 'classnames'
// import Utils from '../../utils'
import MessagesStore from '../../stores/messages'
// import UserStore from '../../stores/user'
// import MessagesAction from '../../actions/messages' // 追記

class UserList extends React.Component {

  constructor(props) {
    super(props)
    this.state = this.initialState
  }

  get initialState() {
    // 変更箇所、開始位置
    return this.getStateFromStore()
  }

  getStateFromStore() {
    return {}
  }

  componentWillMount() {
    MessagesStore.onChange(this.onStoreChange.bind(this))
  }
  componentWillUnmount() {
    MessagesStore.offChange(this.onStoreChange.bind(this))
  }
  onStoreChange() {
    this.setState(this.getStateFromStore())
  }

  render() {
    const messages = null
    return (
      <div className='user-list'>
        <ul className='user-list__list'>
          { messages }
        </ul>
      </div>
    )
  }
}

export default UserList
