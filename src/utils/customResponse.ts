export class ResponseStatus {
  static OK = {
    code: 200,
    status: "OK",
    success: true,
  };
  static RESOURCE_CREATED = {
    code: 201,
    status: "RESOURCE_CREATED",
    success: true,
  };
  static BAD_REQUEST = {
    code: 400,
    status: "BAD_REQUEST",
    success: false,
  };
  static UNAUTHORIZED = {
    code: 401,
    status: "UNAUTHORIZED",
    success: false,
  };
  static INTERNAL_SERVER_ERROR = {
    code: 500,
    status: "INTERNAL_SERVER_ERROR",
    success: false,
  };
}

export default class CustomResponse {
  constructor(
    public status: ResponseStatus,
    public message?: string,
    public data?: any,
    public error?: any
  ) {}
}
