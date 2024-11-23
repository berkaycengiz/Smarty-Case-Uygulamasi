import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box sx={{color: 'black', marginTop:'10px', marginBottom:'30px', paddingTop:'30px', overflow: 'hidden' }}>
      <Typography variant="body2" align="center">
        &copy; 2024 Blog App. All Rights Reserved.
      </Typography>
    </Box>
  );
};

export default Footer;