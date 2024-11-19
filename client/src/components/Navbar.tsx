import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Navbar: React.FC = () => {

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <Box sx={{overflow: 'hidden'}}> 
      <AppBar position="sticky" color="primary" sx={{minHeight:'64px'}}>
        <Toolbar sx={{minHeight:'64px'}}>
        <Button color="inherit" component={RouterLink} to="/" sx={{"&:hover":{scale:1.07}, transition:'scale 0.15s linear'}}>Blog</Button>
          <Typography sx={{ flexGrow: 1 }}>
          </Typography>
            <Box sx={{display:{sm:'flex', xs:'none'}}}>
              <Button color="inherit" component={RouterLink} to="/login" sx={{"&:hover":{scale:1.07}, transition:'scale 0.15s linear'}}>Login</Button>
              <Button color="inherit" component={RouterLink} to="/register" sx={{"&:hover":{scale:1.07}, transition:'scale 0.15s linear'}}>Register</Button>
            </Box>
            <Box sx={{display:{sm:'none', xs:'block'}}}>
              <Button color="inherit" variant="text" sx={{minWidth:'', width:'48px', height:'48px', padding:'0', "&:hover":{scale:1.07}, transition:'scale 0.15s linear'}} onClick={toggleMenu} >
              <AccountCircleIcon sx={{fontSize:'32px'}}/>
              </Button>
            </Box>
        </Toolbar>
      </AppBar>
      {/* {menuOpen && <Box sx={{ padding: 1, backgroundColor: 'lightgray' }}></Box>} */}
    </Box>
  );
};

export default Navbar;