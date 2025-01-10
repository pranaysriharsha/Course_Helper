import { queryDb } from '../db/db.js'; // Import the queryDb function from db.js

// Controller to get all courses
export const getAllCourses = async (req, res) => {
    try {
        const courses = await queryDb('SELECT * FROM my_schema.courses');
        res.status(200).json(courses); // Respond with the list of courses
    } catch (err) {
        console.error('Error getting courses:', err);
        res.status(500).json({ error: 'Failed to retrieve courses' });
    }
};

// Controller to create a new course
export const createCourse = async (req, res) => {
    const { name, code, description, credit, image } = req.body;
    console.log(req.body);

    try {
        const newCourse = await queryDb(
            `INSERT INTO my_schema.courses (name, code, description, credit, image)
             VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [name, code, description, credit, image] // Parameters for the query
        );
        res.status(201).json(newCourse[0]); // Respond with the newly created course
    } catch (err) {
        console.error('Error creating course:', err);
        res.status(500).json({ error: 'Failed to create course' });
    }
};

// Controller to get a course by ID
export const getCourseById = async (req, res) => {
    const { id } = req.params;

    try {
        const course = await queryDb(
            'SELECT * FROM my_schema.courses WHERE id = $1',
            [id] // Parameter for the query
        );
        if (course.length === 0) {
            return res.status(404).json({ error: 'Course not found' });
        }
        res.status(200).json(course[0]); // Respond with the course details
    } catch (err) {
        console.error('Error getting course by ID:', err);
        res.status(500).json({ error: 'Failed to retrieve course' });
    }
};

// Controller to update a course
export const updateCourse = async (req, res) => {
    const { id } = req.params;
    const { name, code, description, credit, image } = req.body;

    try {
        const updatedCourse = await queryDb(
            `UPDATE my_schema.courses
             SET name = $1, code = $2, description = $3, credit = $4, image = $5
             WHERE id = $6 RETURNING *`,
            [name, code, description, credit, image, id] // Parameters for the query
        );
        if (updatedCourse.length === 0) {
            return res.status(404).json({ error: 'Course not found' });
        }
        res.status(200).json(updatedCourse[0]); // Respond with the updated course
    } catch (err) {
        console.error('Error updating course:', err);
        res.status(500).json({ error: 'Failed to update course' });
    }
};

// Controller to delete a course
export const deleteCourse = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedCourse = await queryDb(
            'DELETE FROM my_schema.courses WHERE id = $1 RETURNING *',
            [id] // Parameter for the query
        );
        if (deletedCourse.length === 0) {
            return res.status(404).json({ error: 'Course not found' });
        }
        res.status(200).json({ message: 'Course deleted successfully' });
    } catch (err) {
        console.error('Error deleting course:', err);
        res.status(500).json({ error: 'Failed to delete course' });
    }
};
export const getCourseId= async (req,res) =>{
    const {code} = req.body;
    try {
    // Query to fetch course_id based on coursecode
    const query = `
      SELECT id FROM my_schema.courses WHERE code = $1
    `;

    // Execute the query to get the course_id
    const result = await queryDb(query, [code]);

    if (result.length === 0) {
      // If no course found with the provided code
      return res.status(404).json({ message: 'Course not found' });
    }

    const courseId = result[0].id; // Extract the course_id from the result

    // Send the course_id as the response
    res.json({ courseId });

  } catch (error) {
    console.error('Error fetching course:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
