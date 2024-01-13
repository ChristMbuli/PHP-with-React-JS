import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Collapse,
  Container,
  CssBaseline,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const Login = () => {
  const [inputs, setInputs] = useState({ email: "", mdp: "" });

  const navigate = useNavigate();

  // Gerer les inputs
  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  // Soumettre le formulaire pour authentifier un user
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost/Material-MUI/server/admin/login.php",
        inputs
      );

      if (response.status === 200) {
        const userData = response.data.user;

        localStorage.setItem("userId", userData.id_owner);
        localStorage.setItem("userName", userData.fname);
        localStorage.setItem("userProfil", userData.profil);

        console.log("Profil: ", userData.profil);

        navigate("/");
      } else {
        const responseData = response.data;

        if (responseData.status === 401) {
          // Mauvais mot de passe ou e-mail incorrect
          toast.error("Compte introuvable !");
        } else if (responseData.status === 404) {
          // E-mail non trouvé
          toast.error("Adresse email incorrecte");
        } else {
          // Autres erreurs
          toast.error("Erreur de connexion");
        }
      }
    } catch (error) {
      toast.error("Erreur !");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "#d6b647" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Connexion
        </Typography>
        <ToastContainer />
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            margin="normal"
            fullWidth
            id="email"
            label="Adresse email"
            onChange={handleChange}
            value={inputs.email || ""}
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            fullWidth
            name="mdp"
            onChange={handleChange}
            value={inputs.mdp || ""}
            label="Mot de passe"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              bgcolor: "#d6b647",
              "&:hover": {
                bgcolor: "#e6c550",
              },
            }}
          >
            Connexion
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/auth/signup" variant="body2">
                Vous n'avez pas de compte? S'inscrire
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
};

export default Login;
