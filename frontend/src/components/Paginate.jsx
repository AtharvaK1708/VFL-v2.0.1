import React from 'react';
import Pagination from '@mui/material/Pagination';
import { Link } from 'react-router-dom';
import { PaginationItem } from '@mui/material';

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
  return (
    <Pagination
      sx={{ display: 'flex', justifyContent: 'center', marginTop: '6rem' }}
      count={pages}
      color="primary"
      size="large"
      showFirstButton
      showLastButton
      renderItem={(item) => (
        <PaginationItem
          component={Link}
          to={`/products/page/${item.page}`}
          {...item}
        />
      )}
    ></Pagination>
  );
};

export default Paginate;
// {[...Array(pages).keys()].map((x) => (
//     <PaginationItem selected={x + 1 === page}>
//       <Link
//         key={x + 1}
//         to={
//           keyword
//             ? `/products/search/${keyword}/page/${x + 1}`
//             : `/products/page/${x + 1}`
//         }
//       >
//         {x + 1}
//       </Link>
//     </PaginationItem>
//   ))}
