import {ExceptionFilter} from '@nestjs/common/interfaces/exceptions';
import {Catch} from '@nestjs/common';

@Catch(Error)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host) {
    const status = 500;

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    response
      .status(200)
      .json({
        statusCode: status,
        message: exception.message,
      });
  }
}
