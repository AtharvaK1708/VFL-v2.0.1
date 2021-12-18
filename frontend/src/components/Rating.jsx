import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const Rating = ({ totalRating, numReviews }) => {
  return (
    <div>
      <span style={{ color: '#FDCC0D' }}>
        {totalRating >= 1 ? (
          <StarIcon fontSize="small" />
        ) : totalRating >= 0.5 ? (
          <StarHalfIcon />
        ) : (
          <StarBorderIcon />
        )}
      </span>
      <span style={{ color: '#FDCC0D' }}>
        {totalRating >= 2 ? (
          <StarIcon fontSize="small" />
        ) : totalRating >= 1.5 ? (
          <StarHalfIcon fontSize="small" />
        ) : (
          <StarBorderIcon fontSize="small" />
        )}
      </span>
      <span style={{ color: '#FDCC0D' }}>
        {totalRating >= 3 ? (
          <StarIcon fontSize="small" />
        ) : totalRating >= 2.5 ? (
          <StarHalfIcon fontSize="small" />
        ) : (
          <StarBorderIcon fontSize="small" />
        )}
      </span>
      <span style={{ color: '#FDCC0D' }}>
        {totalRating >= 4 ? (
          <StarIcon fontSize="small" />
        ) : totalRating >= 3.5 ? (
          <StarHalfIcon fontSize="small" />
        ) : (
          <StarBorderIcon fontSize="small" />
        )}
      </span>
      <span style={{ color: '#FDCC0D' }}>
        {totalRating >= 5 ? (
          <StarIcon fontSize="small" />
        ) : totalRating >= 4.5 ? (
          <StarHalfIcon fontSize="small" />
        ) : (
          <StarBorderIcon fontSize="small" />
        )}
      </span>
      {numReviews && (
        <div
          style={{
            display: 'inline-block',
            position: 'absolute',
            marginLeft: '12px',
            marginTop: '2px',
          }}
        >
          from {numReviews} reviews
        </div>
      )}
    </div>
  );
};

export default Rating;
