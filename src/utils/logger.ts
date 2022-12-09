import log from "pino";
import pretty from "pino-pretty";

const stream = pretty({
    colorize: true
  })

const logger = log({
    prettifier: true,
    base: {
        pid: false
    },
}, stream);

export default logger;