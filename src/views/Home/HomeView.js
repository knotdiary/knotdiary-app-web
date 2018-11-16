import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { getCoupleInfo, getHomeChecklist, setIsInitialized } from 'actions/home';
import CoupleBanner from './CoupleBanner';
import { Checklist } from 'components';

export class HomeView extends PureComponent {
  componentDidMount = () => {
    this.props.getCoupleInfo();
  }

  componentDidUpdate = (prevProps) => {
    const { coupleInfo, getHomeChecklist, setIsInitialized, isInitialized } = this.props;

    if (coupleInfo && coupleInfo.id && !isInitialized) {
      getHomeChecklist(coupleInfo.id);
      setIsInitialized(true);
    }
  }

  componentWillUnmount = () => {
    this.props.isInitialized(false);
  }
  
  render() {
    const { coupleInfo, checklist } = this.props;
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
        <Checklist items={checklist} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  ...state.home,
});

const mapDispatchToProps = (dispatch) => ({
  getCoupleInfo: () => dispatch(getCoupleInfo()),
  getHomeChecklist: (coupleId) => dispatch(getHomeChecklist(coupleId)),
  setIsInitialized: (val) => dispatch(setIsInitialized(val)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeView)
