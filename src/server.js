import path from 'path';
import express from 'express';
import morgan from 'morgan';

import config from '../config';
import reactMiddleware from './server/middleware/react';
import {webpackMiddleware, webpackHotMiddleware} from './server/middleware/webpack';

const isProduction = config.env === 'production';
const server = express();

if (!isProduction) {
  server.use(webpackMiddleware);
  server.use(webpackHotMiddleware);
}

server.use(morgan(isProduction ? 'combined' : 'dev'));
server.use(express.static(path.resolve(__dirname, '../build')));
server.use(reactMiddleware);

server.listen(config.server.port, () => {
  console.log(`Listening on ${config.server.port} in ${config.env} mode`);
});
