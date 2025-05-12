import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { validationResult } from 'express-validator';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '15m';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string;
const REFRESH_TOKEN_EXPIRATION = process.env.REFRESH_TOKEN_EXPIRATION || '7d';



export const register = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { username, password } = req.body;

  try {
    console.log('Login attempt for user:', username);
    const user = await User.findOne({ where: { username } });
    if (!user) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }
    console.log('User found in DB:', user); // Should show the user record


    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }
    console.log('Password match:', isMatch); // Should be true


    const { accessToken, refreshToken } = generateTokens(user.id);
    console.log('Tokens generated:', { accessToken, refreshToken }); // Should show tokens

    
    res.json({ accessToken, refreshToken });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie('refreshToken');
  res.json({ message: 'Logged out successfully' });
};

export const refreshToken = (req: Request, res: Response): void => {
  const { token } = req.body;

  if (!token) {
    res.status(401).json({ message: 'No token provided' });
    return;
  }

  try {
    const decoded = jwt.verify(token, REFRESH_TOKEN_SECRET) as { userId: number };
    const { accessToken, refreshToken } = generateTokens(decoded.userId);

    res.json({ accessToken, refreshToken });
  } catch (error) {
    res.status(403).json({ message: 'Invalid refresh token' });
  }
};

export const generateTokens = (userId: number) => {
  const accessToken = jwt.sign(
    { userId },
    JWT_SECRET, 
    { expiresIn: '15m' } as jwt.SignOptions 
  );

  const refreshToken = jwt.sign(
    { userId },
    REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' } as jwt.SignOptions
  );

  return { accessToken, refreshToken };
};