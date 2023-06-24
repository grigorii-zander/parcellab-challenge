import { AnySchema, InferType } from 'yup'

import { throwBadRequestException } from './exceptions'

export async function validate<S extends AnySchema = AnySchema>(
  schema: S,
  target: unknown,
): Promise<InferType<S>> {
  if (!target) {
    throwBadRequestException('Request validation failed due to empty payload')
  }


  try {
    return await schema.validate(target, { stripUnknown: true, strict: true })
  } catch (err) {
    throwBadRequestException(`Request validation failed: ${err}`)
  }
}
