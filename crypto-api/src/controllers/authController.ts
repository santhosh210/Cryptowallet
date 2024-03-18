import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcrypt';
import { generateAccessToken, generateRefreshToken } from '../utils/generateToken';
import jwt from "jsonwebtoken"

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ email, password: hashedPassword });
    await user.save();

    // // Generate tokens
    // const accessToken = generateAccessToken(user.id);
    // const refreshToken = generateRefreshToken(user.id);
    
    // // Save the refresh token in the database (you may need a separate collection for refresh tokens)
    // user.refreshToken = refreshToken;
    // await user.save();

    // res.status(201).json({ accessToken, refreshToken });
    res.status(201).json({messgae : "Registerd sucessfully"})

  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }

    // Compare hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }

    // Generate tokens
    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);
    
    // Save the refresh token in the database (you may need a separate collection for refresh tokens)
    user.refreshToken = refreshToken;
    await user.save();

    res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

export const refreshToken = async (req: Request, res: Response): Promise<void> => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      res.status(401).json({ message: 'Refresh token is required' });
      return;
    }

    // Verify the refresh token
    const decoded = jwt.verify(refreshToken, 'your_refresh_token_secret') as { userId: string };
    const userId = decoded.userId;

    // Check if the user exists
    const user = await User.findById(userId);

    if (!user || user.refreshToken !== refreshToken) {
      res.status(401).json({ message: 'Invalid refresh token' });
      return;
    }

    // Generate new access and refresh tokens
    const newAccessToken = generateAccessToken(userId);
    const newRefreshToken = generateRefreshToken(userId);

    // Update the refresh token in the database
    user.refreshToken = newRefreshToken;
    await user.save();

    res.status(200).json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};
