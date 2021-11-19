import React from 'react';
import { AppBar, Container, Toolbar, Typography } from '@mui/material';
import { indigo } from '@mui/material/colors';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const LandingHeader = () => {
  return (
    <div>
      <AppBar
        position="relative"
        sx={{ marginTop: '1rem' }}
        elevation={0}
        color="transparent"
      >
        <Container>
          <Toolbar>
            <ShoppingCartIcon
              fontSize="large"
              sx={{ color: '#3949ab', marginRight: '0.7rem' }}
            />
            <Typography
              variant="h4"
              color={indigo[600]}
              sx={{ fontWeight: 'bold' }}
            >
              Vocal for Local
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

export default LandingHeader;
