import { StatusCodes } from "http-status-codes";

type PayloadType = {
  paths: {
    path: string;
    message?: string;
  }[];
};

type MessageType = {
  messages: {
    message: string;
  };
};

export class CustomError extends Error {
  status: number;
  payload: Record<string, unknown> | undefined;

  constructor(message: string, status: number, payload?: Record<string, unknown>) {
    super(message);
    this.status = status;
    this.payload = payload;
  }
}

export class NotValidType extends CustomError {
  constructor(message: any, payload?: PayloadType) {
    super(message, StatusCodes.BAD_REQUEST, {
      type: "validation",
      ...payload,
    });
  }
}

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
