import {z} from "zod"

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
])

export type TAPIErrorStatus = z.infer<typeof ZAPIErrorStatusSchema>;

export class SpoolAPIError extends Error {
  public readonly status : TAPIErrorStatus;

  constructor({status,message} : {status : TAPIErrorStatus, message : string}){
    super(message);
    this.status = status;
  }
}