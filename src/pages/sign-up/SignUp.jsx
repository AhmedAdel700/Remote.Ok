import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import bgPic from "../../../public/images/bgPic.jpg";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export default function SignUp() {
  const isSmallScreen = useMediaQuery("(max-width: 600px)");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <Box
        sx={{
          width: "100vw",
          height: "calc(100vh - 64px)",
          backgroundImage: `url(${bgPic})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "10px",
        }}
      >
        <Paper
          elevation={2}
          variant="elevation"
          sx={{
            width: isSmallScreen ? "400px" : "600px",
            height: isSmallScreen ? "390px" : "400px",
            margin: "0 auto",
            padding: "0 1rem ",
            bgcolor: "#e0e0e0",
            border: "3px solid red",
          }}
        >
          <Box
            onSubmit={handleSubmit(onSubmit)}
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "fitContent" },
              display: "flex",
              flexDirection: "column",
              width: "100%",
              margin: "2rem auto",
              gap: 1,
            }}
            noValidate
            autoComplete="off"
          >
            <Stack direction="row" sx={{ gap: 2 }}>
              <TextField
                id="username"
                label="Choose Username"
                variant="filled"
                sx={{ flex: 1 }}
                error={errors.username}
                helperText={
                  errors.username
                    ? "This Field Can't Be Empty Or Less Than 3 Characters"
                    : null
                }
                {...register("username", { required: true, minLength: 3 })}
              />
            </Stack>

            <TextField
              id="filled-basic"
              label="Wirte Your Email"
              variant="filled"
              error={errors.email}
              helperText={errors.email ? "Write A Valid Email Please" : null}
              {...register("email", { required: true, pattern: emailRegex })}
            />

            <Stack direction="row" sx={{ gap: 2 }}>
              <TextField
                id="password"
                label="Set A Password"
                variant="filled"
                sx={{ flex: 1 }}
                error={errors.password}
                helperText={
                  errors.password
                    ? "This Field Can't Be Empty Or Less Than 8 Characters"
                    : null
                }
                {...register("password", { required: true, minLength: 8 })}
              />
            </Stack>

            <Button
              type="submit"
              variant="contained"
              color="error"
              style={{ marginLeft: "auto", width: "fitContent" }}
            >
              Create My Account
            </Button>

            <Typography textAlign={"center"}>
              Already A Member ?{" "}
              <Link to="/login" style={{ fontWeight: "bold", color: "red" }}>
                Login
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </>
  );
}
