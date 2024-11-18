import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <Box sx={{overflow: 'hidden'}}> 
      <AppBar position="sticky" color="primary">
        <Toolbar>
        <Button color="inherit" component={RouterLink} to="/">Blog</Button>
          <Typography sx={{ flexGrow: 1 }}>
          </Typography>
          <Button color="inherit" component={RouterLink} to="/login">Login</Button>
          <Button color="inherit" component={RouterLink} to="/register">Register</Button>
        </Toolbar>
      </AppBar>
    </Box> 
  );
};

export default Navbar;