import { ApiError } from 'next/dist/server/api-utils'

import { HttpStatusCode } from './http'

type ExceptionFn = (message?: string) => never;

function buildException(statusCode: HttpStatusCode): ExceptionFn {
  return (message?: string) => {
    throw new ApiError(statusCode, message ?? 'Unknown Error')
  }
}

export const throwInternalServerErrorException: ExceptionFn = buildException(
  HttpStatusCode.InternalServerError,
)

export const throwBadRequestException: ExceptionFn = buildException(
  HttpStatusCode.BadRequest,
)

export const throwNotFoundException: ExceptionFn = buildException(
  HttpStatusCode.NotFound,
)

export const throwUnauthorizedException: ExceptionFn = buildException(
  HttpStatusCode.Unauthorized,
)

export const throwForbiddenException: ExceptionFn = buildException(
  HttpStatusCode.Forbidden,
)

export const throwMethodNotAllowedException: ExceptionFn = buildException(
  HttpStatusCode.MethodNotAllowed,
)

export const throwConflictException: ExceptionFn = buildException(
  HttpStatusCode.Conflict,
)
