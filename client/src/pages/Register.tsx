import React, { useState } from 'react';
import { Button, TextField, Box, Link, Container, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const { email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setError('');
    console.log('Registering with:', { email, password });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          padding: 3,
          border: '1px solid #ccc',
          borderRadius: 4,
        }}
      >
        <Typography variant="h5" mb={2}>
          Register
        </Typography>
        
        {error && <Typography color="error" align="center" mb={2}>{error}</Typography>}
    
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
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

        {/* Login sayfasına yönlendiren link */}
        <Box>
          <Link component={RouterLink} to="/login" variant="body2">
            Already have an account? Login
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterForm;