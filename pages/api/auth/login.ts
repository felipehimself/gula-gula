import type { NextApiRequest, NextApiResponse } from 'next';
import User from '../../../models/User';
import { connect } from 'mongoose';
import { serialize } from 'cookie';
import * as jose from 'jose';
import { STATUS } from '../../../ts/enums/enums';
import bcrypt from 'bcryptjs';

const MONGODB_URI = process.env.MONGODB_URI || '';
const JWT_SECRET = process.env.JWT_SECRET

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body;

  if (req.method === 'POST') {
    if (!email || !password) {
      res
        .status(STATUS.MISSING_DATA)
        .json({ messgae: 'E-mail ou senha inválidos', isLoggedIn: false });
    } else {

      await connect(MONGODB_URI).catch(err => res.status(STATUS.SERVER_ERROR).json({message: 'Erro de conexção', isLoggedIn: false}))

      const userExists = await User.findOne({ email: email });

      if (!userExists) {
        res
          .status(STATUS.AUTH_FAILED)
          .json({ message: 'E-mail ou senha inválidos', isLoggedIn: false });
      } else {
        const isPasswordValid = bcrypt.compareSync(password,userExists.password);

        if (isPasswordValid) {

          const jwtToken = await new jose.SignJWT({ userId: userExists._id })
          .setProtectedHeader({ alg: 'HS256' })
          .setIssuedAt()
          .setExpirationTime('30d')
          .sign(new TextEncoder().encode(JWT_SECRET));
      
          const serialized = serialize('GulaGulaJwt', jwtToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 30,
            path: '/',
          });
      
          res.setHeader('Set-Cookie', serialized);
          res.status(STATUS.SUCCESS).json({ message: 'Login efetuado com sucesso', isLoggedIn: true, user:userExists.name });
        } else {
          res.status(STATUS.AUTH_FAILED).json({message: 'E-mail ou senha inválidos', isLoggedIn: false})
        }
      }
    }
  }
}
