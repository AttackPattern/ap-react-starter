import React, { Component } from 'react';
import PropTypes from 'prop-types';

const ServerLayout = ({assets, environment, markup, stores}) => {
  return (
    <html>
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta name="description" content="Awesome description bro" />
        <meta name="keywords" content="awesome keywords bro" />
        <meta name="viewport" content="width=device-width, initial-scale = 1.0, maximum-scale=1.0, user-scalable=no" />
        <title>ap-react</title>
        <link rel="canonical" href="/" />
        <link href={assets.styles.main} rel="stylesheet" type="text/css" />
      </head>
      <body>
        <div id="main" >
          <div dangerouslySetInnerHTML={{ __html: markup }} />
        </div>
        <script dangerouslySetInnerHTML={{ __html: `window.__PRELOADED_STATE__ = ${JSON.stringify(stores)};` }} />
        <script src={assets.scripts.main}></script>
      </body>

    </html>
  );
};
ServerLayout.propTypes = {
  assets: PropTypes.object.isRequired,
  environment: PropTypes.string.isRequired,
  markup: PropTypes.string.isRequired,
};

export default ServerLayout;
