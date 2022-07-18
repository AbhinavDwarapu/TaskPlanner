/* eslint-disable import/no-extraneous-dependencies */
import pino from "pino";

const logger = pino({
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      levelFirst: true,
    },
  },
});

export default logger;
