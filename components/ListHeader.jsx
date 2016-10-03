import React from 'react';
import Count from './Count.jsx'

class ListHeader extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='ListHeader'>
        <div className='label'> {this.props.label} </div>
        <Count count={this.props.count} />
      </div>
    );
  }

}

export default ListHeader;
