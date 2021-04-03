import React, {Component} from 'react';

class Try extends Component {
  state = {

  }

  render() {
    return (
      <li>
        <b>{this.props.value.first} - {this.props.index}</b>
        <div>: {this.props.value.second}</div>
      </li>
    ) 
  }
}

export default Try;
