import { Request, Response } from 'express';
import User from '../models/User';

export const getUserProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    // Extract user ID from the authenticated request
    const userId = (req as any).user.id;

    // Retrieve user profile from the database
    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Send user profile data
    res.status(200).json({ email: user.email });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};
