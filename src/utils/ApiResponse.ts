import { Response } from 'express';
import { ILoanApplication } from '../models/LoanApplication';
import { StatusCodes } from '../common/constants';

interface IBaseResponse {
  res: Response;
  statusCode: number;
}

interface ISuccess extends IBaseResponse {
  message: string;
  data: ILoanApplication | ILoanApplication[] | null;
}

interface IError extends IBaseResponse {
  err: string;
  errorMessage: string;
}

export class ApiResponse {
  async success({
    res,
    message,
    data = null,
    statusCode = StatusCodes.OK,
  }: ISuccess): Promise<Response> {
    return res.status(statusCode).json({
      message,
      data,
    });
  }

  async error({
    res,
    err,
    errorMessage = 'General Exception',
    statusCode = StatusCodes.INTERNAL_SERVER_ERROR,
  }: IError): Promise<Response> {
    return res.status(statusCode).json({
      message: errorMessage,
      error: err,
    });
  }
}
