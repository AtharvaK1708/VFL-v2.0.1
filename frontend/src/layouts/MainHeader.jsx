import React, { Fragment } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Avatar,
  Menu,
  MenuItem,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { logout } from '../actions/userActions';
import ListIcon from '@mui/icons-material/List';
import Searchbox from '../components/Searchbox';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import DrawerComponent from '../components/DrawerComponent';

const MainHeader = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const navigate = useNavigate();

  // ! LOGOUT
  const logoutHandler = () => {
    dispatch(logout());
  };

  // ! dropdown
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const open = Boolean(anchorEl);
  const open2 = Boolean(anchorEl2);
  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  // ! BREAKPOINTS
  const theme = useTheme();

  const isMatch = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <Fragment>
      {isMatch ? (
        <AppBar elevation={8} sx={{ backgroundColor: '#3f51b5' }}>
          <Toolbar sx={{ margin: '0.5rem 2rem' }}>
            <DrawerComponent
              userInfo={userInfo}
              logoutHandler={logoutHandler}
            />
          </Toolbar>
        </AppBar>
      ) : (
        <AppBar
          elevation={8}
          sx={{ backgroundColor: '#3f51b5', display: isMatch ? 'none' : '' }}
        >
          <Toolbar sx={{ margin: '0.5rem 2rem' }}>
            <ShoppingCartIcon
              fontSize="large"
              sx={{ color: '#fff', marginRight: '0.7rem' }}
            />
            <Link
              to="/products"
              style={{
                fontWeight: 'medium',
                flexGrow: 0.5,
                textDecoration: 'none',
              }}
            >
              <Typography variant="h4" color={'#fff'}>
                Vocal for Local
              </Typography>
            </Link>
            <Searchbox />

            <Link to={'/cart'} style={{ textDecoration: 'none' }}>
              <Button
                sx={{ color: 'white' }}
                startIcon={
                  <ShoppingCartIcon sx={{ width: '30px', height: '30px' }} />
                }
              >
                Cart
              </Button>
            </Link>
            {userInfo && (
              <>
                <div>
                  <Button
                    sx={{ color: 'white', marginLeft: '30px' }}
                    endIcon={<ArrowDropDownIcon color="white" />}
                    onClick={handleClick}
                    startIcon={
                      <Avatar
                        alt="Remy Sharp"
                        sx={{ width: '30px', height: '30px' }}
                        src="https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"
                      ></Avatar>
                    }
                    color="inherit"
                  >
                    {userInfo.name}
                  </Button>

                  <Menu
                    id="demo-positioned-menu"
                    aria-labelledby="demo-positioned-button"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                  >
                    <MenuItem onClick={() => navigate('/profile')}>
                      Profile
                    </MenuItem>
                    <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                  </Menu>
                </div>
                {userInfo.isAdmin && (
                  <div>
                    <Button
                      sx={{ color: 'white', marginLeft: '30px' }}
                      endIcon={<ArrowDropDownIcon color="white" />}
                      onClick={handleClick2}
                      startIcon={<ListIcon />}
                      color="inherit"
                    >
                      Admin Menu
                    </Button>

                    <Menu
                      id="demo-positioned-menu"
                      aria-labelledby="demo-positioned-button"
                      anchorEl={anchorEl2}
                      open={open2}
                      onClose={handleClose2}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                      }}
                    >
                      <MenuItem onClick={() => navigate('/admin/userList')}>
                        User List
                      </MenuItem>
                      <MenuItem onClick={() => navigate('/admin/productList')}>
                        Product List
                      </MenuItem>
                      <MenuItem onClick={() => navigate('/admin/orderList')}>
                        Order List
                      </MenuItem>
                    </Menu>
                  </div>
                )}
              </>
            )}
          </Toolbar>
        </AppBar>
      )}
    </Fragment>
  );
};

export default MainHeader;
