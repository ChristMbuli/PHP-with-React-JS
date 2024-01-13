import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Skeleton } from "@mui/material";
import Cards from "../components/Cards";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userFName, setUserFName] = useState("");

  const navigate = useNavigate();

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

  return (
    <>
      <Box sx={{ display: { xs: "none", md: "flex" } }}>
        {isLoaded ? (
          <Typography variant="h4" sx={{ p: 3, fontWeight: "bold" }}>
            Bienvenue {userFName}
          </Typography>
        ) : (
          <Typography sx={{ p: 3 }}>
            <Skeleton variant="text" width={100} />
          </Typography>
        )}
      </Box>
      <Cards />
    </>
  );
};

export default Home;
