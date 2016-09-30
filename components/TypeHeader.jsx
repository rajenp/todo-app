import React from 'react';
import Count from './Count.jsx'

class TypeHeader extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='TypeHeader'>
        <div className='label'> {this.props.label} </div>
        <div> <Count count={this.props.count} /> </div>        
      </div>  
    );
  }

}

export default TypeHeader;