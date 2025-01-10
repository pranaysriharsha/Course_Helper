import express from "express";
import coursesRoutes from './routes/coursesRoutes.js';
import { connectDb } from './db/db.js'; // Import connectDb
import dotenv from 'dotenv';
import path from 'path'; 
import { fileURLToPath } from 'url';
import cors from 'cors';
import { dirname } from 'path';
import authRoutes from './routes/authRoutes.js';

// Get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Specify the path to the .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const port = 3000;
app.use(cors());

app.use(express.json()); // Parse JSON bodies
app.use('', coursesRoutes); // Prefix routes with /api
app.use('/auth', authRoutes);



// Self-invoking async function for initialization
(async () => {
    
    try {
        await connectDb(); // Establish the database connection
        console.log('Database connected successfully');

        // Start the server
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    } catch (err) {
        console.error('Failed to connect to the database:', err);
        process.exit(1); // Exit the application if the database connection fails
    }
})();
