export enum LoanType {
  CAR = 'car',
  PERSONAL = 'personal',
}

export const StatusCodes = {
  OK: 200,
  CREATED: 201,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
};
