import React from 'react';
import Styled from 'styled-components';

import { connect } from 'react-redux';

import offlineLogo from '../ic_signal_wifi_off_black_24px.svg';

const mapState = state => ({
  isOffline: state.ui.get('offlineMode')
});

const StyledImg = Styled.img`
  margin-left: 0.4rem;
  width: 1rem;
`;

const OfflineStatus = ({isOffline}) => isOffline ? <StyledImg src={offlineLogo} alt='You are offline' title='You are offline' /> : null

export default connect(mapState)(OfflineStatus);