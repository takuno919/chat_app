import React from 'react'
import UserCandidates from './userCandidates'
import UserAction from '../../actions/users'

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = { term: '' }
  }

  onInputChange(e) {
    const term = e.target.value
    this.setState({
      term: term,
    })
    UserAction.getSearchUsers(term)
  }

  render() {
    return (
      <div className='search'>
        Search here:
        <input
          style={{width: 500, height: 40}}
          value={this.state.term}
          onChange={this.onInputChange.bind(this)} />
        <UserCandidates />
      </div>
    )
  }
}

export default Search
