import { Injectable } from '@nestjs/common';
import { IResponse } from './response.interface';

@Injectable()
export class ResponseService {
  error(response: IResponse): IResponse {
    if (response.errors) {
      return {
        statusCode: response.statusCode,
        message: response.message,
        errors: response.errors,
      };
    }

    return {
      statusCode: response.statusCode,
      message: response.message,
    };
  }

  success(response: IResponse): IResponse {
    if (response.data) {
      return {
        statusCode: response.statusCode,
        message: response.message,
        data: response.data,
      };
    }

    return {
      statusCode: response.statusCode,
      message: response.message,
    };
  }
}
