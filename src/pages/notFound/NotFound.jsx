import { Button, Stack, Typography, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";

export default function NotFound() {
  const isSmallScreen = useMediaQuery("(max-width: 600px)");
  return (
    <Stack
      direction={"column"}
      alignItems={"center"}
      sx={{
        userSelect: "none",
        gap: isSmallScreen ? "1rem" : "1.2rem",
        mt: isSmallScreen ? "2rem" : "10rem",
      }}
      textAlign={"center"}
    >
      <Typography variant={isSmallScreen ? "h6" : "h5"}>
        The Page You Are Looking For Is Not Found
      </Typography>

      <Link to={"/"} style={{ width: "fit-content" }}>
        <Button variant="contained" color="error">
          Back To Home Page
        </Button>
      </Link>
    </Stack>
  );
}
