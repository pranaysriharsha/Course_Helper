/*import express from 'express';
import {
    getAllCourses,
    createCourse,
    getCourseById,
    updateCourse,
    deleteCourse,
} from '../controllers/coursesControllers.js'; // Import controller functions with .js extension

const router = express.Router();

// Define routes for user-related operations
router.get('/courses', getAllCourses); // Handle GET requests to /users
router.post('/courses', createCourse); // Handle POST requests to /users
router.get('/courses/:id', getCourseById); // Handle GET requests to /users/:id
router.put('/courses/:id', updateCourse); // Handle PUT requests to /users/:id
router.delete('/courses/:id', deleteCourse); // Handle DELETE requests to /users/:id

export default router; // Export the router for use in other files*/
import express from 'express';
import {
    getAllCourses,
    createCourse,
    getCourseById,
    updateCourse,
    deleteCourse,
    getCourseId
} from '../controllers/coursesControllers.js'; // Import controller functions
import { protect } from '../middlewares/authMiddleware.js'; // Import the protect middleware

const router = express.Router();

// Define routes for course-related operations
router.get('/courses', getAllCourses); // Public route: No authentication required
router.post('/courses', protect, createCourse); // Protected route: Requires authentication
router.get('/courses/:id', getCourseById); // Public route: No authentication required
router.put('/courses/:id', protect, updateCourse); // Protected route: Requires authentication
router.delete('/courses/:id', protect, deleteCourse); // Protected route: Requires authentication
router.post('/courses/get-course-id',protect,getCourseId);
router.get('/', (req, res) => {
    res.status(200).send('Backend is running');
  });  

export default router; // Export the router for use in other files

