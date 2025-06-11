// src/components/UserForm.jsx
import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Typography,
  Paper,
} from '@mui/material';

const roles = ['Admin', 'Editor', 'Viewer'];
const statuses = ['Active', 'Inactive'];

const UserForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    status: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.role) newErrors.role = 'Role is required';
    if (!formData.status) newErrors.status = 'Status is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', role: '', status: '' });
    setErrors({});
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', role: '', status: '' });
    setErrors({});
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 500, mx: 'auto', mt: 6 }}>
      <Typography variant="h5" gutterBottom>
        User Management Form
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={!!errors.name}
          helperText={errors.name}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          select
          label="Role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          error={!!errors.role}
          helperText={errors.role}
          sx={{ mb: 2 }}
        >
          {roles.map((role) => (
            <MenuItem key={role} value={role}>
              {role}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          fullWidth
          select
          label="Status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          error={!!errors.status}
          helperText={errors.status}
          sx={{ mb: 3 }}
        >
          {statuses.map((status) => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </TextField>

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
          <Button onClick={handleReset} variant="outlined" color="secondary">
            Reset
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default UserForm;
