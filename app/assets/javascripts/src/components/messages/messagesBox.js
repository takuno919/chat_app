import React from 'react'
// import classNames from 'classNames'
import MessagesStore from '../../stores/messages'
import ReplyBox from '../../components/messages/replyBox'
// import UserStore from '../../stores/users'
// import Utils from '../../utils'
import MessageAction from '../../actions/messages'

class MessagesBox extends React.Component {

  constructor(props) {
    super(props)
    this.state = this.initialState
  }
  get initialState() {
    return this.getStateFromStore()
  }
  getStateFromStore() {
    const messages = MessagesStore.getMessages()
    return {
      messages: messages,
    }
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
  componentDidMount() {
    MessageAction.getMessages(MessagesStore.getOpenChatId())
  }

  render() {
    const messages = this.state.messages
    return (
        <div className='message-box'>
          <ul className='message-box__list'>
            {messages.map((message) => {
              return (
                <div key={message.id}>{message.content}</div>
              )
            })}
          </ul>
          <ReplyBox />,
        </div>
      )
  }
}

export default MessagesBox
