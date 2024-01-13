import {
  Box,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";

const actions = [
  { icon: <FileCopyIcon />, name: "Copy" },
  { icon: <SaveIcon />, name: "Save" },
  { icon: <PrintIcon />, name: "Print" },
  {
    icon: <AddCircleOutlineIcon />,
    name: "Nouvelle maison",
    link: "/house/form",
  },
];

const Footer = () => {
  return (
    <>
      <Box
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
          zIndex: 9999,
          transform: "translateZ(0px)",
        }}
      >
        <SpeedDial ariaLabel="SpeedDial basic example" icon={<SpeedDialIcon />}>
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={
                <Link
                  to={action.link}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {action.icon}
                </Link>
              }
              tooltipTitle={action.name}
            />
          ))}
        </SpeedDial>
      </Box>
      <Typography variant="body2" color="text.secondary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="https://mui.com/">
          Your Website
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </>
  );
};

export default Footer;
