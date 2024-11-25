import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Button, Card, CardContent, CardActions, useTheme, Snackbar, Alert, TextField } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

interface BlogPost {
  _id: string;
  title: string;
  content: string;
  author: string;
}

interface FormData {
  title: string;
  content: string;
}

const Home: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  
  const [formData, setFormData] = useState<FormData>({ title: '', content: '' });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const username = localStorage.getItem('username');

  const theme = useTheme();

  const navigate = useNavigate();

  const location = useLocation();
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [severity, setSeverity] = React.useState<'success' | 'error' | 'info' | 'warning'>('success');

  const [editMode, setEditMode] = useState(false); // Düzenleme modunun açık/kapalı olduğunu tutar
  const [editPostId, setEditPostId] = useState<string | null>(null); // Düzenlenen postun ID'sini tutar

  const isLoggedIn = () => {
    return document.cookie.split(';').some((item) => item.trim().startsWith('COOKIE-AUTH='));
  };

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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (formData.title === '' || formData.content === '') {
      setError('Please make sure all fields are filled in correctly.');
    }
    else {
      setError('');
    }
    try {
      const response = await axios.post('http://localhost:8080/posts', formData, {
        withCredentials: true,
      });
      console.log('Response:', response.data);
      setSuccess(true);
      navigate('/', {
        state: {message: 'Published successfully!', severity: 'success'},
      });
      const updatedPosts = await axios.get('http://localhost:8080/posts');
      setPosts(updatedPosts.data);
    } 
    catch (err: any) {
      console.error('Error:', err.response || err.message);
      setError(err.response?.data?.message);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    if ((name === 'title' && value.length == 0) || (name === 'content'  && value.length == 0)){
        setError('Please make sure all fields are filled in correctly.');
    }
    else {
        setError('');
    }
  };

return (
  <div>
    <Navbar/>
      <Container maxWidth="lg" sx={{ marginTop: 4, overflow:'hidden', padding:'0 24px'}}>
        <Typography variant="h3" marginTop={4} marginBottom={4} fontSize={40} align="center" fontWeight={600}>
          Welcome to Our Blog
        </Typography>
        <Typography variant="h4" fontSize={32} gutterBottom fontWeight={500} sx={{display: isLoggedIn() ? 'flex' : 'none'}}>
          Create a New Post
        </Typography>
          <Box sx={{display: isLoggedIn() ? 'flex' : 'none', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
            <form onSubmit={handleSubmit} style={{width:'80%'}}>
            {error && <Typography sx={{ overflow: 'hidden'}} color="error" align='left' mt={1} mb={2}>{error}</Typography>}
              <TextField
                fullWidth
                label="Title"
                variant="outlined"
                margin="normal"
                required
                onChange={handleChange}
                name="title"
                value={formData.title}
              />
              <TextField
                fullWidth
                label="Content"
                variant="outlined"
                multiline
                rows={8}
                margin="normal"
                required
                onChange={handleChange}
                name="content"
                value={formData.content}
              />
              <Box sx={{ textAlign: 'center', mt: 2, mb: 2 }}>
                <Button variant="contained" color="primary" type="submit" sx={{ textTransform: 'none', padding: '10px 40px', "&:hover":{scale:1.05}, transition:'scale 0.15s linear'}}>
                  Publish
                </Button>
              </Box>
            </form>
          </Box>
        <Typography variant="h4" fontSize={32} gutterBottom fontWeight={500}>
          Latest
        </Typography>
        
        <Grid container spacing={3}>
          {posts.map((post) => (
            <Grid size={{ xs: 12, md: 4, sm: 6 }} key={post._id}>
              <Card sx={{display:'flex', flexDirection:'column', justifyContent:'space-between', minHeight:'180px', border:"2px solid rgba(155, 155, 155, 0.16)", backgroundColor:'rgba(155, 155, 155, 0.1)', borderRadius:'0'}}>
                <CardContent sx={{padding:'12px'}}>
                  <Box sx={{display:'flex', justifyContent:'space-between'}}>
                  <Typography component={Link} to={`/posts/${post._id}`} variant="h6" overflow='hidden' sx={{ color:'inherit', "&:hover":{color: '#FF5733'}, textDecoration:'none', whiteSpace: 'nowrap', textOverflow: 'ellipsis', transition:'color 0.15s linear'}}>{post.title}</Typography>
                  {post.author === username && (
                    <Box sx={{ display:'flex', gap:'8px'}}>
                      <Button
                        size="small"
                        variant="text"
                        color="primary"
                        // onClick={}
                        sx={{minWidth:'0', width:'32px'}}>
                        <EditIcon></EditIcon>
                      </Button>
                      <Button
                        size="small"
                        variant="text"
                        color="primary"
                        // onClick={}
                        sx={{minWidth:'0', width:'32px'}}>
                        <DeleteIcon></DeleteIcon>
                      </Button>
                    </Box>
                  )}
                  </Box>
                  <Typography variant="body2" color="textSecondary" overflow='hidden' sx={{marginTop:'8px', textOverflow: 'ellipsis', whiteSpace:'normal'}}>
                    {post.content.slice(0, 90)}...
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'space-between', padding:'12px' }}>
                  <Typography variant="subtitle2" color="textSecondary" overflow='hidden' sx={{ textAlign: 'left', alignContent:'flex-end',  whiteSpace: 'nowrap', textOverflow: 'ellipsis'}}>
                    Author: {post.author}
                  </Typography>
                  <Button size="small" variant="contained" sx={{padding:'0', width:'72px', "&:hover":{scale:1.05}, transition:'scale 0.15s linear'}} component={Link} to={`/posts/${post._id}`}>
                    Read
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Snackbar open={open} autoHideDuration={2500} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
          <Alert onClose={handleClose} severity={severity} variant='filled'>
            {message}
          </Alert>
        </Snackbar>
      </Container>
    <Footer />
  </div>
  );
};

export default Home;