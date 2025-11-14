import express from 'express';
import dotenv from 'dotenv';
import connectDb from './config/db.js';
import { createClient } from 'redis';
import userRoutes from './routes/user.js';
import { connectRabbitMQ } from './config/rabbitmq.js';
import cors from 'cors';
dotenv.config();
// Connect to MongoDB
connectDb();
// Connect to RabbitMQ
connectRabbitMQ();
// Redis setup
const redisUrl = process.env.REDIS_URI || "redis://localhost:6379";
export const redisClient = createClient({
    url: redisUrl,
    socket: {
        reconnectStrategy: retries => {
            console.log(`Redis reconnect attempt #${retries}`);
            return Math.min(retries * 50, 2000);
        }
    }
});
// Handle Redis events
redisClient.on('error', (err) => console.error('Redis Client Error:', err));
redisClient.on('connect', () => console.log('Redis connecting...'));
redisClient.on('ready', () => console.log('Connected to Redis'));
redisClient.on('end', () => console.log('Redis connection closed'));
// Connect to Redis
await redisClient.connect().catch(err => console.error('Redis connection failed:', err));
// Express setup
const app = express();
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000", // or your Vite port if 5173
    credentials: true, // allow cookies + authorization header
}));
app.use('/api/v1', userRoutes);
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
//# sourceMappingURL=index.js.map