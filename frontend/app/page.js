
'use client';
import React, { useState } from 'react';
import ButtonAppBar from '../components/app_bar';
import ImgMediaCard from '../components/course_card';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';
import FormModal from '../components/add_course_dlg';
import courses from '../components/courses';
import TextareaAutosize from '@mui/material/TextareaAutosize';
export default function Home() {
  const [selectedCourse, setSelectedCourse] = useState(null); // For storing selected course
  const [isModalOpen, setIsModalOpen] = useState(false); // For modal visibility
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleFormSubmit = (formData) => {
    console.log('Form Submitted:', formData);
    // Handle the form submission logic here (e.g., API call)
  };


  // Function to handle card click
  const handleCardClick = (course) => {
    setSelectedCourse(course); // Set the clicked course
    setIsModalOpen(true); // Open the modal
  };

  // Function to close modal
  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedCourse(null);
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
      <ButtonAppBar />
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
            courseName={course.courseName}
            courseCode={course.courseCode}
            courseCredits={course.courseCredits}
            image={course.image}
            onClick={() => handleCardClick(course)} // Handle card click
          />
        ))}
      </div>

      {/* Modal for editing course */}
      <Dialog open={isModalOpen} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Course Details</DialogTitle>
        <DialogContent>
          {selectedCourse && (
            <>
              <TextField
                label="Course Name"
                fullWidth
                margin="normal"
                defaultValue={selectedCourse.courseName}
              />
              <TextField
                label="Course Code"
                fullWidth
                margin="normal"
                defaultValue={selectedCourse.courseCode}
              />
              <TextField
                label="Credits"
                fullWidth
                margin="normal"
                defaultValue={selectedCourse.courseCredits}
              />
              <TextField
                label="Image URL"
                fullWidth
                margin="normal"
                defaultValue={selectedCourse.image}
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
                defaultValue={selectedCourse.description}
              /> 
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          <Button color="secondary" variant="contained">
            Update
          </Button>
          <Button color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Button variant="contained" style={buttonStyle} onClick={handleOpenModal}>Add Course</Button>
      <FormModal open={modalOpen} handleClose={handleCloseModal} onSubmit={handleFormSubmit} />
    </div>
  );
}

