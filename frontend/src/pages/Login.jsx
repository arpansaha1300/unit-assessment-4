import { Box, Button, FormControl, FormLabel, TextField, Typography } from "@mui/material";
import { useState } from "react";
import backgroundImg from '../assets/background.jpg';
import { Link } from "react-router-dom";

function Login() {
  const [nameError, setNameError] = useState('');
  const [passError, setPassError] = useState('');

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
  };

  return (
    <Box style={{ position: "relative", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={backgroundStyle} />
      <Box style={formStyle}>
        <FormControl fullWidth>
          <TextField style={inputStyle} variant="outlined" label="Username" error={!!nameError} helperText={nameError} />
          <TextField style={inputStyle} variant="outlined" label="Password" type="password" error={!!passError} helperText={passError} />
          <Button variant="contained"  sx={{textTransform: "none", marginTop: '0.2rem'}}>Log In</Button>
        </FormControl>
        <Typography sx={{textAlign: "center",marginTop: "0.4rem",color: "rgb(66, 66, 66)"}}>New User?  
          <Link to="/sign-up">SignUp</Link>
        </Typography>
      </Box>
    </Box>
  );
}

export default Login;