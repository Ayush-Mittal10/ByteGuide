import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connect from './config/database.js';
import authenticationRoutes from './routes/authenticationRoutes.js';
import recommendationRoutes from './routes/recommendationRoutes.js';
import planRoutes from './routes/planRoutes.js';
import scraperRoutes from './routes/scraperRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import authMiddleware from './middleware/authMiddleware.js';

dotenv.config();
connect();
const app = express();

const corsOptions = {
    origin: 'https://byteguide.onrender.com',
    credentials: true,
    optionsSuccessStatus: 200,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    preflightContinue: false,
    exposedHeaders: ['Access-Control-Allow-Origin', '*']
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

app.use('/authentication', authenticationRoutes);
app.use('/api', planRoutes);
app.use('/api/recommendations', recommendationRoutes);
app.use('/api/profiles', authMiddleware, scraperRoutes);
app.use('/api', orderRoutes);

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
