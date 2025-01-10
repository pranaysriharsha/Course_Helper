'use client';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from 'next/navigation';
import TemporaryDrawer from './drawer';

export default function ButtonAppBar({isAuthenticated, logout,title}) {
  console.log('isAuthenticated from ButtonAppBar:', isAuthenticated);

  const router = useRouter();  
  const handleLoginClick = () => {
    router.push('/login');  
  };


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <TemporaryDrawer isAuthenticated={isAuthenticated} 
        logout={logout}/>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
           {title}
          </Typography>
          <Button color="inherit" onClick={isAuthenticated ? logout : handleLoginClick}>
            {isAuthenticated ? 'Logout' : 'Login'}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
