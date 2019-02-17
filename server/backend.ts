#!/usr/bin/env/node
import { json, urlencoded } from 'body-parser';
import { express } from 'express';
import { config } from './config';
import { router } from './router';
const cors = require('cors');

const express = require('express');

const server = express();


server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

server.use(json());
server.use(urlencoded({ extended: true }));

server.options('*', cors({
  credentials: true,
  origin: true,
}));
server.use(cors({
  origin: true,
  credentials: true,
}));

// Actual routes are in routes > handler
server.use('/', router);

const startServer = () => {
  server.listen(config.port, config.host, () => {
    console.log('mock-server is running on http://%s:%s', config.host, config.port);
    console.log('run http://localhost:%s/', config.port);

  });
};

// Start server
setImmediate(startServer);
