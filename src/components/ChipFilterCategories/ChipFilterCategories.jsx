import React from "react";
import { Chip, ListItem } from "@mui/material";
import theme from "../../styles/theme";
import { useParams } from "react-router-dom";

const ChipFilterCategories = ({ filteredCategory, key, putFilters,setPutFilters,setProds,ProdAPI,setTotalPages,categorias }) => {
  const { keyword, search } = useParams();

  const handleDelete = () => {
    let newArrayId = putFilters.filter(
      (element) => element.id !== filteredCategory.id
    );
    if(newArrayId.length===0){
      if(search===undefined){
        const catProd = new FormData();
        let idCat = '';
        idCat = categorias.find(
          (e) => e.nombre.toString().trim() === keyword.replaceAll('&', '/'),
        );
        catProd.append('idcategoria', idCat.idcategoria);
        catProd.append('bypage', 15);
        catProd.append('page', 0);
        ProdAPI(catProd, 'productos', 'search').then((res) => {
          if (res.status === 'success') {
            setProds(res.result.productos);
            setTotalPages(res.result.total_paginas);
          }
        });
      }
    }
    setPutFilters(newArrayId)
  };

  return (
    <ListItem
      sx={{
        "&.MuiListItem-root": {
          px: 0,
        },
        width: "fit-content",
      }}
    >
      <Chip
        label={filteredCategory.nombre}
        onDelete={() => handleDelete()}
        sx={{
          backgroundColor: "hsla(248, 84%, 93%, 1)",
          color: "hsla(351, 6%, 25%, 1)",
          fontSize: theme.typography.fontSize[2],
          fontWeight: theme.typography.fontWeightRegular,
        }}
      />
    </ListItem>
  );
};

export default ChipFilterCategories;
