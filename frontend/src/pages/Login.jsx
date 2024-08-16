import {
  Alert,
  Box,
  Button,
  CssBaseline,
  FormControl,
  Grid,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setEmail, setRole, setId, setAuthenticated } from "../redux/authSlice";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

function Login() {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePassChange = (event) => {
    setPass(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:8080/api/login", {
        email: name,
        password: pass,
      })
      .then((response) => {
        dispatch(setEmail(response.data.email));
        dispatch(setRole(response.data.role));
        dispatch(setId(response.data.id));
        dispatch(setAuthenticated(true));

        if (response.data.role == "ADMIN") {
          navigate("/suppliers-list");
        } else {
          navigate("/supplier-profile");
        }
      })
      .catch(function (error) {
        setSnackbarOpen(true);
        console.log(error);
      });
  };



  const formStyle = {
    padding: "3rem 2rem",
    maxWidth: "40rem",
    borderRadius: "1rem",
    backgroundColor: "rgba(255, 255, 255, 0.89)",
    boxShadow: "10px 8px 10px 1px #2669d4"
  };

  const itemStyle = {
    height: "35rem",
    padding: "0 2rem"
  };

  const resItemStyle = {
    padding: "0 2rem",
    height: "16rem",
    alignContent: "center"
  };

  const headingStyle = {
    color: "#545454",
    textAlign: "center",
    fontSize: "2rem",
    fontWeight: "700",
    marginBottom: "1rem"
  };

  const iconStyle = {
    transform: "scale(1.6)",
    marginBottom: "0.5rem"
  };

  return (
    <Box
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#b8cdff",

      }}
    >
      <CssBaseline />
      <Grid container style={formStyle}>
        <Grid item xs={12} md={6} sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <Box sx={{ display: "flex", justifyContent: "center", color: "green" }}>
            <LockOutlinedIcon style={iconStyle} />
          </Box>
          <Typography style={headingStyle}>Log In</Typography>
        </Grid>
        <Grid item xs={12} md={6} style={screen.width > '679px' ? itemStyle : resItemStyle}>
          <form onSubmit={handleSubmit} style={{ padding: "auto 5rem" }}>
            <FormControl fullWidth>
              <TextField
                sx={{ marginBottom: "0.5rem" }}
                value={name}
                onChange={handleNameChange}
                variant="standard"
                label="Email"
                type="email"
                required
              />
              <TextField
                sx={{ marginBottom: "2rem" }}
                value={pass}
                onChange={handlePassChange}
                variant="standard"
                label="Password"
                type="password"
                required
              />
              <Button
                variant="contained"
                type="submit"
                sx={{ textTransform: "none", marginTop: "0.2rem" }}
              >
                Log In
              </Button>
            </FormControl>
            <Typography
              sx={{
                textAlign: "center",
                marginTop: "0.4rem",
                color: "rgb(66, 66, 66)",
              }}
            >
              New User?&nbsp;
              <Link to="/sign-up">SignUp</Link>
            </Typography>
          </form>
        </Grid>
      </Grid>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Invalid Credentials
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Login;
