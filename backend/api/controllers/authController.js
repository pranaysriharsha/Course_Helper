import bcrypt from 'bcryptjs';
import { queryDb } from '../db/db.js';  // Import queryDb function for database queries
import jwt from 'jsonwebtoken';

// Helper to generate access token (with id and username)
const generateAccessToken = (userId, username) => {
    return jwt.sign({ id: userId, username: username }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
    });
};

// Helper to generate refresh token (with id and username)
const generateRefreshToken = (userId, username) => {
    return jwt.sign({ id: userId, username: username }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
    });
};

// Register new user (store in DB)
export const register = async (req, res) => {
    const { username, password } = req.body;

    if (!username || username.trim() === '') {
        return res.status(400).json({ message: 'Username is required' });
    }
    if (!password || password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    try {
        // Check if the user already exists
        const existingUser = await queryDb('SELECT * FROM my_schema.users WHERE username = $1', [username]);
        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new user into the database
        const result = await queryDb(
            'INSERT INTO my_schema.users (username, password) VALUES ($1, $2) RETURNING id',
            [username, hashedPassword]
        );

        const userId = result[0].id; // Get the newly inserted user ID
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error('Error registering user:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Login user and return access and refresh tokens
export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Get the user from the database
        const user = await queryDb('SELECT * FROM my_schema.users WHERE username = $1', [username]);
        if (user.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Compare the password with the stored hash
        const isMatch = await bcrypt.compare(password, user[0].password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const userId = user[0].id;  // Get the user ID from the database
        const usernameFromDb = user[0].username;  // Get the username from the database

        // Generate tokens
        const accessToken = generateAccessToken(userId, usernameFromDb);
        const refreshToken = generateRefreshToken(userId, usernameFromDb);

        // Send refresh token as HTTP-only cookie
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',  // Set to true in production
            sameSite: 'Strict',
        });

        res.json({ accessToken });  // Send the access token to the client
    } catch (err) {
        console.error('Error logging in user:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Refresh access token using refresh token
export const refreshToken = (req, res) => {
    const cookieHeader = req.headers['cookie'];  // Get the cookie header
    let refreshToken = null;

    if (cookieHeader) {
        // Split the cookies by ';' and find the refreshToken cookie
        const cookies = cookieHeader.split(';');
        cookies.forEach(cookie => {
            const [name, value] = cookie.trim().split('=');
            if (name === 'refreshToken') {
                refreshToken = value;
            }
        });
    }
    if (!refreshToken) {
        return res.status(401).json({ message: 'No refresh token found' });
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const newAccessToken = generateAccessToken(decoded.id, decoded.username);  // Generate new access token with both id and username
        res.json({ accessToken: newAccessToken });
    } catch (error) {
        res.status(403).json({ message: 'Invalid or expired refresh token' });
    }
};

export const getUserCourses = async (req, res) => {
    const userId = req.user.id; // Extracted from token using middleware

    try {
        // Fetch courses for the given user_id
        const query = `
            SELECT c.id, c.name, c.code, c.credit, c.description, c.image 
            FROM my_schema.user_courses uc
            INNER JOIN my_schema.courses c ON uc.course_id = c.id
            WHERE uc.user_id = $1
        `;

        const result = await queryDb(query, [userId]);
        res.status(200).json(result);
       // Return the courses as JSON
    } catch (err) {
        console.error('Error fetching user courses:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const addCourse = async (req, res) => {
    const userId = req.user.id; // Extracted from token by middleware
    const { courseId } = req.body;

    try {
        // Validate if the course exists
        const course = await queryDb('SELECT * FROM my_schema.courses WHERE id = $1', [courseId]);
        if (course.length === 0) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Check if the user is already enrolled in the course
        const existingEntry = await queryDb(
            'SELECT * FROM my_schema.user_courses WHERE user_id = $1 AND course_id = $2',
            [userId, courseId]
        );
        if (existingEntry.length > 0) {
            return res.status(400).json({ message: 'User already enrolled in this course' });
        }

        // Add the course to the user_courses table
        await queryDb('INSERT INTO my_schema.user_courses (user_id, course_id) VALUES ($1, $2)', [userId, courseId]);

        res.status(201).json({ message: 'Course added successfully' });
    } catch (err) {
        console.error('Error adding course:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const deleteMyCourse =async (req,res)=>{
    const {CourseId}=req.params;
    const UserId=req.user.id;
    console.log(UserId);
    try {
        // SQL query to delete the course from the user_courses table
        const query = 'DELETE FROM my_schema.user_courses WHERE user_id = $1 AND course_id = $2 RETURNING *';
        const values = [UserId, CourseId];
    
        const result = await queryDb(query, values);
        console.log(result.length);
        if (result.length === 0) {
          
          res.status(404).json({ error: 'No matching record found.' });
        } else {
            res.status(200).json({ message: 'Course removed successfully.' });
        }
      } catch (error) {
        console.error('Error removing course:', error);
        res.status(500).json({ error: 'Internal server error.' });
      }
};
