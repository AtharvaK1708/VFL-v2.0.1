import React from 'react';
import { Breadcrumbs } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Link } from 'react-router-dom';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: '10px',
        marginTop: '100px',
      }}
    >
      {step1 ? (
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          <Link
            style={{ textDecoration: 'underline', color: 'black' }}
            to="/login"
          >
            Sign In
          </Link>
          {step2 ? (
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              <Link
                style={{ textDecoration: 'underline', color: 'black' }}
                to="/shipping"
              >
                Shipping
              </Link>{' '}
            </Breadcrumbs>
          ) : (
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              <Link
                to="/shipping"
                style={{ textDecoration: 'underline', color: 'lightgray' }}
              >
                Shipping
              </Link>
            </Breadcrumbs>
          )}
          {step3 ? (
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              <Link
                style={{ textDecoration: 'underline', color: 'black' }}
                to="/payment"
              >
                Payment
              </Link>{' '}
            </Breadcrumbs>
          ) : (
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              <Link
                to="/payment"
                style={{ textDecoration: 'underline', color: 'lightgray' }}
              >
                Payment
              </Link>
            </Breadcrumbs>
          )}
          {step4 ? (
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              <Link
                style={{ textDecoration: 'underline', color: 'black' }}
                to="/placeorder"
              >
                Place Order
              </Link>{' '}
            </Breadcrumbs>
          ) : (
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              <Link
                to="/placeorder"
                style={{ textDecoration: 'underline', color: 'lightgray' }}
              >
                Place Order
              </Link>
            </Breadcrumbs>
          )}
        </Breadcrumbs>
      ) : (
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          <Link
            to="/login"
            style={{ textDecoration: 'underline', color: 'lightgray' }}
          >
            Sign In
          </Link>
        </Breadcrumbs>
      )}
    </div>
  );
};

export default CheckoutSteps;
