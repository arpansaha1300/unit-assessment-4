import { Box, Button, CssBaseline, FormControl, TextField, Typography } from "@mui/material";
import { useState } from "react";
import backgroundImg from '../assets/background.jpg';
import { Link } from "react-router-dom";
import axios from "axios";

function Login() {
  const [name, setName] = useState('');
  const [pass, setPass] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  }

  const handlePassChange = (event) => {
    setPass(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post("http://localhost:8080/api/login", {
        email: name,
        password: pass
      })
      .then(function (response) {
        console.log(response.body);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const backgroundStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    backgroundImage: `url(${backgroundImg})`,
    filter: "blur(8px)",
    WebkitFilter: "blur(8px)",
    zIndex: 0, 
  };

  const inputStyle = {
    marginBottom: "1rem"
  };

  const formStyle = {
    border: "0.2rem solid #ffffff",
    padding: "3rem 1rem",
    borderRadius: "1rem",
    backgroundColor: "rgba(255, 255, 255, 0.479)",
    position: "relative",
    zIndex: 1,
    width: "25rem",
    boxShadow: "#ffffff 0 0 9px 2px"
  };

  return (
    <Box style={{ position: "relative", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <CssBaseline />
      <div style={backgroundStyle} />
      <Box style={formStyle}>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth>
            <TextField
              style={inputStyle}
              value={name}
              onChange={handleNameChange}
              variant="outlined"
              label="Username"
              type="email"
              required
            />
            <TextField
              style={inputStyle}
              value={pass}
              onChange={handlePassChange}
              variant="outlined"
              label="Password"
              type="password"
              required
            />
            <Button variant="contained" type="submit" sx={{ textTransform: "none", marginTop: '0.2rem' }}>Log In</Button>
          </FormControl>
        </form>
        <Typography sx={{ textAlign: "center", marginTop: "0.4rem", color: "rgb(66, 66, 66)" }}>
          New User?  
          <Link to="/sign-up">SignUp</Link>
        </Typography>
      </Box>
    </Box>
  );
}

export default Login;