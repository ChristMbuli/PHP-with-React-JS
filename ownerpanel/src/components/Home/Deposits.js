import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Title from "./Title";
import MapsHomeWorkOutlinedIcon from "@mui/icons-material/MapsHomeWorkOutlined";
import "./assets/deposits.sass";
import { Box } from "@mui/material";

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits() {
  return (
    <React.Fragment>
      <Title>
        <small className="red-text">Totals Biens</small>
      </Title>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography sx={{ color: "white" }} component="p" variant="h4">
          55
        </Typography>
        <MapsHomeWorkOutlinedIcon sx={{ fontSize: 55, color: "white" }} />
      </Box>

      <Typography color="text.secondary" sx={{ flex: 1 }}>
        Dernier ajout 15 March, 2019
      </Typography>
      <div>
        <Link sx={{ color: "white" }} href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div>
    </React.Fragment>
  );
}
