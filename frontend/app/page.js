
'use client'; // This ensures the component is rendered on the client-side
import React, { useState, useEffect } from 'react';
import ButtonAppBar from '../components/app_bar';
import ImgMediaCard from '../components/course_card';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';
import FormModal from '../components/add_course_dlg';
//import courses from '../components/courses';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import axios from '../components/axiosInstance';
import { useRouter } from 'next/navigation'; // Corrected import for useRouter
import dynamic from 'next/dynamic';

const  Home=()=> {
  const router = useRouter();
  const [selectedCourse, setSelectedCourse] = useState(null); // For storing selected course
  const [isModalOpen, setIsModalOpen] = useState(false); // For modal visibility
  const [modalOpen, setModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State for tracking authentication
  const [courses, setCourses] = useState([]);
  const [tempCourse, setTempCourse] = useState({
    name: '',
    code: '',
    description: '',
    credit: '',
    image: '',
  });
  

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('/courses'); // Fetch courses from the backend
        setCourses(response.data); // Set the courses to state
      } catch (error) {
        console.error('Error fetching courses:', error);
        alert('Failed to load courses. Please try again.');
      }
    };

    fetchCourses();
  }, []);

  // Check token validity on app load
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token && isValidToken(token)) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const isValidToken = (token) => {
    try {
      const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode JWT token to get expiration data
      const expiry = decodedToken.exp * 1000; // Convert to milliseconds
      return Date.now() < expiry; // Check if token is expired
    } catch (error) {
      return false; // Invalid token
    }
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleFormSubmit = async (formData) => {
    console.log('Form Submitted:', formData);

    if (isAuthenticated) {
      // Get the token from localStorage
      const token = localStorage.getItem('accessToken');

      // Set the Authorization header with the token
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const info = {
        name: formData.courseName,
        code: formData.coursecode,
        description: formData.description,
        credit: formData.credits,
        image: formData.imageurl,
      };

      try {
        // Make the API call (replace '/api/submit' with your actual API endpoint)
        const response = await axios.post('/courses', info, config);
        console.log('Form submission successful:', response.data);
        const resp = await axios.get('/courses');
        setCourses(resp.data);
        // Handle success (e.g., show a success message or redirect)
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.error('Token expired or invalid:', error);
          // Clear the token and update the authentication state
          localStorage.removeItem('accessToken');
          setIsAuthenticated(false);
          router.push('/login');
          // Optionally, redirect the user to login or show a message
          alert('Your session has expired. Please log in again.');
        }
        // Handle validation or other errors (e.g., duplicate course submission)
        else if (error.response && error.response.status === 400) {
          console.error('Invalid data submitted:', error);
          alert('Invalid data. Course with the same code may already exists. Please check your data.');
        }else if (error.response && error.response.status === 500) {
          console.error('Invalid data submitted:', error);
          alert('Invalid data. Course with the same code may already exists. Please check your data.');
        } 
         else {
          console.error('Error submitting form:', error);
          // Handle other errors
          alert('Something went wrong. Please try again.');
        }
      }
    } else {
      console.log('User is not authenticated');
      alert('Try logging in');
      router.push('/login');
      // Optionally, redirect the user to login or show a message
    }
  };

  const handleUpdate = async () => {
    if (selectedCourse) {
      if(isAuthenticated){
        try {
          const token = localStorage.getItem('accessToken');
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
  
          const updatedCourse = {
            name: tempCourse.name,
            code: tempCourse.code,
            description: tempCourse.description,
            credit: tempCourse.credit,
            image: tempCourse.image,
          };
  
          const response = await axios.put(`/courses/${selectedCourse.id}`, updatedCourse, config);
          console.log('Course updated successfully:', response.data);
          setIsModalOpen(false);
          const resp = await axios.get('/courses');
          setCourses(resp.data);
          // Optionally, update the courses list or refresh the page
        } catch (error) {
          console.error('Error updating course:', error);
          alert('Error updating course. Please try again.');
        }
      }else{
        console.log('User is not authenticated');
        alert('Try logging in');
        router.push('/login');
      }
    }
  };

  // Handle course delete
  const handleDelete = async () => {
    if (selectedCourse) {

      if(isAuthenticated){
        try {
          const token = localStorage.getItem('accessToken');
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
  
          const response = await axios.delete(`/courses/${selectedCourse.id}`, config);
          console.log('Course deleted successfully:', response.data);
          setIsModalOpen(false);
          // Optionally, remove the deleted course from the list or refresh the page
          const resp = await axios.get('/courses');
          setCourses(resp.data);
        } catch (error) {
          console.error('Error deleting course:', error);
          alert('Error deleting course. Please try again.');
        }
      }else{
        console.log('User is not authenticated');
        alert('Try logging in');
        router.push('/login');
      }
    }
  };


  

  // Function to handle card click
  const handleCardClick = (course) => {
    setSelectedCourse(course); // Set the clicked course
    setTempCourse({ ...course });
    setIsModalOpen(true); // Open the modal
  };

  const handleTempCourseChange = (field, value) => {
    setTempCourse((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Function to close modal
  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedCourse(null);
    setTempCourse(null);
  };

  const logout = () => {
    // Clear the token and update the authentication state
    localStorage.removeItem('accessToken');
    setIsAuthenticated(false);
    // Optionally, redirect to login or home page
  };

  const buttonStyle = {
    position: 'fixed',
    bottom: '10px',
    right: '10px',
    zIndex: 1000,
    padding: '15px 30px',
  };

  return (
    <div>
      <ButtonAppBar isAuthenticated={isAuthenticated} 
        logout={logout}  title={"Course-Helper"}/>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '20px',
          padding: '20px',
        }}
      >
        {courses.map((course, index) => (
          <ImgMediaCard
            key={index}
            courseName={course.name}
            courseCode={course.code}
            courseCredits={course.credit}
            image={course.image}
            onClick={() => handleCardClick(course)} // Handle card click
          />
        ))}
      </div>

      {/* Modal for editing course */}
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
          onChange={(e) => handleTempCourseChange('name', e.target.value)}
        />

        <TextField
          label="Course Code"
          fullWidth
          margin="normal"
          value={tempCourse.code}
          onChange={(e) => handleTempCourseChange('code', e.target.value)}
        />
        <TextField
          label="Credits"
          fullWidth
          margin="normal"
          value={tempCourse.credit}
          onChange={(e) => handleTempCourseChange('credit', e.target.value)}
        />
        <TextField
          label="Image URL"
          fullWidth
          margin="normal"
          value={tempCourse.image}
          onChange={(e) => handleTempCourseChange('image', e.target.value)}
        />

        <TextareaAutosize
          minRows={4}
          maxRows={6}
          placeholder="Enter Description"
          style={{
            width: '100%',
            padding: '10px',
            resize: 'both',
            overflowY: 'auto', // Enables vertical scrolling
          }}
          value={tempCourse.description}
          onChange={(e) => handleTempCourseChange('description', e.target.value)}
        />
      </>
    )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          <Button color="secondary" variant="contained" onClick={handleUpdate}>
            Update
          </Button>
          <Button color="error" variant="contained" onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Button variant="contained" style={buttonStyle} onClick={handleOpenModal}>
        Add Course
      </Button>

      <FormModal open={modalOpen} handleClose={handleCloseModal} onSubmit={handleFormSubmit} />
    </div>
  );
}

export default dynamic (()=> Promise.resolve(Home), {ssr:false});