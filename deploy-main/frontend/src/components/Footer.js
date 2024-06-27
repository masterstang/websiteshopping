import { Box, Toolbar } from "@mui/material";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import "../pages-css/bar.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";


const theme = createTheme({
  palette: {
    neutral: {
      main: "#eeaa4c",
      contrastText: "#fff",
    },
  },
});

function Footer() {
  return (
    <Box className="downbar">
      <Toolbar>
        <div className="textcontact">Contact</div>
      </Toolbar>
      <div className="contact">
        <Stack direction="row" spacing={2}>
          <div>
            <Avatar alt="Remy Sharp" src="facebook.png" />
          </div>
          <div>
            <ThemeProvider theme={theme}>
              <Button
                variant="contained"
                color="neutral"
                size="small"
                href="https://web.facebook.com/"
                className="button"
              >
                Facebook
              </Button>
            </ThemeProvider>
          </div>

          <div>
            <Avatar alt="Travis Howard" src="instagram.png" />
          </div>
          <div>
            <ThemeProvider theme={theme}>
              <Button
                variant="contained"
                color="neutral"
                size="small"
                href="https://www.instagram.com/"
                className="button"
              >
                Instagram
              </Button>
            </ThemeProvider>
          </div>

          <div>
            <Avatar alt="Cindy Baker" src="line.png" />
          </div>
          <div>
            <ThemeProvider theme={theme}>
              <Button
                variant="contained"
                color="neutral"
                size="small"
                href="https://www.youtube.com/"
                className="button"
              >
                Line
              </Button>
            </ThemeProvider>
          </div>
        </Stack>
        <div className="textcop">Copyright © PSU Local Guide 2022.</div>
      </div>
    </Box>
  );
}

export default Footer;
