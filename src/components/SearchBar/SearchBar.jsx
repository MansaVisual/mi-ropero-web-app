import React, { useState } from "react";

import { Box, IconButton, useMediaQuery, Button } from "@mui/material";
import { StyledInput } from "./styles";
import { IoSearch } from "react-icons/io5";
import theme from "../../styles/theme";

const SearchBar = () => {
  const [openSearch, setOpenSearch] = useState(false);
  const [keyword, setKeyword] = useState("");
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleFocus = () => {
    setOpenSearch(true);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log(keyword);
    setOpenSearch(false);
  };

  const handleChange = (evt) => {
    setKeyword(evt.target.value);
  };

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        alignItems: "center",
        position: "relative",
        flex: isMobile ? 1 : null,
      }}
    >
      <StyledInput
        type="text"
        value={keyword}
        placeholder="Buscá por ropero, producto, marca o talle"
        inputProps={{
          "aria-label": "Buscá por ropero, producto, marca o talle",
        }}
        sx={{ minWidth: { xs: "328px", lg: "420px", xl: "530px" } }}
        onFocus={handleFocus}
        onChange={handleChange}
      />
      <IconButton
        type="submit"
        aria-label="search"
        sx={{ position: "absolute", right: 0, pr: "10px" }}
      >
        <IoSearch fontSize="15px" color="red" />
      </IconButton>
      {openSearch && (
        <Box sx={{ height: "40px", display: "flex", justifyContent: "center" }}>
          <Button onClick={handleSubmit}>Productos</Button>
          <Button>Ropero</Button>
        </Box>
      )}
    </Box>
  );
};

export default SearchBar;
