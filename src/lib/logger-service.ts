// A singleton that allows for logging
import { Logger } from 'tslog';

export default class LoggerService {
  private static instance: Logger;

  public static GetInstance(): Logger {
    if (this.instance === null || !this.instance) {
      this.instance = new Logger({
        displayFilePath: `hideNodeModulesOnly`,
        displayFunctionName: false,
      });
    }

    return this.instance;
  }
}
