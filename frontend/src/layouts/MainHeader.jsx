import React from 'react';
import {
  AppBar,
  Container,
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

  return (
    <AppBar elevation={0} sx={{ backgroundColor: '#002884' }}>
      <Container>
        <Toolbar>
          <ShoppingCartIcon
            fontSize="large"
            sx={{ color: '#fff', marginRight: '0.7rem' }}
          />
          <Link
            to="/products"
            style={{
              fontWeight: 'medium',
              flexGrow: 1,
              textDecoration: 'none',
            }}
          >
            <Typography variant="h4" color={'#fff'}>
              Vocal for Local
            </Typography>
          </Link>

          <Link to={'/cart'}>
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
          {/* {userInfo.isAdmin && (
            
          )} */}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default MainHeader;
