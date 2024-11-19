import React, { useState, useEffect } from 'react';
import { Container, Typography, Card, CardContent, CardActions, useTheme, Button } from '@mui/material';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

interface BlogPost {
  _id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}

const PostDetails: React.FC = () => {
  const [post, setPost] = useState<BlogPost | null>(null);
  const { id } = useParams<{ id: string }>();
  const theme = useTheme();

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:8080/posts/${id}`)
        .then((response) => {
          setPost(response.data);
        })
        .catch((error) => {
          console.error('Error fetching post:', error);
        });
    }
  }, [id]);

  if (!post) {
    return <Typography align="center">Loading...</Typography>;
  }

  return (
    <div>
      <Navbar />
      <Container maxWidth="lg" sx={{display:'flex', flexDirection:'column', alignItems:'center', marginTop: 4, overflow: 'hidden' }}>
        <Typography variant="h3" fontSize={40} gutterBottom align="center" fontWeight={600}>
          {post.title}
        </Typography>
        <Card sx={{maxWidth:'800px', display:'flex', flexDirection:'column', justifyContent:'space-between', minHeight:'180px', border:"2px solid rgba(155, 155, 155, 0.16)", backgroundColor:'rgba(155, 155, 155, 0.1)', borderRadius:'0'}}>
          <CardContent>
            <Typography variant="body1" color="textPrimary" overflow="hidden" sx={{textOverflow: 'ellipsis', whiteSpace:'normal'}}>
              {post.content}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary" sx={{ textAlign: 'left', mt:2, whiteSpace: 'nowrap', textOverflow: 'ellipsis'}} overflow='hidden'>
              Author: {post.author}
            </Typography>
          </CardContent>
          <CardActions sx={{ display:'flex', justifyContent:'space-between', padding:'16px'}}>
            <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'left', marginTop: '8px' }}>
              Published on: {new Date(post.createdAt).toLocaleTimeString()} <br/> {new Date(post.createdAt).toLocaleDateString()} 
            </Typography>
            <Button size="small" variant="contained" sx={{"&:hover":{scale:1.05}, transition:'scale 0.15s linear', whiteSpace:'nowrap'}} component={Link} to={`/`}>
              Back to Home
            </Button>
          </CardActions>
        </Card>
      </Container>
      <Footer />
    </div>
  );
};

export default PostDetails;
