import React, { useState } from 'react';
import { TextField, Button, Typography, Container, useTheme, Box, Link } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


interface FormData {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ email: '', password: '' });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (formData.email === '' || formData.password === '') {
      setError('Please make sure all fields are filled in correctly.');
    }
    else if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    else {
      setError('');
    }
    try {
      const response = await axios.post('http://localhost:8080/auth/login', formData, {
        withCredentials: true,
      });
      console.log('Response:', response.data);
      setSuccess(true);
    } catch (err: any) {
      console.error('Error:', err.response || err.message);
      setError(err.response?.data?.message || 'Invalid email or password.');
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    if ((name === 'email' && value.length == 0) || (name === 'password'  && value.length == 0)){
        setError('Please make sure all fields are filled in correctly.');
    }
    else if (name === 'password' && value.length < 6) {
        setError('Password must be at least 6 characters long.');
    } 
    else {
        setError('');
    }
  };

  const theme = useTheme();

  return (
  <div>
    <Navbar/>
      <Container maxWidth="xs" style={{ marginTop: '120px', overflow: 'hidden' }}>
        <Box
          sx={{
            padding: 3,
            border: '1px solid #ccc',
            borderRadius: 4,
          }}
        >
        <Typography  sx={{ overflow: 'hidden'}} variant="h4" align="center" mb={2}>Login</Typography>

        {error && <Typography sx={{ overflow: 'hidden'}} color="error" align='left' mb={2}>{error}</Typography>}

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
            label="Password"
            variant="outlined"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            required
          />

          <Button 
            sx={{ display: 'flex', width: '47%', overflow: 'hidden'}}
            variant="contained" 
            color="primary" 
            type="submit"
            startIcon={<LoginIcon />}
          >
            Login
          </Button>
          <Box sx={{}}>
            <Link component={RouterLink} to="/register" variant="body2">
            Don't have an account? Register.
            </Link>
          </Box>
        </form>
        </Box>
      </Container>
    <Footer/>
  </div>  
  );
};

export default LoginForm;