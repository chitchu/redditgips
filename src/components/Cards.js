import React from 'react';
import Styled from 'styled-components';

import ImageContainer from './ImageContainer';

import { connect } from 'react-redux';
import { loadContent } from '../ducks/';
import { v4 } from 'node-uuid';


const mapState = state => ({
  entries: state.posts.get('entries').toJS()
});

const mapDispatch = dispatch => ({
  loadContent: () => {
    dispatch(loadContent());
  }
});

const Cards = ({entries, loadContent}) => {
  //@Todo: Find a better place in the app where to load initial content.
  //Maybe a redux middleware?
  //or an init action?
  if (!entries.length) {
    loadContent();
  }

  const RootDiv = Styled.div`
    padding-top: 1rem;
    padding-left: 5%;
    padding-right: 5%;
  `;

  return (
    <RootDiv>
      {
        entries.map(entry => <ImageContainer key={v4()} postId={entry} />)
      }
    </RootDiv>
  );
};

const container = connect(
  mapState,
  mapDispatch
)(Cards);

export {
  container as default
}