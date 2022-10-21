import React, { useState } from "react";
import { Link, useLocation,useParams } from "react-router-dom";
import MuiPagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";

const Pagination = ({cantidad,buscarPage}) => {
  const { pathname } = useLocation();
  const [page, setPage] = useState(1);
  const { search } = useParams();

  const handleChange = (event, value) => {
    setPage(value);
    if(search!==undefined){
      buscarPage(true,value)
    }
    if(search===undefined){
      buscarPage(false,value)
    }
  };

  return (
    <MuiPagination
      count={cantidad}
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
