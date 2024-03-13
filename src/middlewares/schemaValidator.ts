import { Request, Response, NextFunction, RequestHandler } from 'express';
import { ApiResponse } from '../utils/ApiResponse';
import { ObjectSchema } from 'joi';
import { StatusCodes } from '../common/constants';

const response = new ApiResponse();

export const schemaValidator = (schema: ObjectSchema): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, {
      abortEarly: true,
    });

    if (error) {
      // Get the first error message
      const { details } = error;
      const message: string = details[0].message;

      return response.error({
        res,
        err: 'Validation Error',
        errorMessage: message,
        statusCode: StatusCodes.UNPROCESSABLE_ENTITY,
      });
    }

    // Validation successful
    return next();
  };
};
