// A singleton instance
import { Octokit } from '@octokit/rest';
import LoggerService from './logger-service';

export default class OctoService {
  private static instance: Octokit;

  public static GetInstance(): Octokit {
    const log = LoggerService.GetInstance();

    if (this.instance === null || !this.instance) {
      if (process.env.GITHUB_TOKEN !== `` || process.env.GITHUB_TOKEN != null) {
        const octo = new Octokit({
          auth: process.env.GITHUB_TOKEN,
        });
        this.instance = octo;
      } else {
        log.error(
          `Enviromental variable GITHUB_TOKEN missing, cannot connect to github`,
        );
      }
    }

    return this.instance;
  }
}
