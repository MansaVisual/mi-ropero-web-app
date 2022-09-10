import React, { useState } from "react";
import {
  Divider,
  Box,
  TextField,
  Collapse,
  ListItemText,
  List,
  ListSubheader,
  Radio,
  RadioGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {
  FormControlLabelStyled,
  ListItemPriceRangeStyled,
  ListItemStyled,
  ListItemTextStyled,
} from "./styles";
import theme from "../../styles/theme";

const Filter = (props) => {
  const [openFilter, setOpenFilter] = useState({
    sort: false,
    brand: false,
    material: false,
    gender: false,
    condition: false,
    color: false,
    origin: false,
    style: false,
  });

  const handleClick = (filter) => {
    setOpenFilter({ ...openFilter, [filter]: !openFilter[filter] });
  };

  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 297,
        bgcolor: "transparent",
        fontFamily: theme.typography.fontFamily,
      }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader
          component="div"
          id="nested-list-subheader"
          sx={{
            bgcolor: "transparent",
            fontSize: theme.typography.fontSize[9],
            paddingLeft: 0,
            paddingBottom: "22px",
            fontFamily: theme.typography.fontFamily,
          }}
        >
          {props.children}
        </ListSubheader>
      }
    >
      <Divider />
      <ListItemStyled onClick={() => handleClick("sort")}>
        <ListItemText primary="Ordenar por" sx={ListItemTextStyled} />
        {openFilter.sort ? <ExpandLess /> : <ExpandMore />}
      </ListItemStyled>
      <Collapse in={openFilter.sort} timeout="auto" unmountOnExit>
        <List component="div">
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="Mas relevante primero"
            name="radio-buttons-group"
          >
            <FormControlLabel
              value="Mas relevante primero"
              control={<Radio />}
              label="Mas relevante primero"
              sx={FormControlLabelStyled}
            />
            <FormControlLabel
              value="Menos relevante primero"
              control={<Radio />}
              label="Menos relevante primero"
              sx={FormControlLabelStyled}
            />
            <FormControlLabel
              value="Mayor precio primero"
              control={<Radio />}
              label="Mayor precio primero"
              sx={FormControlLabelStyled}
            />
            <FormControlLabel
              value="Menor precio primero"
              control={<Radio />}
              label="Menor precio primero"
              sx={FormControlLabelStyled}
            />
          </RadioGroup>
        </List>
      </Collapse>
      <Divider />

      <ListItemStyled onClick={() => handleClick("brand")}>
        <ListItemText primary="Marca" sx={ListItemTextStyled} />
        {openFilter.brand ? <ExpandLess /> : <ExpandMore />}
      </ListItemStyled>
      <Collapse in={openFilter.brand} timeout="auto" unmountOnExit>
        <List component="div">
          <FormControlLabel
            label="Todos"
            control={<Checkbox />}
            sx={FormControlLabelStyled}
          />
        </List>
        <List component="div">
          <FormControlLabel
            label="Giesso"
            control={<Checkbox />}
            sx={FormControlLabelStyled}
          />
        </List>
        <List component="div">
          <FormControlLabel
            label="Sarkany"
            control={<Checkbox />}
            sx={FormControlLabelStyled}
          />
        </List>
        <List component="div">
          <FormControlLabel
            label="Tascani"
            control={<Checkbox />}
            sx={FormControlLabelStyled}
          />
        </List>
        <List component="div">
          <FormControlLabel
            label="Valdez"
            control={<Checkbox />}
            sx={FormControlLabelStyled}
          />
        </List>
        <List component="div">
          <FormControlLabel
            label="Zara"
            control={<Checkbox />}
            sx={FormControlLabelStyled}
          />
        </List>
      </Collapse>
      <Divider />

      <ListItemStyled onClick={() => handleClick("material")}>
        <ListItemText primary="Material" sx={ListItemTextStyled} />
        {openFilter.material ? <ExpandLess /> : <ExpandMore />}
      </ListItemStyled>
      <Collapse in={openFilter.material} timeout="auto" unmountOnExit>
        <List component="div">
          <FormControlLabel
            label="Todos"
            control={<Checkbox />}
            sx={FormControlLabelStyled}
          />
        </List>
        <List component="div">
          <FormControlLabel
            label="Cuero"
            control={<Checkbox />}
            sx={FormControlLabelStyled}
          />
        </List>
        <List component="div">
          <FormControlLabel
            label="Ecocuero"
            control={<Checkbox />}
            sx={FormControlLabelStyled}
          />
        </List>
        <List component="div">
          <FormControlLabel
            label="Lona"
            control={<Checkbox />}
            sx={FormControlLabelStyled}
          />
        </List>
      </Collapse>
      <Divider />

      <ListItemStyled onClick={() => handleClick("gender")}>
        <ListItemText primary="Género" sx={ListItemTextStyled} />
        {openFilter.gender ? <ExpandLess /> : <ExpandMore />}
      </ListItemStyled>
      <Collapse in={openFilter.gender} timeout="auto" unmountOnExit>
        <List component="div">
          <FormControlLabel
            label="Todos"
            control={<Checkbox />}
            sx={FormControlLabelStyled}
          />
        </List>
        <List component="div">
          <FormControlLabel
            label="Genderless"
            control={<Checkbox />}
            sx={FormControlLabelStyled}
          />
        </List>
        <List component="div">
          <FormControlLabel
            label="Hombre"
            control={<Checkbox />}
            sx={FormControlLabelStyled}
          />
        </List>
        <List component="div">
          <FormControlLabel
            label="Mujer"
            control={<Checkbox />}
            sx={FormControlLabelStyled}
          />
        </List>
        <List component="div">
          <FormControlLabel
            label="Niñez"
            control={<Checkbox />}
            sx={FormControlLabelStyled}
          />
        </List>
        <List component="div">
          <FormControlLabel
            label="Unisex"
            control={<Checkbox />}
            sx={FormControlLabelStyled}
          />
        </List>
      </Collapse>
      <Divider />

      <ListItemStyled onClick={() => handleClick("condition")}>
        <ListItemText primary="Condición" sx={ListItemTextStyled} />
        {openFilter.condition ? <ExpandLess /> : <ExpandMore />}
      </ListItemStyled>
      <Collapse in={openFilter.condition} timeout="auto" unmountOnExit>
        <List component="div">
          <FormControlLabel
            label="Todos"
            control={<Checkbox />}
            sx={FormControlLabelStyled}
          />
        </List>
        <List component="div">
          <FormControlLabel
            label="Nuevo"
            control={<Checkbox />}
            sx={FormControlLabelStyled}
          />
        </List>
        <List component="div">
          <FormControlLabel
            label="Nuevo con etiqueta"
            control={<Checkbox />}
            sx={FormControlLabelStyled}
          />
        </List>
        <List component="div">
          <FormControlLabel
            label="Usado"
            control={<Checkbox />}
            sx={FormControlLabelStyled}
          />
        </List>
      </Collapse>
      <Divider />

      <ListItemStyled onClick={() => handleClick("color")}>
        <ListItemText primary="Color/es" sx={ListItemTextStyled} />
        {openFilter.color ? <ExpandLess /> : <ExpandMore />}
      </ListItemStyled>
      <Collapse in={openFilter.color} timeout="auto" unmountOnExit>
        <List component="div">
          <FormControlLabel
            label="Todos"
            control={<Checkbox />}
            sx={FormControlLabelStyled}
          />
        </List>
        <List component="div">
          <FormControlLabel
            label="Amarillo"
            control={<Checkbox />}
            sx={FormControlLabelStyled}
          />
        </List>
        <List component="div">
          <FormControlLabel
            label="Azul"
            control={<Checkbox />}
            sx={FormControlLabelStyled}
          />
        </List>
        <List component="div">
          <FormControlLabel
            label="Azul claro"
            control={<Checkbox />}
            sx={FormControlLabelStyled}
          />
        </List>
        <List component="div">
          <FormControlLabel
            label="Beige"
            control={<Checkbox />}
            sx={FormControlLabelStyled}
          />
        </List>
        <List component="div">
          <FormControlLabel
            label="Blanco"
            control={<Checkbox />}
            sx={FormControlLabelStyled}
          />
        </List>
      </Collapse>
      <Divider />

      <ListItemStyled onClick={() => handleClick("origin")}>
        <ListItemText primary="Origen" sx={ListItemTextStyled} />
        {openFilter.origin ? <ExpandLess /> : <ExpandMore />}
      </ListItemStyled>
      <Collapse in={openFilter.origin} timeout="auto" unmountOnExit>
        <List component="div">
          <FormControlLabel
            label="Todos"
            control={<Checkbox />}
            sx={FormControlLabelStyled}
          />
        </List>
        <List component="div">
          <FormControlLabel
            label="Nacional"
            control={<Checkbox />}
            sx={FormControlLabelStyled}
          />
        </List>
        <List component="div">
          <FormControlLabel
            label="Importado"
            control={<Checkbox />}
            sx={FormControlLabelStyled}
          />
        </List>
      </Collapse>
      <Divider />

      <ListItemStyled onClick={() => handleClick("style")}>
        <ListItemText primary="Estilo" sx={ListItemTextStyled} />
        {openFilter.style ? <ExpandLess /> : <ExpandMore />}
      </ListItemStyled>
      <Collapse in={openFilter.style} timeout="auto" unmountOnExit>
        <List component="div">
          <FormControlLabel
            label="Todos"
            control={<Checkbox />}
            sx={FormControlLabelStyled}
          />
        </List>
        <List component="div">
          <FormControlLabel
            label="Casual"
            control={<Checkbox />}
            sx={FormControlLabelStyled}
          />
        </List>
        <List component="div">
          <FormControlLabel
            label="Clasico"
            control={<Checkbox />}
            sx={FormControlLabelStyled}
          />
        </List>
        <List component="div">
          <FormControlLabel
            label="Deportivo"
            control={<Checkbox />}
            sx={FormControlLabelStyled}
          />
        </List>
        <List component="div">
          <FormControlLabel
            label="Fiesta"
            control={<Checkbox />}
            sx={FormControlLabelStyled}
          />
        </List>
        <List component="div">
          <FormControlLabel
            label="Vintage"
            control={<Checkbox />}
            sx={FormControlLabelStyled}
          />
        </List>
      </Collapse>
      <Divider />

      <List component="div" sx={{ paddingTop: "16px", paddingBottom: "24px" }}>
        <ListItemText primary="Rango de precio" sx={ListItemPriceRangeStyled} />
        <Box sx={{ display: "flex" }}>
          <TextField
            id="outlined-basic"
            label="$ Minimo"
            variant="outlined"
            sx={{ mr: "16px", fontSize: "13px", width: "120px" }}
            size="small"
          />
          <TextField
            id="outlined-basic"
            label="$ Maximo"
            variant="outlined"
            sx={{ fontSize: "13px", width: "120px" }}
            size="small"
          />
        </Box>
      </List>
      <Divider />
    </List>
  );
};

export default Filter;
