import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import CoupleBanner from './CoupleBanner';
import { Checklist } from 'components';
import { setIsHomeInitialized } from 'actions/home';
import { setCurrentPage } from 'actions/navigation';
import { getCoupleInfo } from 'actions/couple';
import { getCoupleChecklist } from 'actions/checklist';
import pageNames from 'lib/pageNames';

import './HomeView.scss';

const mapStateToProps = (state) => ({
  ...state.home,
  ...state.checklist,
  ...state.couple,
});

const mapDispatchToProps = (dispatch) => ({
  getCoupleInfo: (username) => dispatch(getCoupleInfo(username)),
  getCoupleChecklist: (coupleId) => dispatch(getCoupleChecklist(coupleId)),
  setIsInitialized: (val) => dispatch(setIsHomeInitialized(val)),
  setCurrentPage: () => dispatch(setCurrentPage(pageNames.home)),
});

export class HomeView extends PureComponent {
  componentDidMount = () => {
    this.props.getCoupleInfo();
    this.props.setCurrentPage();
  }

  componentDidUpdate = (prevProps) => {
    const { coupleInfo, getCoupleChecklist, setIsInitialized, isInitialized } = this.props;

    if (coupleInfo && coupleInfo.id && !isInitialized) {
      getCoupleChecklist(coupleInfo.id);
      setIsInitialized(true);
    }
  }

  componentWillUnmount = () => {
    this.props.setIsInitialized(false);
  }

  render() {
    const { coupleInfo, checklist } = this.props;
    if (!coupleInfo) {
      return null;
    }

    const { groom, bride, coverPhotoUrl, weddingDate } = coupleInfo;

    return (
      <div className="home-view">
        <CoupleBanner
          className="home-view--banner"
          groom={groom}
          bride={bride}
          coverPhotoUrl={coverPhotoUrl}
          weddingDate={weddingDate}
        />
        <div className="home-view--content">
          <Grid container spacing={16}>
            <Grid item xs={12} md={6} lg={4}>
              <Paper elevation={1}>
                <Checklist items={checklist} />
              </Paper>
            </Grid>
          </Grid>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeView)
