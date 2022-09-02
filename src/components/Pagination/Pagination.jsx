import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import MuiPagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";

const Pagination = () => {
  const { pathname } = useLocation();
  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };
  return (
    <MuiPagination
      count={10}
      page={page}
      onChange={handleChange}
      renderItem={(item) => (
        <PaginationItem
          component={Link}
          to={`${pathname}?page=${item.page}`}
          {...item}
        />
      )}
    />
  );
};

export default Pagination;
