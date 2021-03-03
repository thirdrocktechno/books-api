import mongoose from "mongoose";
import { Constants } from "./config/environment"
// import Config from "./config/config";
import Logger from "./config/logger";
"./models/index";

import {app} from './app'

let server;
mongoose.connect(Constants.env.MONGO_URL, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(async () => {
  Logger.info('Connected to MongoDB');
  server = app.listen(Constants.env.PORT, () => {
    Logger.info(`Listening to port ${Constants.env.PORT}`);
  });
}).catch((error) => {
  Logger.error(error)
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      Logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  Logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

// process.on('SIGTERM', () => {
//   Logger.info('SIGTERM received');
//   if (server) {
//     server.close();
//   }
// });


