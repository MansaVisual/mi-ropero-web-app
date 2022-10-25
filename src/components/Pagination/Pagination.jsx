import React, { useState } from "react";
import { Link, useLocation,useParams } from "react-router-dom";
import MuiPagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";

const Pagination = ({cantidad,buscarPage,pags,setPags}) => {
  const { pathname } = useLocation();
  const [page, setPage] = useState(1);
  const { search } = useParams();

  const handleChange = (event, value) => {
    setPage(value);
    setPags(value)
    if(search!==undefined){
      buscarPage(true,value-1)
    }
    if(search===undefined){
      buscarPage(false,value-1)
    }
  };

  return (
    <MuiPagination
      count={cantidad}
      page={pags}
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
