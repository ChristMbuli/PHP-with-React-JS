import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import ManIcon from "@mui/icons-material/Man";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";

const Cards = () => {
  // ...
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    // Simulate a delay for data loading
    setTimeout(() => {
      setIsLoaded(true);
    }, 4000);
  }, []);

  const houses = [
    {
      id: 1,
      city: "Casablanca",
      district: "Ain Sebaâ",
      rent: 2560,
      cover:
        "https://a0.muscache.com/im/pictures/b708362c-23ce-4ec0-a340-6f955dc94673.jpg?im_w=720",
    },
    {
      id: 2,
      city: "Tanger",
      district: "Medina",
      rent: 4500,
      cover:
        "https://a0.muscache.com/im/pictures/miso/Hosting-765803775581031358/original/1d28b2a8-9520-421b-9288-c94330d1215d.jpeg?im_w=720",
    },
    {
      id: 3,
      city: "Casablanca",
      district: "Anfa",
      rent: 2300,
      cover:
        "https://a0.muscache.com/im/pictures/bb66626c-b2bc-4642-b505-7b91c0f4ac21.jpg?im_w=720",
    },
    {
      id: 34,
      city: "Marrackech",
      district: "Youness",
      rent: 2300,
      cover:
        "https://a0.muscache.com/im/pictures/miso/Hosting-959266728635015422/original/3e6e2554-6c5d-455c-9e68-03c363437f6d.jpeg?im_w=720",
    },
  ];

  // TODO remove, this demo shouldn't need to reset the theme.
  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
      <>
        <Container sx={{ pt: 5, p: 6, minHeight: "83vh" }}>
          {/* End hero unit */}
          <Grid container spacing={3}>
            {isLoaded
              ? houses.map((house) => (
                  <Grid item key={house.id} xs={12} sm={10} md={3}>
                    <Card
                      className="cards"
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Link to={"/"} className="single">
                        <CardMedia sx={{ height: 250 }} image={house.cover} />
                      </Link>

                      <CardContent sx={{ flexGrow: 1 }}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Typography
                            gutterBottom
                            variant="p"
                            component="div"
                            sx={{ fontSize: "1rem", fontWeight: "bold" }}
                          >
                            {house.city}, {house.district}
                          </Typography>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <StarIcon sx={{ fontSize: "1rem" }} />
                            <Typography
                              sx={{ fontSize: "1rem", fontWeight: "bold" }}
                            >
                              {" "}
                              4,43
                            </Typography>
                          </Box>
                        </Box>
                      </CardContent>
                      <CardActions>
                        <Typography
                          sx={{ fontSize: "1.2rem", fontWeight: "medium" }}
                        >
                          {house.rent} dh/mois
                        </Typography>
                      </CardActions>
                    </Card>
                  </Grid>
                ))
              : //Placelholder
                Array.from(new Array(4)).map((_, index) => (
                  <Grid item key={index} xs={12} sm={10} md={3}>
                    <Card
                      className="cards"
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Skeleton variant="rectangular" height={250} />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Skeleton variant="text" width={160} />
                          <Skeleton variant="text" width={40} />
                        </Box>
                        <Skeleton variant="text" width={140} />
                      </CardContent>
                      <CardActions>
                        <Skeleton variant="text" width={100} />
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
          </Grid>
        </Container>
      </>
    </ThemeProvider>
  );
};

export default Cards;
