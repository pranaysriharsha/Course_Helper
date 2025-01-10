import express from 'express';
import { register, login, refreshToken, addCourse, getUserCourses,deleteMyCourse } from '../controllers/authController.js';
import { protect,authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Route for user registration
router.post('/register', register);

// Route for user login, where access and refresh tokens are generated
router.post('/login', login);

// Route for refreshing the access token using the refresh token
router.post('/refresh-token', refreshToken);

router.get('/mycourses',authenticateToken,getUserCourses);

router.post('/addcourse',authenticateToken,addCourse);

router.delete('/delete/:CourseId',authenticateToken,deleteMyCourse);

// Protected route (example)
router.get('/profile', protect, (req, res) => {
    res.json({ message: 'Profile page', user: req.user });
});



export default router;
