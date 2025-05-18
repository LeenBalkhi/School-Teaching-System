import * as express from "express";
import * as cors from "cors";
import * as path from "path";
import config from "../config";
import logger from "../utils/logger";

export default class ExpressLoader {
  static start = () => {
    const app = express();
    const { router } = require("../routes");
    // Setup error handling, this must be after all other middleware
    app.use(ExpressLoader.errorHandler);
    // Serve static content
    app.use(express.static(path.join(__dirname, "uploads")));
    app.use(express.json());
    app.use(
      express.urlencoded({
        extended: true,
      })
    );
    // Set up middleware
    app.use(cors());
    // Pass app to routes
    app.use(router);
    // Start application
    app.listen(config.port, () => {
      logger.log(`Express running, now listening on port ${config.port}`);
    });
  };

  /**
   * @description Default error handler to be used with express
   * @param error Error object
   * @param req {object} Express req object
   * @param res {object} Express res object
   * @param next {function} Express next object
   * @returns {*}
   */
  static errorHandler(error, req, res, next) {
    let parsedError;

    // Attempt to gracefully parse error object
    try {
      if (error && typeof error === "object") {
        parsedError = JSON.stringify(error);
      } else {
        parsedError = error;
      }
    } catch (e) {
      logger.log(e);
    }

    // Log the original error
    logger.log(parsedError);

    // If response is already sent, don't attempt to respond to client
    if (res.headersSent) {
      return next(error);
    }

    res.status(400).json({
      success: false,
      error,
    });
  }
}
