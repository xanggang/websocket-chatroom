// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import Auth from '../../../app/middleware/auth';
import ErrorHandler from '../../../app/middleware/error_handler';

declare module 'egg' {
  interface IMiddleware {
    auth: typeof Auth;
    errorHandler: typeof ErrorHandler;
  }
}
