import type { NextApiRequest, NextApiResponse } from 'next';
import User from './../../../models/User';
import { connect } from 'mongoose';
import bcrypt from 'bcryptjs';
import { serialize } from 'cookie';
import * as jose from 'jose';
import { STATUS } from '../../../ts/enums/enums';
const JWT_SECRET = process.env.JWT_SECRET;
const MONGODB_URI = process.env.MONGODB_URI || '';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, email, password } = req.body;

  if (req.method === 'POST') {
    if (!(name && password && email)) {
      res
        .status(STATUS.MISSING_DATA)
        .json({ message: 'E-mail ou senha inválidos', created: false });
    }

    await connect(MONGODB_URI).catch((err) =>
      res
        .status(STATUS.SERVER_ERROR)
        .json({ message: 'Ocorreu um erro, tente novamente', created: false })
    );

    const userExists = await User.findOne({ email: email });

    if (userExists) {
      res
        .status(STATUS.AUTH_FAILED)
        .json({ message: 'Usuário já cadastrado', created: false });
    } else {
      const hashed = bcrypt.hashSync(password, 10);
      const user = await User.create({
        name: name,
        password: hashed,
        email: email,
      });

      const jwtToken = await new jose.SignJWT({ userId: user._id })
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

      res
        .status(STATUS.CREATED)
        .json({ message: 'Usuário criado com sucesso', created: true });
    }
  }
}
