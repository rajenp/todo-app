import React from 'react';
import Count from './Count.jsx'

class TodoList extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='TodoList'>
        <div className='ListHeader'>
          <div className='label'> {this.props.label} </div>
          <Count count={this.props.list.length} />
        </div>
        <ul data-type={this.props.type} className='ListBody'>
          {this.props.list.map(function(p) {
            return <li id={p.id} key={p.id}><span className='dhandle'></span> {p.name} </li>;
          })} 
        </ul>   
      </div>
    );
  }

}

export default TodoList;
