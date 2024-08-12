import {
  Box,
  Button,
  CssBaseline,
  FormControl,
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
        alert("Invalid credentials");
        console.log(error);
      });
  };

  const backgroundStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    backgroundColor: "#70a5fa",
    zIndex: 0,
  };



  const formStyle = {
    display: "flex",
    padding: "3rem 2rem",
    borderRadius: "1rem",
    backgroundColor: "rgba(255, 255, 255, 0.89)",
    position: "relative",
    zIndex: 1,
    height: "25rem",
    boxShadow: "10px 10px 10px 4px #2669d4"
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
        position: "relative",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CssBaseline />
      <div style={backgroundStyle} />
      <Box style={formStyle}>
        <Box sx={{ margin: "auto 4rem" }}>
          <Box sx={{ display: "flex", justifyContent: "center", color: "green" }}>
            <LockOutlinedIcon style={iconStyle} />
          </Box>
          <Typography style={headingStyle}>Log In</Typography>
        </Box>
        <Box sx={{ margin: "auto 4rem auto 2rem", borderLeft: "1px solid grey", paddingLeft: "6rem" }}>
          <form onSubmit={handleSubmit}>
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
              New User?
              <Link to="/sign-up">SignUp</Link>
            </Typography>
          </form>
        </Box>
      </Box>
    </Box>
  );
}

export default Login;
