import { Response } from "express";

export const responseHandler = (data: any, res: Response, message?: string, status?: number): void => {
  const statusCode = status || 200;
  const messageData = message || "Success";

  res.status(statusCode).json({
    status: "success",
    message: messageData,
    data: data,
  });
};
