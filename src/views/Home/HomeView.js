import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { getCoupleInfo } from 'actions/home';
import CoupleBanner from './CoupleBanner';

export class HomeView extends PureComponent {
  componentDidMount = () => {
    this.props.getCoupleInfo();
  }
  
  render() {
    const { coupleInfo } = this.props;
    if (!coupleInfo) {
      return null;
    }

    const { groom, bride, coverPhotoUrl, weddingDate } = coupleInfo;

    return (
      <div>
        <CoupleBanner
          groom={groom}
          bride={bride}
          coverPhotoUrl={coverPhotoUrl}
          weddingDate={weddingDate}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  ...state.home,
});

const mapDispatchToProps = (dispatch) => ({
  getCoupleInfo: () => dispatch(getCoupleInfo()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeView)
