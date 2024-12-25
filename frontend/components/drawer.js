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
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';
import { useRouter } from 'next/navigation';

export default function TemporaryDrawer() {
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
}
