import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './src/routes/authRoutes';
import userRoutes from './src/routes/userRoutes';
import router from './src/routes/balanceRoutes';
import balanceRoutes from './src/routes/balanceRoutes';
import cors from 'cors';


const app = express();
const PORT = 8000;


mongoose.connect('mongodb://localhost:27017/balance');
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use(express.json());
app.use(cors());
app.use(router);
app.use('/api',balanceRoutes);
app.use('/auth', authRoutes);
app.use('/user', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default router;