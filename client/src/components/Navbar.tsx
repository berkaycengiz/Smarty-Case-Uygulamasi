import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, useMediaQuery } from '@mui/material';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import axios from 'axios';

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [severity, setSeverity] = React.useState<'success' | 'error' | 'info' | 'warning'>('success');

  const username = localStorage.getItem('username');

  useEffect(() => {
    if (location.state && location.state.message) {
      setMessage(location.state.message);
      setSeverity(location.state.severity || 'success');
      setOpen(true);
      navigate(location.pathname, { replace: true });
    }
  }, [location.state, navigate]);

  const isLoggedIn = () => {
    return document.cookie.split(';').some((item) => item.trim().startsWith('COOKIE-AUTH='));
  };

  useEffect(() => {
    setLoggedIn(isLoggedIn());
  }, [location, loggedIn]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:8080/auth/logout', {}, {
        withCredentials: true,
      });
      console.log(response.data);
      setMenuOpen(false);
      setLoggedIn(false);
      navigate('/', {
        state: { message: 'Logout successful!', severity: 'success' },
      });
    } 
    catch (err: any) {
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <Box sx={{marginBottom:'96px', overflow: 'hidden'}}> 
      <AppBar position="fixed" color="primary" sx={{minHeight:'64px'}}>
        <Toolbar sx={{minHeight:'64px'}}>
        <Button color="inherit" onClick={() => window.location.href = '/'} sx={{fontSize:'20px', "&:hover":{scale:1.07}, transition:'scale 0.15s linear'}}>
        <HomeIcon sx={{fontSize:'32px'}}/>
        </Button>
          <Typography sx={{ flexGrow: 1 }}>
          </Typography>
            <Box sx={{display:{sm:'flex', xs:'none'}, gap:'12px'}}>
              <Button color="inherit" component={RouterLink} to="/" sx={{fontSize:'16px', marginRight:'12px', "&:hover":{scale:1.07}, transition:'scale 0.15s linear', display: loggedIn ? 'inline-flex' : 'none', '&:hover .stick':{transform: 'scaleX(1)', transformOrigin: 'bottom left', transition: 'transform 0.15s ease-out'}}}>
              {username}
              <Box className="stick" sx={{transform: 'scaleX(0)', transformOrigin: 'bottom right', position:'absolute', backgroundColor:'white', width:'100%', height:'2px', bottom:'0', transition: 'transform 0.15s ease-out'}}></Box>
              </Button>
              <Button color="inherit" component={RouterLink} to="/login" sx={{fontSize:'16px', "&:hover":{scale:1.07}, transition:'scale 0.15s linear', display: loggedIn ? 'none' : 'inline-flex', '&:hover .stick':{transform: 'scaleX(1)', transformOrigin: 'bottom left', transition: 'transform 0.15s ease-out'}}}>Login
              <Box className="stick" sx={{transform: 'scaleX(0)', transformOrigin: 'bottom right', position:'absolute', backgroundColor:'white', width:'100%', height:'2px', bottom:'0', transition: 'transform 0.15s ease-out'}}></Box>
              </Button>
              <Button color="inherit" component={RouterLink} to="/register" sx={{fontSize:'16px', marginRight:'12px', "&:hover":{scale:1.07}, transition:'scale 0.15s linear', '&:hover .stick':{transform: 'scaleX(1)', transformOrigin: 'bottom left', transition: 'transform 0.15s ease-out'}}}>Register
              <Box className="stick" sx={{transform: 'scaleX(0)', transformOrigin: 'bottom right', position:'absolute', backgroundColor:'white', width:'100%', height:'2px', bottom:'0', transition: 'transform 0.15s ease-out'}}></Box>
              </ Button>
              <Button onClick={handleLogout} color="inherit" component={RouterLink} to="/" sx={{fontSize:'16px', "&:hover":{scale:1.07}, transition:'scale 0.15s linear', display: loggedIn ? 'inline-flex' : 'none', '&:hover .stick':{transform: 'scaleX(1)', transformOrigin: 'bottom left', transition: 'transform 0.15s ease-out'}}}>
              Logout
              <Box className="stick" sx={{transform: 'scaleX(0)', transformOrigin: 'bottom right', position:'absolute', backgroundColor:'white', width:'100%', height:'2px', bottom:'0', transition: 'transform 0.15s ease-out'}}></Box>
              </Button>
            </Box>
            <Box sx={{display:{sm:'none', xs:'block'}}}>
              <Button color="inherit" variant="text" sx={{minWidth:'', width:'48px', height:'48px', padding:'0', "&:hover":{scale:1.07}, transition:'scale 0.15s linear'}} onClick={toggleMenu}>
              <AccountCircleIcon sx={{fontSize:'32px'}}/>
              </Button>
            </Box>
        </Toolbar>
      </AppBar>
      <Box sx={{flexDirection:'column', alignItems:'center', zIndex:'5', marginTop:'64px', right:'0', position:'fixed', display:{sm:'none', xs:'flex'}, backgroundColor: 'rgba(0, 0, 0, 0.05)', height:'180px', width:'140px', transform: menuOpen ? 'scaleY(1) translateX(0)' : 'scaleY(0) translateX(140px)', transition: 'transform 0.5s ease-in-out', backdropFilter:'blur(16px)', borderRadius:'12px', paddingTop:'20px'}}>
        <Button onClick={toggleMenu} variant="text" sx={{"&:hover":{color: '#FF5733'}, color:"rgba(5, 5, 5, 1)", fontSize:'16px', borderBottom:'2px solid rgba(10, 10, 10, 0.4)', minWidth:'90px', borderRadius:'0',  display: loggedIn ? 'inline-flex' : 'none'}}>
          {username}
        </Button>
        <Button onClick={toggleMenu} component={RouterLink} to="/register" variant="text" sx={{"&:hover":{color: '#FF5733'}, color:"rgba(5, 5, 5, 1)", fontSize:'16px', borderBottom:'2px solid rgba(10, 10, 10, 0.4)', minWidth:'90px', borderRadius:'0'}}>
          Register
        </Button>
        <Button onClick={toggleMenu} component={RouterLink} to="/login" variant="text" sx={{"&:hover":{color: '#FF5733'}, color:"rgba(5, 5, 5, 1)", fontSize:'16px', borderBottom:'2px solid rgba(10, 10, 10, 0.4)', minWidth:'90px', borderRadius:'0', display: loggedIn ? 'none' : 'inline-flex'}}>
          Login
        </Button>
        <Button onClick={handleLogout} variant="text" sx={{"&:hover":{color: '#FF5733'}, color:"rgba(5, 5, 5, 1)", fontSize:'16px', borderBottom:'2px solid rgba(10, 10, 10, 0.4)', minWidth:'90px', borderRadius:'0', display: loggedIn ? 'inline-flex' : 'none' }}>
          Logout
        </Button>
      </Box>
    </Box>

  );
};

export default Navbar;