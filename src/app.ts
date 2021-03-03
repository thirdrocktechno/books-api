import express from "express";
import bodyParser from 'body-parser';
import helmet from "helmet";
import httpStatus from "http-status";
import cors from "cors";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import compression from "compression";
import passport from "passport";
import dotenv from 'dotenv';

import strategies from "./config/passport";
import Routes from "./routes/v1";
import ApiError from "./utils/ApiError";
import Error from "./middlewares/error";

const app = express();
app.use(bodyParser.json({
    limit: '50mb',
    verify(req: any, res, buf, encoding) {
        req.rawBody = buf;
    }
}));

// set security HTTP headers
app.use(helmet());

// // parse json request body
app.use(express.json());

// // parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// // sanitize mongo
app.use(xss());
app.use(mongoSanitize());

// // gzip compression
app.use(compression());

// // enable cors
app.use(cors());
app.options('*', cors());

dotenv.config();

// // passport 
passport.use('jwt', strategies);


// // v1 api routes
app.use('/v1', Routes);

// // send back a 404 error for any unknown api request
app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(Error.errorConverter);

// // handle error
app.use(Error.errorHandler);



export {app};
