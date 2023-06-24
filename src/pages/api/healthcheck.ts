import type { NextApiRequest, NextApiResponse } from 'next'

import { HttpStatusCode } from '~/core/http'

export const GET = (_: NextApiRequest, res: NextApiResponse<{ ok: boolean }>) => {
  res.status(HttpStatusCode.Ok).json({ ok: true })
}
