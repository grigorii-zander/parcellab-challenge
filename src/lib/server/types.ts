interface ResponseError {
  code?: string;
  message: string;
}

export interface BaseResponse {
  data?: object;
  error?: ResponseError;
}
