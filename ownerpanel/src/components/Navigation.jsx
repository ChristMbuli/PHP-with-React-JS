import React, { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Logo from "../images/finalss.png";
import { Link, Navigate, Route, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";

import axios from "axios";

const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const Navigation = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [userFName, setUserFName] = useState("");

  //---------Securité------------
  useEffect(() => {
    // Vérifier si l'utilisateur est connecté
    const loggedIn = localStorage.getItem("userId");
    const fName = localStorage.getItem("userName");

    if (loggedIn) {
      setIsLoggedIn(true);
      setUserFName(fName);
      setTimeout(() => {
        setIsLoaded(true);
      }, 4000);
    } else {
      navigate("/auth/signin");
    }
  }, [navigate]);

  ///////////////////

  //Menu Déroulant
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  //Déconnexion
  //Gerer la déconnexion de user connecter
  const handleClick = async (event) => {
    event.preventDefault();
    try {
      const userId = localStorage.getItem("userId");

      const response = await axios.post(
        "http://localhost/Material-MUI/server/admin/logout.php",
        { userId } // Envoyer l'ID de l'utilisateur pour identifier la déconnexion
      );

      if (response.status === 200) {
        localStorage.clear();
        navigate("/auth/signin");
      }
    } catch (error) {
      toast.error("Erreur de Déconnexion");
    }
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              <img
                src={Logo}
                alt="logo"
                style={{
                  width: "50px",
                  height: "auto",
                  display: { xs: "none", md: "flex" },
                  marginRight: 1,
                }}
              />
            </Link>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                justifyContent: "center",
              }}
            >
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <Link
                  to={"/"}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Accueil
                </Link>
              </Button>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Réservation
              </Button>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Messages
              </Button>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Trafic
              </Button>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Explorer
              </Button>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={userFName} src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem>
                  <Typography textAlign="center">Profil</Typography>
                </MenuItem>
                <MenuItem>
                  <Typography textAlign="center">Compte</Typography>
                </MenuItem>
                <MenuItem>
                  <Typography textAlign="center">Centre d'aide</Typography>
                </MenuItem>
                <MenuItem>
                  <Typography textAlign="center">
                    Sécurité et Confidentialité
                  </Typography>
                </MenuItem>
                <hr />
                <MenuItem>
                  <Typography textAlign="center">Paramètres</Typography>
                </MenuItem>
                <MenuItem>
                  <Link
                    onClick={handleClick}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <Typography textAlign="center">Déconnexion</Typography>
                  </Link>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
