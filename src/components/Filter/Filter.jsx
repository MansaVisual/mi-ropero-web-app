import * as React from "react";
import {
  Divider,
  Box,
  TextField,
  Collapse,
  ListItemText,
  ListItemButton,
  List,
  ListSubheader,
  Radio,
  RadioGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { ListItemStyled } from "./styles";
import theme from "../../styles/theme";

const Filter = (props) => {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      sx={{ width: "100%", maxWidth: 297, bgcolor: "transparent" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader
          component="div"
          id="nested-list-subheader"
          sx={{ bgcolor: "transparent", fontSize: theme.typography.fontSize[9], paddingLeft: 0, paddingBottom: '22px' }}
        >
          {props.children}
        </ListSubheader>
      }
    >
      <Divider />
      <ListItemStyled onClick={handleClick}>
        <ListItemText primary="Ordenar por" sx={{ fontSize: "14px" }} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemStyled>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div">
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
          >
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
        </List>
      </Collapse>
      <Divider />

      <ListItemStyled onClick={handleClick}>
        <ListItemText primary="Marca" sx={{ fontSize: "14px" }} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemStyled>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div">
          <FormControlLabel label="Todos" control={<Checkbox />} />
        </List>
      </Collapse>
      <Divider />

      <ListItemStyled onClick={handleClick}>
        <ListItemText primary="Material" sx={{ fontSize: "14px" }} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemStyled>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div">
          <ListItemButton>
            <ListItemText primary="Starred" />
          </ListItemButton>
        </List>
      </Collapse>
      <Divider />

      <ListItemStyled onClick={handleClick}>
        <ListItemText primary="Género" sx={{ fontSize: "14px" }} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemStyled>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div">
          <ListItemButton>
            <ListItemText primary="Starred" />
          </ListItemButton>
        </List>
      </Collapse>
      <Divider />

      <ListItemStyled onClick={handleClick}>
        <ListItemText primary="Condición" sx={{ fontSize: "14px" }} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemStyled>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div">
          <ListItemButton>
            <ListItemText primary="Starred" />
          </ListItemButton>
        </List>
      </Collapse>
      <Divider />

      <ListItemStyled onClick={handleClick}>
        <ListItemText primary="Color/es" sx={{ fontSize: "14px" }} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemStyled>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div">
          <ListItemButton>
            <ListItemText primary="Starred" />
          </ListItemButton>
        </List>
      </Collapse>
      <Divider />

      <ListItemStyled onClick={handleClick}>
        <ListItemText primary="Origen" sx={{ fontSize: "14px" }} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemStyled>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div">
          <ListItemButton>
            <ListItemText primary="Starred" />
          </ListItemButton>
        </List>
      </Collapse>
      <Divider />

      <ListItemStyled onClick={handleClick}>
        <ListItemText primary="Estilo" sx={{ fontSize: "14px" }} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemStyled>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div">
          <ListItemButton>
            <ListItemText primary="Starred" />
          </ListItemButton>
        </List>
      </Collapse>
      <Divider />
      <List component="div" sx={{ paddingTop: "16px", paddingBottom: "24px" }}>
        <ListItemText
          primary="Rango de precio"
          sx={{ fontSize: "14px", mb: "18px" }}
        />
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
