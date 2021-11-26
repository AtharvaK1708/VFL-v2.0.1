import React from 'react';
import { AppBar, Container, Toolbar, Typography, Button } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';

const MainHeader = () => {
  return (
    <AppBar elevation={0} color="darkNav">
      <Container>
        <Toolbar>
          <ShoppingCartIcon
            fontSize="large"
            sx={{ color: '#fff', marginRight: '0.7rem' }}
          />
          <Typography
            variant="h4"
            color={'#fff'}
            sx={{ fontWeight: 'medium', flexGrow: 1 }}
          >
            Vocal for Local
          </Typography>
          <Link to={'/cart'}>
            <Button
              sx={{ color: 'white' }}
              startIcon={<ShoppingCartIcon />}
              color="inherit"
            >
              Cart
            </Button>
          </Link>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default MainHeader;
