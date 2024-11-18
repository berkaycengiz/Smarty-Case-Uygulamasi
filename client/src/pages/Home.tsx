import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Button, Card, CardContent, CardActions, Grid2 } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface BlogPost {
  _id: string;
  title: string;
  content: string;
  author: string;
}

const Home: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    axios.get('http://localhost:8080/posts')
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  return (
    <div>
      <Navbar/>
      <Container maxWidth="lg" sx={{ marginTop: 4, overflow:'hidden' }}>
        <Typography variant="h3" gutterBottom align="center">
          Welcome to Our Blog
        </Typography>
        
        <Grid container spacing={3}>
          {posts.map((post) => (
            <Grid size={{ xs: 12, md: 4, sm: 6 }} key={post._id}>
              <Card>
                <CardContent sx={{padding:'12px'}}>
                  <Typography variant="h6" overflow='hidden' sx={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis'}}>{post.title}</Typography>
                  <Typography variant="body2" color="textSecondary" overflow='hidden' sx={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis'}}>
                    {post.content.slice(0, 100)}...
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'space-between', padding:'12px' }}>
                  <Typography variant="subtitle2" color="textSecondary" overflow='hidden' sx={{ textAlign: 'left', alignContent:'flex-end',  whiteSpace: 'nowrap', textOverflow: 'ellipsis'}}>
                    Author: {post.author}
                  </Typography>
                  <Button size="small" sx={{padding:'2px 0 0 0'}} component={Link} to={`/posts/${post._id}`}>
                    Read more
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Footer />
    </div>
  );
};

export default Home;