import { Box, Button, CssBaseline, FormControl, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';

function Signup() {
  const [passError, setPassError] = useState('');
  const [confirmPassError, setConfirmPassError] = useState('');
  const [name, setName] = useState('');
  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const navigate = useNavigate();

  const formStyle = {
    padding: "3rem 2rem",
    maxWidth: "40rem",
    borderRadius: "1rem",
    backgroundColor: "rgba(255, 255, 255, 0.89)",
    boxShadow: "10px 8px 10px 1px #2669d4"
  };

  const headingStyle = {
    color: "#545454",
    textAlign: "center",
    fontSize: "2rem",
    fontWeight: "700",
    marginBottom: "1rem"
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

  const iconStyle = {
    transform: "scale(1.6)",
    marginBottom: "0.5rem"
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  }

  const handlePassChange = (event) => {
    setPass(event.target.value);
    setPassError('');
    setConfirmPassError('');
  }

  const handleConfirmPassChange = (event) => {
    setConfirmPass(event.target.value);
    setConfirmPassError('');
  }

  const validateDetails = (pass, confirmPass) => {
    let valid = true;
    if (pass != confirmPass) {
      setConfirmPassError("Passwords do not match");
      valid = false;
    }
    return valid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const valid = validateDetails(pass, confirmPass);

    if (valid) {
      console.log('Form submitted successfully!');
      navigate('/');
    }
  }

  return (
    <Box style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#b8cdff" }}>
      <CssBaseline />
        <Grid container style={formStyle}>
          <Grid item xs={12} md={6} sx={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
            <Box sx={{ display: "flex", justifyContent: "center", color: "green" }}>
              <VpnKeyOutlinedIcon style={iconStyle} />
            </Box>
            <Typography style={headingStyle}>Sign Up</Typography>
          </Grid>
          <Grid item xs={12} md={6} style={screen.width>'679px' ? itemStyle : resItemStyle}>
            <form onSubmit={handleSubmit}>
              <FormControl fullWidth>
                <TextField
                  value={name}
                  onChange={handleNameChange}
                  variant="standard"
                  label="Username"
                  required
                />
                <TextField
                  value={pass}
                  onChange={handlePassChange}
                  variant="standard"
                  label="Password"
                  type="password"
                  required
                  error={!!passError}
                  helperText={passError}
                />
                <TextField
                  sx={{ marginBottom: "3rem" }}
                  value={confirmPass}
                  onChange={handleConfirmPassChange}
                  variant="standard"
                  label="Confirm Password"
                  type="password"
                  required
                  error={!!confirmPassError}
                  helperText={confirmPassError}
                />
                <Button variant="contained" type="submit" sx={{ textTransform: "none", marginTop: '0.2rem' }}>Register</Button>
              </FormControl>
            </form>
          </Grid>
        </Grid>
    </Box>
  );
}

export default Signup;