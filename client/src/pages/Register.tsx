import React, { useState } from 'react';
import { Button, TextField, Box, Link, Container, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
    if (event.target.name === 'password' && event.target.value.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    else {
      setError('');
  }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const { email, username, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    else{
      setError('');
    }

    try {
      const response = await axios.post('http://localhost:8080/auth/register', {
        email,
        password,
        username,
      });
      console.log('Response:', response.data);
      setSuccess(true);
    } catch (err: any) {
      console.error('Error:', err.response || err.message);
      setError(err.response?.data?.message || 'An error occurred while registering');
    }
  };

  return (
  <div>
    <Navbar/>
      <Container maxWidth="xs" style={{ marginTop: '60px', overflow:'hidden' }}>
        <Box
          sx={{
            padding: 3,
            border: '1px solid #ccc',
            borderRadius: 4,
            overflow:'hidden'
          }}
        >
          <Typography variant="h4" align="center" mb={2}>
            Register
          </Typography>
          
          {error && <Typography  sx={{ overflow: 'hidden'}} color="error" align="left" mb={2}>{error}</Typography>}
      
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px'}}>
            <TextField
              label="Email"
              variant="outlined"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
                label="Username"
                variant="outlined"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                fullWidth
                required
            />
            <TextField
                label="Password"
                variant="outlined"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                fullWidth
                required
            />
            <TextField
              label="Confirm Password"
              variant="outlined"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              fullWidth
              required
            />
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginBottom: 2 }}>
              Register
            </Button>
          </form>
          <Box>
            <Link component={RouterLink} to="/login" variant="body2">
              Already have an account?
            </Link>
          </Box>
        </Box>
      </Container>
    <Footer/>  
  </div>  
  );
};

export default RegisterForm;