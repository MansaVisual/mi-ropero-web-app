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
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const isMobileBigScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const navigate = useNavigate();

  const handleFocus = () => {
    setOpenSearch(true);
  };

  const handleSubmit = (evt, route) => {
    evt.preventDefault();
    setOpenSearch(false);
    navigate(`/${route}/${keyword}`);
    setKeyword("");
  };

  const handleChange = (evt) => {
    setKeyword(evt.target.value);
  };

  return (
    <ClickAwayListener onClickAway={() => setOpenSearch(false)}>
      <Box
        onSubmit={(e) => e.preventDefault()}
        component="form"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          fontFamily: theme.typography.fontFamily,
          flex: isMobile || isMobileBigScreen ? 1 : 0,
        }}
      >
        <StyledInput
          type="text"
          value={keyword}
          placeholder="Buscá por ropero, producto, marca o talle"
          inputProps={{
            "aria-label": "Buscá por ropero, producto, marca o talle",
          }}
          sx={{
            minWidth: { xs: "unset", lg: "420px", xl: "530px" },
            position: "relative",
            "&.MuiInputBase-root .MuiInputBase-input": {
              padding: "4px calc(45px + 3%) 4px 0",
            },
          }}
          onFocus={handleFocus}
          onChange={handleChange}
        />
        <IconButton
          type="button"
          aria-label="search"
          sx={{
            position: "absolute",
            right: "8px",
          }}
        >
          <IoSearch fontSize="15px" color="red" />
        </IconButton>
        {openSearch && (
          <Box
            sx={{
              position: "fixed",
              top: { xs: "120px", md: "100px", lg: "48px", xl: "48px" },
              left: 0,
              right: 0,
              zIndex: 10,
              backgroundColor: theme.palette.secondary.contrastText,
              width: "100%",
              display: "flex",
              justifyContent:
                isMobile || isMobileBigScreen ? "space-evenly" : "center",
              alignItems: "center",
              height: "48px",
              boxShadow: "0 11px 8px -10px hsla(0, 0%, 0%, 0.2)",
            }}
          >
            <Button
              onClick={(e) => handleSubmit(e, "productos")}
              disabled={keyword.length === 0}
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
              onClick={(e) => handleSubmit(e, "roperos")}
              disabled={keyword.length === 0}
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
