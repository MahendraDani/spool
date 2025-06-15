import { z } from "zod";

export const ZAPIErrorStatusSchema = z.enum([
  "bad_request",
  "not_found", 
  "internal_server_error",
  "unauthorized",
  "forbidden",
  "rate_limit_exceeded",
  "invite_expired",
  "invite_pending",
  "exceeded_limit",
  "conflict",
  "unprocessable_entity",
]);

export type TAPIErrorStatus = z.infer<typeof ZAPIErrorStatusSchema>;

// Map of error status to HTTP status codes
export const ERROR_STATUS_CODE_MAP: Record<TAPIErrorStatus, number> = {
  "bad_request": 400,
  "unauthorized": 401,
  "forbidden": 403,
  "not_found": 404,
  "conflict": 409,
  "unprocessable_entity": 422,
  "rate_limit_exceeded": 429,
  "internal_server_error": 500,
  "invite_expired": 410, // Gone - the invite has expired
  "invite_pending": 202, // Accepted - request acknowledged but processing not complete
  "exceeded_limit": 413, // Payload Too Large or could use 429 Rate Limited
};

export class SpoolAPIError extends Error {
  public readonly status: TAPIErrorStatus;
  public readonly statusCode: number;

  constructor({ status, message }: { status: TAPIErrorStatus; message: string }) {
    super(message);
    this.status = status;
    this.statusCode = ERROR_STATUS_CODE_MAP[status];
  }
}