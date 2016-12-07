import React from 'react';
import Styled from 'styled-components';

import { connect } from 'react-redux';

import Theme from './Theme';

import { moveToPage } from '../ducks/';

const mapState = state => ({
  previousIsDiabled: state.posts.get('page') === 1,
  currentPage: state.posts.get('page')
});

const mapDispatch = (dispatch, ownProps) => ({
  handlePrev: currentPage => {
    dispatch(moveToPage('before', parseInt(currentPage, 10) - 1))
  },
  handleNext: currentPage => {
    dispatch(moveToPage('after', parseInt(currentPage, 10) + 1))
  }
});

const Pagination = ({previousIsDiabled
  , currentPage
  , handlePrev
  , handleNext
}) => {
  const Container = Styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100%;
  `;

  const Button = Styled.button`
    background-color: transparent;
    font-family: ${Theme.primaryFont};
    border: none;
    cursor: pointer;
    padding: 0.4rem;
    transition: all 0.2s;
    &:hover {
      background-color: #e9e9e9;
    }
    &:disabled {
      opacity: 0.4;
    }
    &:focus, &:active {
      outline: none;
    }
  `;
  return (
    <Container>
      <Button disabled={previousIsDiabled} onClick={() => handlePrev(currentPage)}>Prev</Button>
      <Button onClick={() => handleNext(currentPage)}>Next</Button>
    </Container>
  );
};

const Container = connect(mapState
  , mapDispatch
)(Pagination);

export {
  Container as default
};