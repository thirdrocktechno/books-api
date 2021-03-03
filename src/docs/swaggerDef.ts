// const { version = require('../../package.json');

import { version } from "../../package.json"

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'Books API',
    version,
    license: {
    },
  }
};

export default swaggerDef;
