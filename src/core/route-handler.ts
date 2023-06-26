import { ApiError } from 'next/dist/server/api-utils'
import z, { ZodError, ZodSchema } from 'zod'
import { HttpStatusCode } from '~/core/http'
import { NextRequest, NextResponse } from 'next/server'

const OverrideInjectionSymbol = Symbol('override-injection')

type ZodSchemaResult<T> = T extends ZodSchema ? z.infer<T> : undefined
type OptionalObj<T> = T extends undefined ? Record<string, never> : T

// Why are there two calls to create a new handler?
// I want to make it possible to restrict the return type of the handler
// by providing the exact return type as a generic parameter. Here I have a few parameters where
// a Response is required, and everything else is intended to be inferred automatically.
//
// Unfortunately, you can't mix optional generic parameters with required parameters,
// because in that case, typescript will drop parameters binding, which is not what we are looking for.
//
// But you can achieve this behavior by curring the function with optional parameters.
// It works, but you have to make an additional fn call.
// Here is a typescript proposal. Hope we'll see it in the near future:
// https://github.com/microsoft/TypeScript/issues/26242
export const routeHandler = <
  Response extends ({ result: any } | { error: any }),
>() => <
  QuerySchema extends ZodSchema | undefined = undefined,
  BodySchema extends ZodSchema | undefined = undefined,
  ParamsSchema extends ZodSchema | undefined = undefined,
  Injection extends Record<string, any> | undefined = undefined,
>(
  opts: {
    inject?: Injection,
    querySchema?: QuerySchema,
    bodySchema?: BodySchema,
    paramsSchema?: ParamsSchema
  },
  handler: (
    handlerParams: {
      req: NextRequest,
      body: ZodSchemaResult<BodySchema>,
      params: ZodSchemaResult<ParamsSchema>,
      query: ZodSchemaResult<QuerySchema>,
    } & OptionalObj<Injection>
  ) => Promise<{
    status: HttpStatusCode,
  } & Response>,
) => {
  const finalHandler = async (req: NextRequest, reqOptions: { params: any }) => {
    try {
      let body
      let query
      let params

      // TODO: combine schema checks in Promise.all([...])
      if(opts.bodySchema) {
        let parsedBody
        try {
          parsedBody = req.json()
        } catch(e) { /* empty */ }
        body = await opts.bodySchema.parseAsync(parsedBody)
      }

      if(opts.querySchema) {
        const url = new URL(req.url)
        query = await opts.querySchema.parseAsync(Object.fromEntries(url.searchParams.entries()))
      }

      if(opts.paramsSchema) {
        params = await opts.paramsSchema.parseAsync(reqOptions?.params)
      }

      const { status, ...result } = await handler({
        req,
        body,
        query,
        params,
        ...opts.inject as OptionalObj<Injection>,
      })
      return NextResponse.json(result, { status })

    } catch (err) {
      if(err instanceof ApiError) {
        return NextResponse.json({
          error: {
            message: err.message,
          },
        }, {
          status: err.statusCode,
        })
      }

      if(err instanceof ZodError) {
        return NextResponse.json({
          error: {
            message: err.message,
          },
        }, {
          status: HttpStatusCode.BadRequest,
        })
      }

      return NextResponse.json({
        error: {
          message: 'Internal server error.',
        },
      }, {
        status: HttpStatusCode.InternalServerError,
      })
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    // TODO: add dependency override functionality for test suits
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    finalHandler[ OverrideInjectionSymbol ] = <K extends keyof Injection>(_key: K, _value: Injection[K]) => {

    }
  }


  return finalHandler
}
