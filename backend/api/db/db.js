
import pg from 'pg';  // Import the 'pg' package
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import path from 'path';
import dotenv from 'dotenv';

// Specify the path to the .env file
dotenv.config({ path: path.resolve(__dirname, '../../.env') });


const { Client } = pg;  // Destructure Client from 'pg'

// Create a new client instance for managing a single database connection
const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,     // Access port from .env
});

// Function to connect to the database and test the connection
const connectDb = async () => {
    
    try {
        await client.connect();  // Connect to the database
        console.log('Connected to the database');
    } catch (err) {
        console.error('Database connection error:', err.stack);
    }
};

// Function to execute queries
const queryDb = async (queryText, params) => {
    try {
        const result = await client.query(queryText, params);  // Execute the query
        return result.rows;  // Return the rows from the query result
    } catch (err) {
        console.error('Error executing query:', err.stack);
        throw err;  // Re-throw the error for handling elsewhere
    }
};

// Export the client for use in other files
export { connectDb, queryDb };
