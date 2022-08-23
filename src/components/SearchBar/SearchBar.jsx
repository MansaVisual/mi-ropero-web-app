import React, { useState } from "react";
import {
  Box,
  IconButton,
  useMediaQuery,
  Button,
  ClickAwayListener,
} from "@mui/material";
import { StyledInput } from "./styles";
import { IoSearch } from "react-icons/io5";
import theme from "../../styles/theme";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [openSearch, setOpenSearch] = useState(false);
  const [keyword, setKeyword] = useState("");
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const navigate = useNavigate();

  const handleFocus = () => {
    setOpenSearch(true);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setOpenSearch(false);
    navigate(`/results/${keyword}`);
  };

  const handleChange = (evt) => {
    setKeyword(evt.target.value);
  };

  return (
    <ClickAwayListener onClickAway={() => setOpenSearch(false)}>
      <Box
        component="form"
        sx={{
          display: "flex",
          alignItems: "center",
          flex: isMobile ? 1 : null,
          fontFamily: theme.typography.fontFamily,
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
          aria-label="search"
          sx={{
            position: "absolute",
            right: { xs: "7%", md: "30%", lg: "38%", xl: "32%" },
          }}
        >
          <IoSearch fontSize="15px" color="red" />
        </IconButton>
        {openSearch && (
          <Box
            sx={{
              position: "absolute",
              top: { xs: "110px", md: "100px", lg: "48px", xl: "48px" },
              left: 0,
              right: 0,
              zIndex: 10,
              backgroundColor: "hsla(0, 0%, 100%, 1)",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              height: "40px",
              boxShadow: "inset 0px 11px 8px -10px rgba(0, 0, 0, 0.2)",
            }}
          >
            <Button
              onClick={handleSubmit}
              sx={{
                textTransform: "none",
                color: "hsla(0, 0%, 53%, 1)",
                backgroundColor: "transparent",
                "&:hover": {
                  color: "hsla(8, 100%, 56%, 1)",
                },
              }}
            >
              Productos
            </Button>
            <Button
              onClick={handleSubmit}
              sx={{
                textTransform: "none",
                color: "hsla(0, 0%, 53%, 1)",
                "&:hover": {
                  color: "hsla(8, 100%, 56%, 1)",
                },
              }}
            >
              Roperos
            </Button>
          </Box>
        )}
      </Box>
    </ClickAwayListener>
  );
};

export default SearchBar;
