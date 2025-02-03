import { Request, Response } from 'express';

export const getData = (req: Request, res: Response) => {
  res.json({ message: 'Data from controller!' });
};