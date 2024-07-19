import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js';
import connectMongoDB from './db/connectMongoDB.js';
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); //to parse the request body as a JSON object
app.use(express.urlencoded({ extended: true })); //to parse from data(urlencoded)
app.use(cookieParser())

app.use('/api/auth', authRoutes);

connectMongoDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(error => {
    console.error("Failed to connect to MongoDB:", error);
});
