import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

export class NotFoundView extends PureComponent {
  render() {
    return (
      <div>
        
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(NotFoundView)
