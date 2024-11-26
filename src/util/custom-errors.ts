import { StatusCodes } from "http-status-codes";

export class CustomError extends Error {
  status: number;
  payload: Record<string, unknown> | undefined;

  constructor(message: string, status: number, payload?: Record<string, unknown>) {
    super(message);
    this.status = status;
    this.payload = payload;
  }
};

export class NotValidDataError extends CustomError {
  constructor(message: string, payload?: Record<string, unknown>) {
    super(message, StatusCodes.UNAUTHORIZED, payload);
  }
}

export class BadParams extends CustomError {
  constructor(message: string, payload?: Record<string, unknown>) {
    super(message, StatusCodes.BAD_REQUEST, payload);
  }
}

export class NotFound extends CustomError {
  constructor(message: string, payload?: Record<string, unknown>) {
    super(message, StatusCodes.NOT_FOUND, payload);
  }
}


