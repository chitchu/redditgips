import React from 'react';
import Media from './Media';
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

  const Container = Styled.div`
    ${Media.desktop`
      padding: 6rem 0;
      max-width: 992px;
      display: block;
      margin: auto;
    `}
    ${Media.tablet`
      padding: 6rem 1rem;
    `}
    ${Media.phone`
      padding: 4rem 1rem;
    `}
  `;

  return (
    <Container>
      {
        entries.map(entry => <ImageContainer key={v4()} postId={entry} />)
      }
    </Container>
  );
};

const container = connect(
  mapState,
  mapDispatch
)(Cards);

export {
  container as default
}