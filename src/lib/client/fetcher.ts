export async function fetcher(url: string) {
  const response = await fetch(url)

  if (!response.ok) {
    const error = await response.json()
    throw error
  }

  return await response.json()
}

export async function request<Response = unknown, Body = unknown>(
  url: string,
  method: string,
  body: Body,
  headers: Record<string, string> = {},
): Promise<Response> {
  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: method.toUpperCase() === 'GET' ? undefined : JSON.stringify(body),
  })

  if (!response.ok) {
    const error = await response.json()
    throw error
  }

  return response.json()
}

export async function postRequest<
  Response = unknown,
  Data = Record<string, unknown>,
>(url: string, { arg }: { arg: Data }): Promise<Response> {
  return request<Response>(url, 'POST', arg)
}

export async function putRequest<
  Response = unknown,
  Data = Record<string, unknown>,
>(url: string, { arg }: { arg: Data }): Promise<Response> {
  return request<Response>(url, 'PUT', arg)
}

export async function deleteRequest<
  Response = unknown,
  Data = Record<string, unknown>,
>(url: string, { arg }: { arg: Data }): Promise<Response> {
  return request<Response>(url, 'DELETE', arg)
}
