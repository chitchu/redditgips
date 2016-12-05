import React, { PureComponent } from 'react';
import styled from 'styled-components';

class Gipher extends PureComponent {
  StyledVideo = styled.video`
    position: relative;
    width: 100%;
    display: block;
  `;
  StyledImg = styled.img`
    position: relative;
    width: 100%;
    display: block;
  `;

  render() {
    const StyledVideo = this.StyledVideo;
    const StyledImg = this.StyledImg;
    const { domain, url, thumbnail } = this.props;

    let element;
    switch (domain) {
      case 'imgur.com':
      case 'i.imgur.com':
        const imgurname = url.split('/')[url.split('/').length -1].split('.')[0];
        element = (
          <StyledVideo loop>
              <source src={`//i.imgur.com/${imgurname}.mp4`} type="video/mp4" />
          </StyledVideo>
        );
        break;
      case 'gfycat.com':
        const name = url.split('/')[url.split('/').length - 1];
        element = (
          <StyledVideo loop>
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
      case 'giphy.com':
        let giphyUrl = (url.match('\\.gif')) ? url : `https://media.giphy.com/media/${url.substr(url.lastIndexOf('-') + 1)}/giphy.gif`;
        element = (
          <StyledImg src={giphyUrl} role="presentation" />
        );
        break;
      case 'mc-market.org':
      default:
        element = (
          <StyledImg src={url} role="presentation" />
        );
        break;
    }
    return element;
  }
}

export default Gipher;