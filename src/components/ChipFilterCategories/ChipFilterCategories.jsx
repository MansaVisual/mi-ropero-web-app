import React from "react";
import { Chip, ListItem } from "@mui/material";
import theme from "../../styles/theme";
import { useParams } from "react-router-dom";

const ChipFilterCategories = ({ filteredCategory, putCategory, putFilters,
  setPutFilters,setProds,ProdAPI,setTotalPages,categorias,setTienda,clase,metodo,closetId,coleccionName }) => {
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
          (e) => e.nombre.toString().trim() === (keyword!==undefined? keyword.replaceAll('&', '/'):putCategory),
        );

        if(coleccionName!==undefined){
          let numCol=0
          if(coleccionName==="NuevosIngresos"){
            numCol=71
          }else if(coleccionName==="Recomendados"){
              numCol=73
          }else if(coleccionName==="MejoresVendedores"){
              numCol=73
          }
            catProd.append("idcoleccion",numCol)
        }
        if(closetId!==undefined){
          catProd.append("idtienda",closetId)
        }

        catProd.append('idcategoria', idCat.idcategoria);
        catProd.append('bypage', 15);
        catProd.append('page', 0);
        ProdAPI(catProd, clase, metodo).then((res) => {
          if (res.status === 'success') {
            if(setTienda!==undefined){
              setTienda(res.result)
              setTotalPages(res.result.search_productos_total_paginas)
            }else{
              setProds(res.result.productos);
              setTotalPages(res.result.total_paginas);
            }
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
