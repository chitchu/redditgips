import React from 'react';
import styled from 'styled-components';

const Gipher = (props) => {
  const StyledVideo = styled.video`
    position: relative;
    width: 100%;
  `;

  const StyledImg = styled.img`
    position: relative;
    width: 100%;
  `;
  const { domain, url, thumbnail } = props;

  let element;

  switch (domain) {
    case 'i.imgur.com':
      const imgurname = url.split('/')[url.split('/').length -1].split('.')[0];
      element = (
        <StyledVideo autoPlay loop>
            <source src={`//i.imgur.com/${imgurname}.mp4`} type="video/mp4" />
        </StyledVideo>
      );
      break;
    case 'gfycat.com':
      const name = url.split('/')[url.split('/').length - 1];
      element = (
        <StyledVideo autoPlay loop>
          <source id="webmSource" src={`https://zippy.gfycat.com/${name}.webm`} type="video/webm" />
          <source id="webmSource" src={`https://fat.gfycat.com/${name}.webm`} type="video/webm" />
          <source id="mp4Source" src={`https://zippy.gfycat.com/${name}.mp4`} type="video/mp4" />
          <source id="mp4Source" src={`https://fat.gfycat.com//${name}.mp4`} type="video/mp4" />
          <img role="presentation" title="Sorry, your browser doesn't support HTML5 video." src={thumbnail} />
        </StyledVideo>
      );
      break;
    case 'm.imgur.com':
      element = (
        <StyledImg src={url.replace('?r', '.gif')} role="presentation" />
      );
      break;
    case 'self.perfectloops':
      element = (
        <StyledImg src="" role="presentation" />
      )
      break;
    case 'media.giphy.com':
    default:
        element = (
          <StyledImg src={url} role="presentation" />
        );
      break;
  }
  return element;
};

export default Gipher;