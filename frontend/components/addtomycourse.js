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
    coursecode: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = () => {
    onSubmit(formValues); // Pass the form values to the parent component
    setFormValues({coursecode: ''}); // Reset the form
    handleClose(); // Close the modal
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <h2>Add New Course</h2>

        
        <TextField
          fullWidth
          margin="normal"
          label="Course code"
          name="coursecode"
          value={formValues.coursecode}
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
