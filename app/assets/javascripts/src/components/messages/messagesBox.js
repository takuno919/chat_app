import React from 'react'
import MessagesStore from '../../stores/messages'
import ReplyBox from '../../components/messages/replyBox'

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
      openChatId: MessagesStore.getOpenChatId(),
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

  render() {
    const messages = this.state.messages
    return (
        <div className='message-box'>
          <ul className='message-box__list'>
            {messages.map((message) => {
              const messageFromFriend = message.from === this.state.openChatId
              return (
                <div key={message.id}>
                  <div
                    style={{textAlign: messageFromFriend ? 'left': 'right'}}
                  >
                    {message.content}
                  </div>
                </div>
              )
            })}
          </ul>
          <ReplyBox />
        </div>
      )
  }
}

export default MessagesBox
