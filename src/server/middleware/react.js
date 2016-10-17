import Helmet from 'react-helmet';
import React from 'react';
import {Provider} from 'react-redux';
import {RouterContext, match} from 'react-router';
import {createLocation} from 'history/LocationUtils';
import {renderToStaticMarkup, renderToString} from 'react-dom/server';

import routes from '../../common/routes';
import NoMatch from '../../common/routes/NoMatch';
import Html from '../components/Html';
import configureStore from '../../common/configureStore';

const render = (renderProps) => {
  const assets = require('../../../build/assets.json');
  const store = configureStore();
  const initialState = store.getState();
  const content = renderToString(
    <Provider store={store}>
      <RouterContext {...renderProps} />
    </Provider>
  );
  const head = Helmet.rewind();

  return `<!DOCTYPE html>
  ${renderToStaticMarkup(<Html
      assets={assets}
      content={content}
      head={head}
      initialState={initialState}
    />
  )}`;
};

export default ({url}, res, next) => {

  const location = createLocation(url);
  match({routes, location}, (error, redirectLocation, renderProps) => {

      if (error) {
        return res.status(500).send(error.message);
      } else if (redirectLocation) {
        return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      } else if (!renderProps) {
        return res.status(404).send('Not Found');
      }

      const isNotFound = renderProps.components.indexOf(NoMatch) !== -1;

      return res
        .status(isNotFound ? 404 : 200)
        .send(render(renderProps));
    });
};
