import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const Searchbox = ({ mobileView }) => {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate('');

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/search/${keyword}`);
      setKeyword('');
    } else {
      navigate('/products');
    }
  };

  return (
    <div>
      <form style={{ display: 'inline' }} onSubmit={submitHandler}>
        <TextField
          name="keyword"
          value={keyword}
          variant="outlined"
          autoComplete="off"
          sx={{
            backgroundColor: '#fff',
            right: mobileView ? '0' : '6rem',

            display: mobileView && 'inline',
            borderRadius: '10px',
          }}
          placeholder="Search Products.."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <Button
          sx={{
            right: mobileView ? '-2rem' : '5rem',
            top: '3px',
            marginBottom: mobileView && '20px',
            height: '3.2rem',
          }}
          color={mobileView ? 'darkButton' : 'whiteButton'}
          variant="outlined"
          type="submit"
        >
          Search
        </Button>
      </form>
    </div>
  );
};

export default Searchbox;
