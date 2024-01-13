import {
  AppBar,
  Avatar,
  Badge,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import MailIcon from "@mui/icons-material/Mail";
import axios from "axios";
import { toast } from "react-toastify";

import MuiAppBar from "@mui/material/AppBar";
import styled from "@emotion/styled";
import MuiDrawer from "@mui/material/Drawer";

const Navbar = () => {
  const navigate = useNavigate();
  const [ownerInfo, setOwnerInfo] = useState(null);

  //------------------------
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  /////Mesure App

  //Avatar menu déroulant

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
    <AppBar position="absolute" open={open}>
      <Toolbar
        sx={{
          pr: "24px",
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer}
          sx={{
            marginRight: "36px",
            ...(open && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1 }}
        ></Typography>

        <Box sx={{ flexGrow: 0 }}>
          <IconButton
            size="large"
            aria-label="show 4 new mails"
            color="inherit"
            sx={{ marginRight: 5 }}
          >
            <Badge badgeContent={2} color="error">
              <MailIcon />
            </Badge>
          </IconButton>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar
                alt={ownerInfo && ownerInfo.fname}
                src="/static/images/avatar/2.jpg"
              />
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
              <Link style={{ textDecoration: "none", color: "inherit" }}>
                Profil
              </Link>
            </MenuItem>
            <MenuItem>
              <Link style={{ textDecoration: "none", color: "inherit" }}>
                Compte
              </Link>
            </MenuItem>
            <MenuItem>
              <Link style={{ textDecoration: "none", color: "inherit" }}>
                Messages
              </Link>
            </MenuItem>
            <MenuItem>
              <Link
                onClick={handleClick}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Déconnexion
              </Link>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
