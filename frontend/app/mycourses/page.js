'use client'; // Ensures the component is rendered on the client-side
import React, { useState, useEffect } from 'react';
import ButtonAppBar from '../../components/app_bar';
import ImgMediaCard from '../../components/course_card';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';
import FormModal from '../../components/addtomycourse';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import axios from '../../components/axiosInstance';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [courses, setCourses] = useState([]);
  const [tempCourse, setTempCourse] = useState({
    name: '',
    code: '',
    description: '',
    credit: '',
    image: '',
  });

  // Ensure dynamic values like tokens are handled on the client-side
  useEffect(() => {
    const fetchCourses = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        router.push('/login');
        return;
      }

      try {
        const response = await axios.get('/auth/mycourses', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
        alert('Failed to load courses. Please login again.');
        router.push('/login');
      }
    };

    const token = localStorage.getItem('accessToken');
    if (token) {
      setIsAuthenticated(isValidToken(token));
    } else {
      router.push('/login');
    }

    fetchCourses();
  }, [router]);

  const isValidToken = (token) => {
    try {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const expiry = decodedToken.exp * 1000;
      return Date.now() < expiry;
    } catch (error) {
      return false;
    }
  };

  const handleFormSubmit = async (formData) => {
    if (!isAuthenticated) {
      alert('Please log in first.');
      router.push('/login');
      return;
    }

    const token = localStorage.getItem('accessToken');
    const config = { headers: { Authorization: `Bearer ${token}` } };

    try {
      const courseResponse = await axios.post('/courses/get-course-id', { code: formData.coursecode }, config);
      if (courseResponse.data?.courseId) {
        await axios.post('/auth/addcourse', { courseId: courseResponse.data.courseId }, config);
        const response = await axios.get('/auth/mycourses', config);
        setCourses(response.data);
        alert('Course added successfully!');
      } else {
        alert('Invalid course code.');
      }
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleApiError = (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('accessToken');
      setIsAuthenticated(false);
      alert('Session expired. Please log in again.');
      router.push('/login');
    }else if(error.response?.status === 400){
      alert('An error occurred. The COURSE MAY ALREADY ADDED');
    }else if(error.response?.status === 404){
      alert('An error occurred. The COURSE MAY NOT EXIST');
    }
    else {
      alert('An error occurred. Please try again.');
    }
  };

  const handleUpdate = async () => {
    if (!selectedCourse || !isAuthenticated) {
      alert('Please select a course and log in.');
      router.push('/login');
      return;
    }

    try {
      const token = localStorage.getItem('accessToken');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.put(`/courses/${selectedCourse.id}`, { code: tempCourse.code }, config);
      const response = await axios.get('/auth/mycourses', config);
      setCourses(response.data);
      setIsModalOpen(false);
    } catch (error) {
      alert('Error updating course.');
    }
  };

  const handleDelete = async () => {
    if (!selectedCourse || !isAuthenticated) {
      alert('Please select a course and log in.');
      router.push('/');
      return;
    }

    try {
      const token = localStorage.getItem('accessToken');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      console.log('Deleting course with ID:', selectedCourse.id);
      await axios.delete(`/auth/delete/${selectedCourse.id}`, config);
      
      const response = await axios.get('/auth/mycourses', config);
      setCourses(response.data);
      setIsModalOpen(false);
    } catch (error) {
      alert('Error deleting course. try logging in');
    }
  };

  const handleCardClick = (course) => {
    setSelectedCourse(course);
    setTempCourse({ ...course });
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedCourse(null);
    setTempCourse(null);
  };

  const buttonStyle = {
    position: 'fixed',
    bottom: '10px',
    right: '10px',
    zIndex: 1000,
    padding: '15px 30px',
  };

  const logout = () => {
    // Clear the token and update the authentication state
    localStorage.removeItem('accessToken');
    setIsAuthenticated(false);
    router.push('/login');
    // Optionally, redirect to login or home page
  };

  return (
    <div>
      <ButtonAppBar isAuthenticated={isAuthenticated} logout={logout} title={"My Courses"}/>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '20px',
          padding: '20px',
        }}
      >
        {courses.map((course) => (
          <ImgMediaCard
            key={course.id}
            courseName={course.name}
            courseCode={course.code}
            courseCredits={course.credit}
            image={course.image}
            onClick={() => handleCardClick(course)}
          />
        ))}
      </div>

      <Dialog open={isModalOpen} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Course Details</DialogTitle>
        <DialogContent>
          {tempCourse && (
            <>
              <TextField
                label="Course Name"
                fullWidth
                margin="normal"
                value={tempCourse.name}
                onChange={(e) => setTempCourse({ ...tempCourse, name: e.target.value })}
              />
              <TextField
                label="Course Code"
                fullWidth
                margin="normal"
                value={tempCourse.code}
                onChange={(e) => setTempCourse({ ...tempCourse, code: e.target.value })}
              />
              <TextField
                label="Credits"
                fullWidth
                margin="normal"
                value={tempCourse.credit}
                onChange={(e) => setTempCourse({ ...tempCourse, credit: e.target.value })}
              />
              <TextField
                label="Image URL"
                fullWidth
                margin="normal"
                value={tempCourse.image}
                onChange={(e) => setTempCourse({ ...tempCourse, image: e.target.value })}
              />
              <TextareaAutosize
                minRows={4}
                maxRows={6}
                placeholder="Enter Description"
                style={{ width: '100%', padding: '10px', resize: 'both', overflowY: 'auto' }}
                value={tempCourse.description}
                onChange={(e) => setTempCourse({ ...tempCourse, description: e.target.value })}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          <Button color="error" variant="contained" onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Button variant="contained" style={buttonStyle} onClick={() => setModalOpen(true)}>
        Add to MyCourses
      </Button>
      <FormModal open={modalOpen} handleClose={() => setModalOpen(false)} onSubmit={handleFormSubmit} />
    </div>
  );
}
