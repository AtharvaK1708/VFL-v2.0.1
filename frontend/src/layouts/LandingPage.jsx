import React, { Fragment } from 'react';
import { Container, Typography, Grid, Paper, Button } from '@mui/material';
import { indigo, teal } from '@mui/material/colors';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import LandingHeader from './LandingHeader';
import vector from '../images/vector.jpg';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';

const LandingPage = () => {
  return (
    <Fragment>
      <header>
        <LandingHeader />
      </header>
      <main>
        <div>
          <Container>
            <Grid
              sx={{ minHeight: '60vh', marginTop: '7rem' }}
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={8} marginTop={10}>
                <Paper style={{ backgroundColor: '#e0f2f1' }} elevation={0}>
                  <Typography
                    gutterBottom
                    variant="h3"
                    fontWeight="bold"
                    color={teal[500]}
                  >
                    Welcome to Vocal for Local
                  </Typography>
                  <Typography
                    sx={{
                      width: '30rem',
                      marginBottom: '1.5rem',
                      marginLeft: '2px',
                    }}
                    variant="subtitle1"
                    fontWeight="medium"
                    color={indigo[400]}
                  >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Sit, commodi consequuntur. Voluptate odio, adipisci debitis
                    distinctio modi corporis? Qui, saepe?
                  </Typography>
                  <Button
                    size="large"
                    variant="contained"
                    startIcon={<AppRegistrationIcon />}
                    color="buttonColor"
                    href="/register"
                  >
                    Sign Up
                  </Button>
                  <Button
                    size="large"
                    variant="contained"
                    startIcon={<ExitToAppIcon />}
                    sx={{ marginLeft: '20px' }}
                    color="buttonColor"
                    href="/login"
                  >
                    Log In
                  </Button>
                  {/* <Button
                    size="large"
                    variant="contained"
                    startIcon={<Inventory2OutlinedIcon />}
                    sx={{ marginLeft: '20px' }}
                    color="buttonColor"
                    href="/products"
                  >
                    View Products
                  </Button> */}
                </Paper>
              </Grid>
              <Grid item xs={2}>
                <Paper
                  style={{ backgroundColor: '#e0f2f1' }}
                  sx={{ width: '25rem', height: '25rem' }}
                  elevation={0}
                >
                  <img width="100%" height="100%" src={vector} alt="aslkm" />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </div>
      </main>
    </Fragment>
  );
};

export default LandingPage;
