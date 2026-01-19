"use client";
import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';


export default function Home() {
  const [value, setValue] = React.useState(0);
  return (
    <Box sx={{ width: 500, bottom: 0, position: "fixed" }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Home" href='/' />
        <BottomNavigationAction label="About" href='/about' />
        <BottomNavigationAction label="Projects" href='/projects' />
        <BottomNavigationAction label="Contact" href='/contact'/>
      </BottomNavigation>
    </Box>
  );
}
