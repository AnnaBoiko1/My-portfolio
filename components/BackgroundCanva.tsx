'use client';
import { Box, Container } from '@mui/material';

export default function BackgroundCanva({ children }: { children: React.ReactNode }) {
  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        bgcolor: 'rgba(31, 167, 188, 0.15)',  
        py: { xs: 2, md: 4 },                
        px: { xs: 2, md: 3 },                  
      }}
    >
      <Container maxWidth="lg" sx={{ py: 2 }}>
        {children}
      </Container>
    </Box>
  );
}
