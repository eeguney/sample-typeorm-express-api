import myDataSource from "./data-source";
import CreateExpressServer from "./utils/createExpressServer";
import logger from "./utils/logger";

class Application {
  static main(): void {
    myDataSource
      .initialize()
      .then(() => {
        logger.info(`Connection to MySQL server established...`);
        CreateExpressServer.start();
      })
      .catch((err) => {
        logger.error(
          "Error during Data Source initialization or running Express Server",
          err
        );
      });
  }
}

Application.main();
