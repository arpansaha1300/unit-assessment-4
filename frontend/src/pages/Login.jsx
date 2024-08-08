import { Box, Button, CssBaseline, FormControl, TextField, Typography } from "@mui/material";
import { useState } from "react";
import backgroundImg from '../assets/background.jpg';
import { Link } from "react-router-dom";

function Login() {
  const [nameError, setNameError] = useState('');
  const [passError, setPassError] = useState('');
  const [name, setName] = useState('');
  const [pass, setPass] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
    setNameError('');
  }

  const handlePassChange = (event) => {
    setPass(event.target.value);
    setPassError('');
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    let valid = true;

    if (!name) {
      setNameError('Username is required');
      valid = false;
    } else if (!name.includes('@gmail.com')) {
      setNameError('Username must be an email (e.g. user@gmail.com)');
      valid = false;
    }

    if (!pass) {
      setPassError('Password is required');
      valid = false;
    }

    if (valid) {
      console.log('Form submitted successfully!');
    }
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
              error={!!nameError}
              helperText={nameError}
            />
            <TextField
              style={inputStyle}
              value={pass}
              onChange={handlePassChange}
              variant="outlined"
              label="Password"
              type="password"
              error={!!passError}
              helperText={passError}
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