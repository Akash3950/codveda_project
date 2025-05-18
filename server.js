import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './src/config/db.js';
import authRoutes from './src/routes/auth.js';
import { protect, authorize } from './src/middleware/autherization.js';

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);

// Protected Route Example
app.get('/api/admin', protect, authorize('admin'), (req, res) => {
  res.json({ message: `Welcome Admin ${req.user.id}` });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));