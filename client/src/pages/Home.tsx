import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Button, Card, CardContent, CardActions, useTheme, Snackbar, Alert } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface BlogPost {
  _id: string;
  title: string;
  content: string;
  author: string;
}

const Home: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  
  const navigate = useNavigate();

  const location = useLocation();
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [severity, setSeverity] = React.useState<'success' | 'error' | 'info' | 'warning'>('success');


  useEffect(() => {
    if (location.state && location.state.message) {
      setMessage(location.state.message);
      setSeverity(location.state.severity || 'success');
      setOpen(true);
      navigate(location.pathname, { replace: true });
    }
  }, [location.state, navigate]);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    axios.get('http://localhost:8080/posts')
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
}, []);

  const theme = useTheme();

return (
  <div>
    <Navbar/>
      <Container maxWidth="lg" sx={{ marginTop: 4, overflow:'hidden' }}>
        <Typography variant="h3" marginTop={4} marginBottom={4} fontSize={40} align="center" fontWeight={600}>
          Welcome to Our Blog
        </Typography>
        <Typography variant="h4" fontSize={32} gutterBottom fontWeight={500}>
          Latest
        </Typography>
        
        <Grid container spacing={3}>
          {posts.map((post) => (
            <Grid size={{ xs: 12, md: 4, sm: 6 }} key={post._id}>
              <Card sx={{display:'flex', flexDirection:'column', justifyContent:'space-between', minHeight:'180px', border:"2px solid rgba(155, 155, 155, 0.16)", backgroundColor:'rgba(155, 155, 155, 0.1)', borderRadius:'0'}}>
                <CardContent sx={{padding:'12px'}}>
                  <Typography component={Link} to={`/posts/${post._id}`} variant="h6" overflow='hidden' sx={{ color:'inherit', "&:hover":{color: '#FF5733'}, textDecoration:'none', whiteSpace: 'nowrap', textOverflow: 'ellipsis', transition:'color 0.15s linear'}}>{post.title}</Typography>
                  <Typography variant="body2" color="textSecondary" overflow='hidden' sx={{textOverflow: 'ellipsis', whiteSpace:'normal'}}>
                    {post.content.slice(0, 90)}...
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'space-between', padding:'12px' }}>
                  <Typography variant="subtitle2" color="textSecondary" overflow='hidden' sx={{ textAlign: 'left', alignContent:'flex-end',  whiteSpace: 'nowrap', textOverflow: 'ellipsis'}}>
                    Author: {post.author}
                  </Typography>
                  <Button size="small" variant="contained" sx={{padding:'2px 0 0 0', "&:hover":{scale:1.05}, transition:'scale 0.15s linear'}} component={Link} to={`/posts/${post._id}`}>
                    Read
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Snackbar open={open} autoHideDuration={2500} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
          <Alert onClose={handleClose} severity={severity} variant="outlined">
            {message}
          </Alert>
        </Snackbar>
      </Container>
    <Footer />
  </div>
  );
};

export default Home;