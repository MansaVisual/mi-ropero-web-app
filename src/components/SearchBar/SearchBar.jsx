import React from "react";

import { Box, IconButton, useMediaQuery } from "@mui/material";
import { StyledInput } from "./styles";
import { IoSearch } from "react-icons/io5";
import theme from "../../styles/theme";

const SearchBar = (props) => {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
        placeholder="Buscá por ropero, producto, marca o talle"
        inputProps={{
          "aria-label": "Buscá por ropero, producto, marca o talle",
        }}
        sx={{ minWidth: { xs: "328px", lg: "530px" } }}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
      />
      <IconButton
        type="submit"
        aria-label="search"
        sx={{ position: "absolute", right: 0, pr: "10px" }}
      >
        <IoSearch fontSize="15px" color="red" />
      </IconButton>
    </Box>
  );
};

export default SearchBar;
