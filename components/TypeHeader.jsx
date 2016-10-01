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
        <Count count={this.props.count} />
      </div>
    );
  }

}

export default TypeHeader;
