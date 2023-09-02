abstract class GeneralError extends Error {
  constructor(message: string) {
    super(message);
  }

  getCode(): number {
    if (this instanceof BadRequest) {
      return 400;
    }
    if (this instanceof NotFound) {
      return 404;
    }
    if (this instanceof Unauthorized) {
      return 401;
    }
    if (this instanceof ApplicationError) {
      return 400;
    }
    if (this instanceof InsufficientAccessError) {
      return 403;
    }
    return 400;
  }
}

class BadRequest extends GeneralError {}
class NotFound extends GeneralError {}
class Unauthorized extends GeneralError {}
class ApplicationError extends GeneralError {}
class InsufficientAccessError extends GeneralError {}

const useErrorHandler = (err: Error, req: any, res: any, next: any) => {
  if (err instanceof GeneralError) {
    return res.status(err.getCode()).json({
      status: "error",
      message: typeof err.message === "string" ? err.message : err.message,
    });
  }

  return res.status(400).json({
    status: "error",
    message: typeof err.message === "string" ? err.message : err.message,
  });
};

export { GeneralError, BadRequest, NotFound, Unauthorized, ApplicationError, InsufficientAccessError, useErrorHandler };

process.on("uncaughtException", (err: Error) => {
  console.log(err);
});

process.on("unhandledRejection", (reason: {} | null | undefined, promise: Promise<any>) => {
  console.log(reason);
});
