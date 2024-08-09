import { Box, Button, CssBaseline, FormControl, TextField, Typography } from "@mui/material";
import { useState } from "react";
import backgroundImg from '../assets/background.jpg';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import {setEmail, setRole, setId} from '../redux/authSlice'

function Login() {
  const [name, setName] = useState('');
  const [pass, setPass] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      .then((response) => {
        if(response.data.role == 'ADMIN'){
          dispatch(() => {
            setEmail(response.data.email);
            setRole(response.data.role);
            setId(response.data.id);
          });
          navigate('/suppliers-list');
        }
        else{
          dispatch(() => {
            setEmail(response.data.email);
            setRole(response.data.role);
            setId(response.data.id);
          });
          navigate('/supplier-profile');
        }
      }
      )
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
              label="Email"
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