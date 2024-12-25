'use client';

import React, { useState } from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';
import TextareaAutosize from '@mui/material/TextareaAutosize';
export default function FormModal({ open, handleClose, onSubmit }) {
  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: 'white',
    padding: '20px',
    boxShadow: 24,
    borderRadius: '8px',
  };

  const [formValues, setFormValues] = useState({
    courseName: '',
    description: '',
    coursecode: '',
    credits:'',
    imageurl:'',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = () => {
    onSubmit(formValues); // Pass the form values to the parent component
    setFormValues({ courseName: '', description: '', coursecode: '',credits:'',imageurl:'' }); // Reset the form
    handleClose(); // Close the modal
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <h2>Add New Course</h2>
        <TextField
          fullWidth
          margin="normal"
          label="Course Name"
          name="courseName"
          value={formValues.courseName}
          onChange={handleChange}
        />

        <TextareaAutosize
          minRows={4}
          maxRows={6}
          placeholder="Enter Description"
          label="Description"
          name="description"
          style={{
            width: '100%',
            padding: '10px',
            resize: 'both',
            overflowY: 'auto', // Enables vertical scrolling
          }}
          //defaultValue={selectedCourse.description}
          value={formValues.description}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Course code"
          name="coursecode"
          value={formValues.coursecode}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Course Credits"
          name="credits"
          value={formValues.credits}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Image URL"
          name="imageurl"
          value={formValues.imageurl}
          onChange={handleChange}
        />

        <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="contained" color="primary" onClick={handleClose}>
            Close
          </Button>
          
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
