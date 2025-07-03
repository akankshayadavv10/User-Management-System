import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Snackbar,
  Alert,
  MenuItem,
  Grid,
} from "@mui/material";
import axios from "axios";

const AddMember = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    email: "",
    phone: "",
    alternate_phone: "",
    gender: "",
    address: "",
    password: "",
    idproofurl: null,
    addressproofurl: null,
    formurl: null,
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      // Replace with your backend endpoint
      await axios.post("http://localhost:5000/api/members", data);

      setSuccess(true);
      setFormData({
        first_name: "",
        middle_name: "",
        last_name: "",
        email: "",
        phone: "",
        alternate_phone: "",
        gender: "",
        address: "",
        password: "",
        idproofurl: null,
        addressproofurl: null,
        formurl: null,
      });
    } catch (err) {
      console.error(err);
      setError("Failed to add member. Please try again.");
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        maxWidth: 900, // Wider form
        mx: "auto", // Center horizontally
        mt: 6,
        px: 2, // Left/Right padding
        py: 2, // Top/Bottom padding
      }}
    >
      <Typography variant="h5" gutterBottom>
        Add New Member
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        {/* Row 1: First Name, Middle Name,Last Name*/}
        <Grid container spacing={12}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="First Name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Middle Name"
              name="middle_name"
              value={formData.middle_name}
              onChange={handleChange}
              type="email"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Last Name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
          </Grid>
        </Grid>

        {/* Row 2: Phone, Alternate Phone */}
        <Grid container spacing={12} mt={1}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Alternate Phone"
              name="alternate_phone"
              value={formData.alternate_phone}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6} width={"23.5%"}>
            <TextField
              select
              fullWidth
              label="Gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </TextField>
          </Grid>
        </Grid>

        {/* Row 3: DOB, Gender */}
        <Grid container spacing={12} mt={1}>
          <Grid item sx={12}>
            <TextField
              fullWidth
              name="email"
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={formData.adress}
              onChange={handleChange}
              required
            />
          </Grid>
        </Grid>

        {/* Row 5: File Uploads - all 3 evenly spread */}
        <Grid container spacing={1.5} mt={1}>
          <Grid item xs={12} sm={6}>
            <Button variant="outlined" component="label" fullWidth>
              Upload ID Proof
              <input
                hidden
                type="file"
                name="idproofurl"
                onChange={handleChange}
                required
              />
            </Button>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button variant="outlined" component="label" fullWidth>
              Upload Address Proof
              <input
                hidden
                type="file"
                name="addressproofurl"
                onChange={handleChange}
                required
              />
            </Button>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button variant="outlined" component="label" fullWidth>
              Upload Form
              <input
                hidden
                type="file"
                name="formurl"
                onChange={handleChange}
                required
              />
            </Button>
          </Grid>
        </Grid>

        {/* Final Row: Password + Add Member Button */}
        <Grid container spacing={12} mt={2} alignItems="center">
          <Grid item xs={12} sm={8}>
            <TextField
              fullWidth
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
              required
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ width: "205px" }}
            >
              Add Member
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default AddMember;
