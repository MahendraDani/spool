import { NextRequest, NextResponse } from "next/server";
import { SpoolAPIError } from "./error";

export const spoolAPIErrorHandler = (req : NextRequest, err : SpoolAPIError)=>{
  console.log(`Error on: ${req.url}\tmethod: ${req.method}`);
  console.log(err);
  return NextResponse.json({
    error : {
      status : err.status,
      message : err.message,
    }
  })
}

export const spoolInternalAPIErrorHandler = (req : NextRequest, err : Error | unknown, message ?:string)=>{
  console.info(`Error on: ${req.url}\tmethod: ${req.method}`);
  console.error(err);
  const defaultError = "Oops, internal server error!";
  return NextResponse.json({
    error : {
      status : "internal_server_error",
      message : message ? message : defaultError,
    }
  })
}