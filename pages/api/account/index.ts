import { NextApiRequest, NextApiResponse } from 'next';
import User from '../../../models/User';
import * as jose from 'jose';
import { connect } from 'mongoose';
import { STATUS } from '../../../ts/enums/enums';
const MONGODB_URI = process.env.MONGODB_URI || '';
const JWT_SECRET = process.env.JWT_SECRET;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'PUT') {
    await connect(MONGODB_URI).catch(err => res.status(STATUS.SERVER_ERROR).json({message: 'Conexão com o banco falhou'}))
    
    if (
      !req.body.name ||
      !req.body.email ||
      !req.body.city ||
      !req.body.street ||
      !req.body.zipCode ||
      !req.body.district ||
      !req.body.number ||
      !req.body.federalUnit
    ) {
      res
        .status(STATUS.MISSING_DATA)
        .json({ message: 'Todos os campos são obrigatórios', success: false });
    } else {
      const jwt = req?.cookies?.GulaGulaJwt;

      if (jwt) {
        try {
          const response = await jose.jwtVerify(
            jwt!,
            new TextEncoder().encode(JWT_SECRET)
          );
          const _id = await response.payload.userId;
          await User.findByIdAndUpdate(_id, {
            name: req.body.name,
            email: req.body.email,
            address: {
              isAddressRegistered: true,
              city: req.body.city,
              street: req.body.street,
              zipCode: req.body.zipCode,
              district: req.body.district,
              number: req.body.number,
              federalUnit: req.body.federalUnit,
              additional: req.body.additional,
            },
          });

          res
            .status(STATUS.CREATED)
            .json({ message: 'Dados atualizados com sucesso', success: true });
        } catch (error) {
          res.status(STATUS.AUTH_FAILED).json({ message: 'Ocorreu um erro', success: false });
        }
      } else {
        res.status(STATUS.AUTH_FAILED).json({ message: 'Ocorreu um erro', success: false });
      }
    }
  }
}
