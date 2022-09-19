import { NextApiRequest, NextApiResponse } from 'next';
import Order from '../../../models/Order';

import { connect } from 'mongoose';
import * as jose from 'jose';
import { STATUS } from '../../../ts/enums/enums';

const MONGODB_URI = process.env.MONGODB_URI || '';
const JWT_SECRET = process.env.JWT_SECRET;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const jwt = req?.cookies?.GulaGulaJwt;

  if (!jwt) {
    res
      .status(STATUS.AUTH_FAILED)
      .json({ message: 'Necessário estar logado para prosseguir' });
  }

  if (req.method === 'POST') {
    if (!req.body.products || !req.body.total || !req.body.paymentMethod) {
      res.status(STATUS.MISSING_DATA).json({ message: 'Pedido inválido' });
    } else {
      try {
        await connect(MONGODB_URI).catch((err) => res.status(STATUS.SERVER_ERROR).json({success:false}));
        const response = await jose.jwtVerify(
          jwt!,
          new TextEncoder().encode(JWT_SECRET)
        );
          
        const _id = await response.payload.userId;
        await Order.create({
          customerId: _id,
          paymentMethod: req.body.paymentMethod,
          products: req.body.products,
          total: req.body.total,
          discount: req.body.discount || null,
          cupom: req.body.cupom || null,
          totalWithDiscount:
            req.body.total - req.body.total * req.body.discount || null,
        });
        res.status(STATUS.CREATED).json({ message: 'Pedido enviado com sucesso' });
      } catch (error) {
        res.status(STATUS.SERVER_ERROR).json({ message: 'Ocorreu um erro' });
      }
    }
  }
}
