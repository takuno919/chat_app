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
    return {
      messages: MessagesStore.getMessages(),
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
    const {messages, openChatId} = this.state
    return (
        <div className='message-box'>
          <ul className='message-box__list'>
            {messages.map((message) => {
              const isMessageFromFriend = message.from === openChatId
              return (
                <div key={message.id}>
                  <div
                    style={{textAlign: isMessageFromFriend ? 'left' : 'right'}}
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
