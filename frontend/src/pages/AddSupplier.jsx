import { Button, FormControl, TextField } from "@mui/material"
import { useState } from "react"



function AddSupplier() {
  const [nameError, setNameError] = useState('');
  const [passError, setPassError] = useState('');
  const [contactError, setContactError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [contact, setContact] = useState();
  const [pass, setPass] = useState();

  const validateDetails = (name, email, contact, pass) => {
    var regExp = /[a-zA-Z]/g;
    var res = true;
    if(!name){
      setNameError('Please enter a name');
      res=false;
    }
    if(!email){
      setEmailError('Please enter an email address');
      res=false;
    }
    if(!email.includes("@gmail.com")){
      setEmailError('Please enter a valid email (e.g. user@gmail.com)');
      res=false;
    }
    if(!contact){
      setContactError('Please enter a contact number');
      res=false;
    }
    if(!(contact.length === 10)){
      setContactError('Please enter a 10 digit contact number');
      res=false;
    }
    if(regExp.test(contact)){
      setContactError('Contact number should contain only numbers');
      res=false;
    }
    if(!pass){
      setPassError('Please enter a password');
      res=false;
    }
    return res;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const res = validateDetails(name, email, contact, pass);
    if(res){
      console.log("form submitted succesfully");
    }
  };

  return (
    <form align="center" onSubmit={handleSubmit}>
        <FormControl sx={{width: "24rem", marginTop: "3rem"}}>
        <TextField
            margin="dense"
            label="Name"
            onChange={(e) => {
              setName(e.target.value);
              setNameError('');
            }}
            error={!!nameError}
            helperText={nameError}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Email"
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError('');
            }}
            error={!!emailError}
            helperText={emailError}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Contact"
            onChange={(e) => {
              setContact(e.target.value);
              setContactError('');
            }}
            error={!!contactError}
            helperText={contactError}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Password"
            type="password"
            onChange={(e) => {
              setPass(e.target.value);
              setPassError('');
            }}
            error={!!passError}
            helperText={passError}
            fullWidth
          />
          <Button variant="contained" type="submit" sx={{ textTransform: "none", marginTop: '1.2rem' }}>Log In</Button>
        </FormControl>
    </form>
  )
}

export default AddSupplier