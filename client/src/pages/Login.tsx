import React, { useState } from 'react';
import { TextField, Button, Typography, Container, useTheme, Box, Link } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { Link as RouterLink } from 'react-router-dom';

interface FormData {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ email: '', password: '' });
  const [error, setError] = useState<string>('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (formData.email === '' || formData.password === '') {
      setError('Lütfen tüm alanları doldurun.');
    }
    else if (formData.password.length < 6) {
        setError('Şifre en az 6 karakter olmalıdır.');
        return;
    }
    else {
      setError('');
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
    <Container maxWidth="xs" style={{ marginTop: '120px' }}>
      <Box
      sx={{
          padding: 3,
          border: '1px solid #ccc',
          borderRadius: 4,
        }}
      >
      <Typography variant="h4" align="center" mb={2}>Login</Typography>

      {error && <Typography color="error" align='left' mb={2}>{error}</Typography>}

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

        <Button 
          sx={{ display: 'flex', width: '47%' }}
          variant="contained" 
          color="primary" 
          type="submit"
          startIcon={<LoginIcon />}
        >
          Login
        </Button>
        <Box sx={{ marginTop: 2 }}>
          <Link component={RouterLink} to="/register" variant="body2">
          Don't have an account? Register.
          </Link>
        </Box>
      </form>
      </Box>
    </Container>
  );
};

export default LoginForm;