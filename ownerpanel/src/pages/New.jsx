import {
  Autocomplete,
  Box,
  Button,
  Container,
  Grid,
  TextField,
} from "@mui/material";
import React from "react";

const New = () => {
  return (
    <>
      <h1>Ajouter un Bien</h1>
      <Container>
        <Box component="form" sx={{ mt: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={top100Films}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Ville" />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={top100Films}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Quartier" />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField label="Adresse Complet" name="adress" />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                name="surface"
                label="Surface"
                type="text"
                autoComplete
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                name="rent"
                label="Loyer"
                type="number"
                autoComplete
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                name="caution"
                label=""
                type="number"
                autoComplete
              />
            </Grid>
          </Grid>
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
            Ajouter
          </Button>
        </Box>
      </Container>
    </>
  );
};

const top100Films = [
  { label: "The Shawshank Redemption", year: 1994 },
  { label: "The Godfather", year: 1972 },
  { label: "The Godfather: Part II", year: 1974 },
];

export default New;
