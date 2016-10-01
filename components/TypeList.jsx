import React from 'react';
import TypeHeader from './TypeHeader.jsx'
import List from './List.jsx'


class TypeList extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='TypeList'>
        <TypeHeader label={this.props.label} count={this.props.list.length} /> 
        <List list={this.props.list} type={this.props.type} />    
      </div>
    );
  }

}

export default TypeList;
