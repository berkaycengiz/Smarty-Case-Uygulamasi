import React, { useState, useEffect} from 'react';
import { AppBar, Toolbar, Typography, Button, Box, useMediaQuery } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from 'axios';

const Navbar: React.FC = () => {

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:8080/auth/logout', {}, {
        withCredentials: true,
      });
      console.log('Logout successful:', response.data);
    } 
    catch (err: any) {
      console.error('Logout failed:', err.response?.data || err.message);
    }
  };

  return (
    <Box sx={{marginBottom:'96px', overflow: 'hidden'}}> 
      <AppBar position="fixed" color="primary" sx={{minHeight:'64px'}}>
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
      <Box sx={{flexDirection:'column', alignItems:'center', zIndex:'5', marginTop:'64px', right:'0', position:'fixed', display:{sm:'none', xs:'flex'}, backgroundColor: 'rgba(0, 0, 0, 0.2)', height:'180px', width:'140px', transform: menuOpen ? 'scaleY(1) translateX(0)' : 'scaleY(0) translateX(140px)', transition: 'transform 0.5s ease-in-out', backdropFilter:'blur(4px)', borderRadius:'12px'}}>
        <Button component={RouterLink} to="/login" variant="text" sx={{marginTop:'20px', color:"rgba(5, 5, 5, 1)", fontSize:'16px', borderBottom:'2px solid rgba(10, 10, 10, 0.4)', minWidth:'90px', borderRadius:'0'}}>
          Login
        </Button>
        <Button component={RouterLink} to="/register" variant="text" sx={{ color:"rgba(5, 5, 5, 1)", fontSize:'16px', borderBottom:'2px solid rgba(10, 10, 10, 0.4)', minWidth:'90px', borderRadius:'0' }}>
          Register
        </Button>
        <Button onClick={handleLogout} component={RouterLink} to="/" variant="text" sx={{ color:"rgba(5, 5, 5, 1)", fontSize:'16px', borderBottom:'2px solid rgba(10, 10, 10, 0.4)', minWidth:'90px', borderRadius:'0' }}>
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default Navbar;