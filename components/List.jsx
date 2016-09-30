import React from 'react';

class List extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ul data-type={this.props.type} className='List'>
          {this.props.list.map(function(p) {
            return <li id={p.id} key={p.id}><span className='dhandle'></span> {p.name} </li>;
          })} 
      </ul>           
    );
  }
}

export default List;