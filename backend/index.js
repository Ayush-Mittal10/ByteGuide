import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import recommendationRoutes from './routes/recommendationRoutes.js';
import scraperRoutes from './routes/scraperRoutes.js';
import studentRoutes from './routes/student.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/recommendations', recommendationRoutes);
app.use('/api/profiles', scraperRoutes);
app.use('/api/students', studentRoutes);

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
