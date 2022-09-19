import { NextApiRequest, NextApiResponse } from 'next';
import Product from '../../../models/Product';
import { connect } from 'mongoose';


const MONGODB_URI = process.env.MONGODB_URI || '';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // if (req.method === 'POST') {
  //   await connect(MONGODB_URI).catch((err) =>
  //     res.status(503).json({ message: 'Ocorreu um erro interno' })
  //   );
  //   // await Product.deleteMany()
  //   await Product.insertMany(data)
  //   res.status(201).json({ message: 'success' });
  // }

  
}
