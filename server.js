/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config');
const lockfile = require('lockfile');

const app = express();

const dataFilePath = path.join(__dirname, (process.env.DATA_FILE || 'data.json'));

app.set('port', (process.env.PORT || 3000));

const compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

app.use((req, res, next) => {
  console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~');
  console.log('Time:', Date.now());
  console.log(`${req.method} ${req.originalUrl}`);
  console.log(req.body);
  next();
});

function readDbWithLock(cb) {
  lockfile.lock('db-file.lock', { retries: 10, retryWait: 20 }, () => {
    const done = () => {
      lockfile.unlockSync('db-file.lock');
    };

    fs.readFile(__dirname + '/data.json', (err, data) => {
      cb(err, JSON.parse(data), done);
    });
  });
}

export function readDb(cb) {
  readDbWithLock((err, data, done) => {
    done();
    cb(err, data);
  });
}

app.get('/api/results', (req, res) => {
  readDb((err, data) => {
    res.send(data);
  });
});

app.get('/status', (req, res) => {
  res.send(200);
});

app.listen(app.get('port'), () => {
  console.log(`Server available at: http://localhost:${app.get('port')}/`);
});
