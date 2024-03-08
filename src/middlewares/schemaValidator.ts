import { RequestHandler } from 'express';
import { ApiResponse } from '../utils/ApiResponse';
import { StatusCodes } from '../common/enums';
import { ObjectSchema } from 'joi';

const response = new ApiResponse();

export const schemaValidator = (schema: ObjectSchema): RequestHandler => {
  return (req, res, next) => {
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