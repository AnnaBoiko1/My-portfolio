'use client';
import { Box, Typography } from '@mui/material';

export default function Footer() {
  
  return (
    <Box 
      sx={{ 
        width: '100%', 
        py:0,
        px:2, 
        mt: 'auto', 
        textAlign: 'right',
        position: 'fixed',
        bottom: 0,
        left: 0, right: 0,
        fontSize: '0.1rem'
        

      }}
    >
      <Typography variant="caption" 
        sx={{ fontSize: '0.75rem' }} color="text.secondary">
        © {new Date().getFullYear()} Anna Boiko. All rights reserved.
      </Typography>
    </Box>
  );
}
