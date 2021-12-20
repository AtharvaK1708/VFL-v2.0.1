import React from 'react';
import {
  Drawer,
  Button,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
} from '@mui/material';
import ReorderIcon from '@mui/icons-material/Reorder';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

const DrawerComponent = ({ userInfo, logoutHandler }) => {
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  return (
    <>
      <div>
        <Button onClick={toggleDrawer('left', true)}>
          <ReorderIcon sx={{ color: 'white', fontSize: '40px' }} />
        </Button>
        <Drawer
          anchor={'left'}
          open={state['left']}
          onClose={toggleDrawer('left', false)}
          variant="temporary"
          sx={{ width: '240' }}
        >
          <Box
            sx={{
              width: 250,
            }}
            role="presentation"
            onClick={toggleDrawer('left', false)}
            onKeyDown={toggleDrawer('left', false)}
          >
            <List>
              <Link to="/products">
                <ListItem button>
                  <Typography variant="h6">Vocal for Local</Typography>
                </ListItem>
              </Link>
            </List>
            <Divider />

            <List>
              <Link
                to={'/cart'}
                style={{ textDecoration: 'none', color: 'black' }}
              >
                <ListItem button>
                  <ListItemIcon>{<ShoppingCartIcon />}</ListItemIcon>
                  <ListItemText primary="View Items in Cart" />
                </ListItem>
              </Link>
            </List>
            <Divider />
            {userInfo && (
              <List>
                <Link
                  to={'/profile'}
                  style={{ textDecoration: 'none', color: 'black' }}
                >
                  <ListItem button>
                    <ListItemIcon>{<AccountBoxIcon />}</ListItemIcon>
                    <ListItemText primary="View Profile" />
                  </ListItem>
                </Link>
                <ListItem button onClick={logoutHandler}>
                  <ListItemIcon>{<LogoutIcon />}</ListItemIcon>
                  <ListItemText primary="Logout" />
                </ListItem>
              </List>
            )}
            <Divider />
            {userInfo?.isAdmin && (
              <List>
                <Link
                  to={'/admin/userList'}
                  style={{ textDecoration: 'none', color: 'black' }}
                >
                  <ListItem button>
                    <ListItemIcon>{<SupervisedUserCircleIcon />}</ListItemIcon>
                    <ListItemText primary="View all Users" />
                  </ListItem>
                </Link>
                <Link
                  to={'/admin/productList'}
                  style={{ textDecoration: 'none', color: 'black' }}
                >
                  <ListItem button>
                    <ListItemIcon>{<Inventory2Icon />}</ListItemIcon>
                    <ListItemText primary="View all Products" />
                  </ListItem>
                </Link>
                <Link
                  to={'/admin/orderList'}
                  style={{ textDecoration: 'none', color: 'black' }}
                >
                  <ListItem button>
                    <ListItemIcon>{<LocalShippingIcon />}</ListItemIcon>
                    <ListItemText primary="View all Orders" />
                  </ListItem>
                </Link>
              </List>
            )}
          </Box>
        </Drawer>
      </div>
    </>
  );
};

export default DrawerComponent;
