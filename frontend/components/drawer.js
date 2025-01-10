/*import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';
import { useRouter } from 'next/navigation';

export default function TemporaryDrawer({isAuthenticated, logout}) {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();  
    const handleLoginClick = () => {
      router.push('/login');  
    };

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250, display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0078D4',
        borderRadius: '12px',
        margin: 2,}} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {['Login'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={handleLoginClick} >
              <ListItemIcon >
                <LoginIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
      <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}*/

import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from 'next/navigation';

export default function TemporaryDrawer({ isAuthenticated, logout }) {
  console.log('isAuthenticated from Drawer:', isAuthenticated);
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  // Handle login click
  const handleLoginClick = () => {
    router.push('/login');
  };

  // Handle logout
  const handleLogoutClick = () => {
    logout(); // Call the logout function passed as prop
    router.push('/'); // Optionally, navigate back to the home page or wherever you'd like
  };

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleMyCourses = async () => {
    if(isAuthenticated){
      router.push('/mycourses');
    }else{
      console.log('User is not authenticated');
      alert('Try logging in');
      router.push('/login');
    }
  };

  const handleHome=async()=>{
    router.push('/');
  }

  // Conditional content in the Drawer based on authentication state
  const DrawerList = (
    <Box
      sx={{
        width: 250,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0078D4',
        borderRadius: '12px',
        margin: 2,
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <List>
        {/* Conditional render based on authentication */}
        {isAuthenticated ? (
          <ListItem key="logout" disablePadding>
            <ListItemButton onClick={handleLogoutClick}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        ) : (
          <ListItem key="login" disablePadding>
            <ListItemButton onClick={handleLoginClick}>
              <ListItemIcon>
                <LoginIcon />
              </ListItemIcon>
              <ListItemText primary="Login" />
            </ListItemButton>
          </ListItem>
        )}
        {isAuthenticated ? (
          <ListItem key="my_courses" disablePadding>
            <ListItemButton onClick={handleMyCourses}>
              <ListItemText primary="My Courses" />
            </ListItemButton>
          </ListItem>
        ) : (
          <ListItem key="my_courses_login" disablePadding>
            <ListItemButton onClick={handleLoginClick}>
              <ListItemText primary="My Courses-Login" />
            </ListItemButton>
          </ListItem>
          
        )
        }
        <ListItem key="home" disablePadding>
            <ListItemButton onClick={handleHome}>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
        onClick={toggleDrawer(true)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}

