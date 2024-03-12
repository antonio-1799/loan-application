import { Request, Response } from 'express';
import { ILoanApplication } from '../models/LoanApplication';
import { ApiResponse } from '../utils/ApiResponse';
import { calculateMonthlyPayment } from '../utils/calculateMonthlyPayment';
import { loanTermMap, StatusCodes } from '../common/constants';

// In-memory collection
let loanApplications: ILoanApplication[] = [];

const response = new ApiResponse();

// Helper to get loan application
const getLoanApplication = (
  loanApplications: ILoanApplication[],
  id: string,
): ILoanApplication | undefined => {
  return loanApplications.find((loanApplication) => {
    return loanApplication.id === id;
  });
};

// Create Loan application
export const createLoan = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  // Check if loan application already exist
  const existingLoanApplication = getLoanApplication(
    loanApplications,
    req.body.id,
  );
  if (existingLoanApplication) {
    return response.error({
      res,
      err: 'Conflict',
      errorMessage: 'Loan already exist',
      statusCode: StatusCodes.CONFLICT,
    });
  }

  // Calculate monthly payment
  const { loanAmount, interestRate, loanType } = req.body;
  const loanTerm = loanTermMap.get(loanType)!;
  const monthlyPayment = calculateMonthlyPayment({
    loanAmount,
    interestRate,
    loanTerm,
  });

  // Add monthly payment and loan term to loan application
  Object.assign(req.body, { monthlyPayment });
  Object.assign(req.body, { loanTerm });

  // Push the loan application to the in-memory collection
  loanApplications.push(req.body);

  return response.success({
    res,
    message: 'Loan application created',
    data: req.body,
    statusCode: StatusCodes.CREATED,
  });
};

// Get Loan Application
export const getLoan = async (req: Request, res: Response) => {
  // Check if loan application is existing
  const existingLoanApplication = getLoanApplication(
    loanApplications,
    req.params.id,
  );

  if (!existingLoanApplication)
    return response.error({
      res,
      err: 'Not Found',
      errorMessage: `Loan Application with id: ${req.params.id} not found`,
      statusCode: StatusCodes.NOT_FOUND,
    });

  return response.success({
    res,
    message: `Loan application id: ${existingLoanApplication.id}`,
    data: existingLoanApplication,
    statusCode: StatusCodes.OK,
  });
};

// Get Loan Applications
export const getLoans = async (_req: Request, res: Response) => {
  return response.success({
    res,
    message: `Loan applications`,
    data: loanApplications,
    statusCode: StatusCodes.OK,
  });
};

// Update Loan Application
export const updateLoan = async (req: Request, res: Response) => {
  // Check if loan application is existing
  const existingLoanApplication = getLoanApplication(
    loanApplications,
    req.params.id,
  );

  if (!existingLoanApplication)
    return response.error({
      res,
      err: 'Not Found',
      errorMessage: `Loan Application with id: ${req.params.id} not found`,
      statusCode: StatusCodes.NOT_FOUND,
    });

  // Assuming all keys are required for the update
  // Recalculate monthly payment
  const { applicantName, loanAmount, loanType, income, interestRate } =
    req.body;
  const loanTerm = loanTermMap.get(loanType)!;
  const monthlyPayment = calculateMonthlyPayment({
    loanAmount,
    interestRate,
    loanTerm,
  });

  // Update loan application
  const updatedLoanApplication = {
    ...existingLoanApplication,
    applicantName,
    loanAmount,
    loanType,
    income,
    interestRate,
    monthlyPayment,
  };

  const indexToUpdate = loanApplications.findIndex(
    (loanApplication) => loanApplication.id === existingLoanApplication.id,
  );

  loanApplications = [
    ...loanApplications.slice(0, indexToUpdate),
    updatedLoanApplication,
    ...loanApplications.slice(indexToUpdate + 1),
  ];

  return response.success({
    res,
    message: `Loan application id: ${existingLoanApplication.id} updated successfully`,
    data: updatedLoanApplication,
    statusCode: StatusCodes.OK,
  });
};

// Delete Loan Application
export const deleteLoan = async (req: Request, res: Response) => {
  // Check if loan application is existing
  const existingLoanApplication = getLoanApplication(
    loanApplications,
    req.params.id,
  );

  if (!existingLoanApplication)
    return response.error({
      res,
      err: 'Not Found',
      errorMessage: `Loan Application with id: ${req.params.id} not found`,
      statusCode: StatusCodes.NOT_FOUND,
    });

  // Remove loan application by id
  loanApplications = loanApplications.filter(
    (loanApplication) => loanApplication.id !== existingLoanApplication.id,
  );

  return response.success({
    res,
    message: `Loan application id: ${existingLoanApplication.id} deleted successfully`,
    data: loanApplications,
    statusCode: StatusCodes.OK,
  });
};
