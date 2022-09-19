import { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';
import { STATUS } from '../../../ts/enums/enums';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const jwt = req?.cookies?.GulaGulaJwt;

  if (req.method === 'POST') {
    if (!jwt) {
      res.status(STATUS.SUCCESS).json({ message: 'Você já está deslogado' });
    } else {
      try {
        // para o server da Vercel entender como uma nova requisição e não como "304 - Not Modified"
        if (req.body.key === 'static_key') {
          const serialized = serialize('GulaGulaJwt', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: 0,
            path: '/',
          });
          res.setHeader('Set-Cookie', serialized);
          res.status(STATUS.SUCCESS).json({ success: true });
        }
      } catch (error) {
        res.status(STATUS.SERVER_ERROR).json({ message: 'Ocorreu um erro' });
      }
    }
  }
}
