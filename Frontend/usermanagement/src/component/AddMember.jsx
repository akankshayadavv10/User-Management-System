import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";

const AddMember = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Normally you'd send this to backend using Axios
    console.log("New Member Data:", formData);

    setSuccess(true);
    setFormData({ name: "", email: "", contact: "" });
  };

  return (
    <Paper sx={{ maxWidth: 500, mx: "auto", mt: 6, p: 4 }}>
      <Typography variant="h5" gutterBottom>
        Add New Member
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          sx={{ mb: 2 }}
          required
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          sx={{ mb: 2 }}
          required
        />
        <TextField
          fullWidth
          label="Contact Number"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          sx={{ mb: 3 }}
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Add Member
        </Button>
      </Box>

      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={() => setSuccess(false)}
      >
        <Alert severity="success" onClose={() => setSuccess(false)}>
          Member added successfully!
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default AddMember;
