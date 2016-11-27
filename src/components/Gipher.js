import React from 'react';

const Gipher = (props) => {
  // console.log(props);

  const style = {
    position: 'relative',
    width: '100%'
  };

  const { domain, url, thumbnail } = props;

  let element;

  switch (domain) {
    case 'i.imgur.com':
      const imgurname = url.split('/')[url.split('/').length -1].split('.')[0];
      element = (
        <video autoPlay style={style}>
            <source src={`//i.imgur.com/${imgurname}.mp4`} type="video/mp4" />
        </video>
      );
      break;
    case 'gfycat.com':
      const name = url.split('/')[url.split('/').length - 1];
      element = (
        <video style={style} loop='loop'>
          <source id="webmSource" src={`https://zippy.gfycat.com/${name}.webm`} type="video/webm" />
          <source id="webmSource" src={`https://fat.gfycat.com/${name}.webm`} type="video/webm" />
          <source id="mp4Source" src={`https://zippy.gfycat.com/${name}.mp4`} type="video/mp4" />
          <source id="mp4Source" src={`https://fat.gfycat.com//${name}.mp4`} type="video/mp4" />
          <img role="presentation" title="Sorry, your browser doesn't support HTML5 video." src={thumbnail} />
        </video>
      );
      break;
    case 'm.imgur.com':
      element = (
        <img src={url.replace('?r', '.gif')} role="presentation" style={style} />
      );
      break;
    case 'self.perfectloops':
      element = (
        <img src="" role="presentation" style={style} />
      )
      break;
    case 'media.giphy.com':
    default:
        element = (
          <img src={url} role="presentation" style={style} />
        );
      break;
  }
  return element;
};

export default Gipher;