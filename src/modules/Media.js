import { css } from 'styled-components';
// these sizes are arbitrary and you can set them to whatever you wish
const sizes = {
  desktop: { min: 992 },
  tablet: { min: 768, max: 991 },
  phone: { max: 767 }
};
// iterate through the sizes and create a media template
const Media = Object.keys(sizes).reduce((accumulator, label) => {
  // let emSize = sizes[label] / 16
  const { min, max } = sizes[label];
  let query = '';
  if (max) {
    query = `(max-width: ${max / 16}em)`;
  }
  if (min) {
    query += max
      ? `and (min-width: ${min / 16}em)`
      : `(min-width: ${min / 16}em)`;
  }
  accumulator[label] = (...args) => css`
    @media ${query} {
      ${css(...args)}
    }
  `;
  return accumulator;
}, {});

export { Media as default };
