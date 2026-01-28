"use client";
import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Home() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <>
      
      <Container maxWidth="md" sx={{ py:8, mt: 4}}>

        <Container maxWidth="md" sx={{ display:'flex', alignItems: 'flex-end'}}>
          <Typography variant="h1" sx={{ fontSize: { xs: '3rem', md: '3.5rem' }, fontWeight: 500, mb: 2, lineHeight: 1.3 }}>
            Hi, my 
          </Typography>
          <Box sx={{ mb: 4 }}>
            <Image 
              src="/annaboiko.png"  
              alt="Anna Boiko"
              width={300}
              height={300}
              className=""
              priority
            />
          </Box>
        </Container>
      
        <Typography variant="h1" sx={{ fontSize: { xs: '3rem', md: '3.5rem' }, fontWeight: 500, mb: 10, lineHeight: 0.5, px:2 }}>
          name is <strong>Anna</strong><span style={{ color: 'var(--blue)' }}>.</span>
        </Typography>

        <Typography variant="h3" sx={{ fontSize: { xs: '1.5rem', md: '1.25rem' }, color: 'text', mb: 2, maxWidth: 600,px:2 }}>
          I&apos;m an independent, creative <strong>full-stack web developer</strong> and designer from Ukraine, based in Toronto.
        </Typography>
      </Container>

      {}
      <Box sx={{ width: '100%', bottom: 0, position: "fixed", left: 0, right: 0 }}>
        <BottomNavigation 
          value={pathname} 
          onChange={(e, newValue) => router.push(newValue)} 
          showLabels 
          sx={{ 
      bgcolor: 'transparent', 
      '& .MuiBottomNavigationAction-root': {
        color: 'var(--text)',  // Сірий для неактивних (включає текст та іконку)
        '& .MuiBottomNavigationAction-label': {
          fontSize: '1.2rem', 
          letterSpacing: '0.05em',
          paddingBottom: 10,
          color: 'inherit'    // Спадкує колір від root
        }
      },
      '& .MuiBottomNavigationAction-root.Mui-selected': {
        color: 'purple !important',  // Фіолетовий для активної (текст + іконка)
        '& .MuiBottomNavigationAction-label': {
          color: 'purple !important'
        },
        '& svg': {
          color: 'var(--purple) !important'  // Окремо для іконки
        }
      }
    }}
>
          <BottomNavigationAction label="Home" value="/" />
          <Typography sx={{fontSize: '1.2rem', pb: 10}}>|</Typography>
          <BottomNavigationAction label="About" value="/about" />
          <Typography sx={{fontSize: '1.2rem', pb: 10}}>|</Typography>
          <BottomNavigationAction label="Projects" value="/projects" />
          <Typography sx={{}}>|</Typography>
          <BottomNavigationAction label="Contact" value="/contact" /> 
        </BottomNavigation>
      </Box>
    </>
  );
}
