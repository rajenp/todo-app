import React from 'react';
import ListHeader from './ListHeader.jsx'
import ListBody from './ListBody.jsx'


class TodoList extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='TodoList'>
        <ListHeader label={this.props.label} count={this.props.list.length} /> 
        <ListBody list={this.props.list} type={this.props.type} />    
      </div>
    );
  }

}

export default TodoList;
