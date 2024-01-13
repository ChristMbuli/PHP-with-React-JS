import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { createTheme, ThemeProvider } from "@mui/material/styles";

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

const defaultTheme = createTheme();

const Register = () => {
  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();

  //Gerer les inputs
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setInputs((values) => ({ ...values, [name]: value }));
  };

  //Création d'un compte
  const handleSubmit = (event) => {
    event.preventDefault();

    // Vérification des champs vides
    const emptyFields = Object.keys(inputs).filter((key) => inputs[key] === "");

    if (emptyFields.length > 0) {
      // Afficher une notification pour chaque champ vide
      emptyFields.forEach((field) => {
        toast.error(`Le champ ${field} ne peut pas être vide`);
      });
    } else {
      axios
        .post("http://localhost/Material-MUI/server/admin/register.php", inputs)
        .then(function (res) {
          if (res.data.status === 201) {
            toast.success("Inscription réussie");
            navigate("/auth/signin");
          } else {
            toast.error("Inscription échouée");
          }
        })
        .catch(function (error) {
          console.log(error);
          toast.error("Veuillez compléter tous les champs");
        });
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
          S'enregistrer
        </Typography>
        <ToastContainer />
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="fname"
                onChange={handleChange}
                value={inputs.fname || ""}
                fullWidth
                id="firstName"
                label="Prénom"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="last-name"
                name="lname"
                onChange={handleChange}
                value={inputs.lname || ""}
                fullWidth
                id="lastName"
                label="Nom"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="email"
                onChange={handleChange}
                value={inputs.email || ""}
                label="Adresse email"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="mdp"
                onChange={handleChange}
                value={inputs.mdp || ""}
                label="Mot de passe"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="J'accepte les Conditon"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            onSubmit={handleSubmit}
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
            S'enregistrer
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/auth/signin" variant="body2">
                Vous avez déjà un compte? Se connecter
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
};

export default Register;
