// Soem functions to help with error handlilng in API routes
import type { NextApiResponse } from 'next';
import LoggerService from './logger-service';

const log = LoggerService.GetInstance();

export function badRequest(res: NextApiResponse, message: string): void {
  res.status(400).send(message);
  log.error(message);
}

export function internal(res: NextApiResponse, message: string): void {
  res.status(500).send(message);
  log.error(message);
}
