import React from "react";
import { Link, useLocation,useParams } from "react-router-dom";
import MuiPagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";

const Pagination = ({cantidad,buscarPage,pags,setPags}) => {
  const { pathname } = useLocation();
  const { search } = useParams();

  const handleChange = (event, value) => {
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
          to={`${pathname}`}
          {...item}
        />
      )}
    />
  );
};

export default Pagination;
