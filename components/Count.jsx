import React from 'react';

class Count extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    var text = this.props.count === 1 ? 'PROJECT' : 'PROJECTS'; 
    return (
      <div className='Count'>
        <div className='countVal'> {this.props.count}</div>
        <div className='text'> {text} </div>        
      </div>  
    );
  }
}

export default Count;