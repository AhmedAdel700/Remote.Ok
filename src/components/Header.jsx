import { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Button, useMediaQuery } from "@mui/material";
import { Stack } from "@mui/system";
import { Link } from "react-router-dom";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15), //.white
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.25), //.white
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function Header() {
  const isSmallScreen = useMediaQuery("(max-width: 600px)");

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <Stack direction={"column"}>
        <Button
          variant="text"
          color="secondary"
          component={Link}
          to="https://safetywing.com/nomad-health?referenceID=24730000&utm_source=24730000&utm_medium=Ambassador"
          target="_blank"
        >
          Health Insurance
        </Button>
        <Button variant="text" color="error">
          Post A Remote Job
        </Button>
        <Link to="login">
          <Button
            variant="text"
            sx={{
              color: "black",
            }}
          >
            Login
          </Button>
        </Link>
      </Stack>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: "#e0e0e0" }}>
        <Toolbar>
          <Link to="/">
            <Typography
              variant={isSmallScreen ? "body1" : "h6"}
              noWrap
              component="div"
              color={"error"}
              sx={{
                display: {
                  sm: "block",
                  fontWeight: "bold",
                  cursor: "pointer",
                  marginRight: isSmallScreen && "10px",
                },
              }}
            >
              Remote.Ok
            </Typography>
          </Link>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex", gap: "0.7rem" } }}>
            <Button
              variant="contained"
              color="secondary"
              sx={{ textTransform: "capitalize" }}
              component={Link}
              to="https://safetywing.com/nomad-health?referenceID=24730000&utm_source=24730000&utm_medium=Ambassador"
              target="_blank"
            >
              Health Insurance
            </Button>
            <Button
              variant="contained"
              color="error"
              sx={{ textTransform: "capitalize" }}
            >
              Post A Remote Job
            </Button>
            <Link to="login">
              <Button
                variant="contained"
                color="inherit"
                sx={{
                  backgroundColor: "white",
                  color: "black",
                  textTransform: "capitalize",
                }}
              >
                Login
              </Button>
            </Link>
          </Box>

          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {renderMobileMenu}
    </Box>
  );
}
