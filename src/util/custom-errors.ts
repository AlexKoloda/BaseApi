import { error } from 'console';
import { StatusCodes } from 'http-status-codes';

export type ErrorMessagesPaths = {
  paths: {
    path: string;
    message?: string;
  }[];
};

export class CustomError extends Error {
  status: number;
  payload: Record<string, unknown> | undefined;

  constructor(
    message: string,
    status: number,
    payload?: Record<string, unknown>
  ) {
    super(message);
    this.status = status;
    this.payload = payload;
  }
}

export class ValidationFailure extends CustomError {
  constructor(payload?: ErrorMessagesPaths) {
    super('Validate error', StatusCodes.BAD_REQUEST, {
      type: 'validation',
      ...payload,
    });
  }
}

export class UnAuthorized extends CustomError {
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

export class AlreadyReported extends CustomError {
  constructor(message: string, payload?: Record<string, unknown>,) {
    super(message, 208, payload);
  }
}
