import React, {PropTypes} from 'react';

const Html = ({assets, content, head, initialState}) => (
  <html>
    <head>
      <meta charSet='utf-8' />
      <meta content='width=device-width, initial-scale=1' name='viewport' />
      {head.meta.toComponent()}
      <meta name='mobile-web-app-capable' content='yes' />
      {head.title.toComponent()}
      <link href={assets.main.css} rel='stylesheet' />
      <script src='https://cdn.polyfill.io/v2/polyfill.min.js' />
    </head>
    <body>
      <div dangerouslySetInnerHTML={{__html: content}} id='app' />
      <script dangerouslySetInnerHTML={{__html: `window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}`}} />
      <script src={assets.main.js} async='async' />
    </body>
  </html>
);

Html.propTypes = {
  assets: PropTypes.object.isRequired,
  content: PropTypes.string.isRequired,
  head: PropTypes.object.isRequired,
  initialState: PropTypes.object
};

export default Html;
