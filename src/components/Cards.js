import React from 'react';
<<<<<<< HEAD
import Media from './Media';
=======
>>>>>>> d98235467dbcbd440e2d26cde4de11fe09b65f9c
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
    ${Media.giant`
      padding: 6rem 5%;
    `}
    ${Media.desktop`
      padding: 6rem 5%;
    `}
    ${Media.phone`
      padding: 0 5%;
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