import { Alert, Box, Button, FormControl, Snackbar, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createOrUpdateTab } from "../redux/tabSlice";
import axios from "axios";

function AddSupplier() {
  const dispatch = useDispatch();
  const [nameError, setNameError] = useState("");
  const [passError, setPassError] = useState("");
  const [contactError, setContactError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [contact, setContact] = useState();
  const [pass, setPass] = useState();
  const [state, setState] = useState({
    open: false,
    vertical: 'bottom',
    horizontal: 'right',
  });
  const { vertical, horizontal, open } = state;

  const handleSubmission = () => {
    setState({
      vertical: 'bottom',
      horizontal: 'right', open: true });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  useEffect(() => {
    dispatch(createOrUpdateTab("/add-supplier"));
  }, [dispatch]);

  const validateDetails = (name, email, contact, pass) => {
    var regExp = /[a-zA-Z]/g;
    var res = true;
    if (!name) {
      setNameError("Please enter a name");
      res = false;
    }
    if (!email) {
      setEmailError("Please enter an email address");
      res = false;
    }
    if (!contact) {
      setContactError("Please enter a contact number");
      res = false;
    }
    if (!pass) {
      setPassError("Please enter a password");
      res = false;
    }
    if (!(contact.length === 10)) {
      setContactError("Please enter a 10 digit contact number");
      res = false;
    }
    if (regExp.test(contact)) {
      setContactError("Contact number should contain only numbers");
      res = false;
    }
    if (!email.includes("@gmail.com")) {
      setEmailError("Please enter a valid email (e.g. user@gmail.com)");
      res = false;
    }
    return res;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const res = validateDetails(name, email, contact, pass);
    if (res) {
      axios.post('http://localhost:8080/api/suppliers', {
          name: name,
          email: email,
          password: pass,
          contactInfo: contact
      })
      .then(function (response) {
        console.log(response);
        handleSubmission();
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  };

  return (
    <Box sx={{ maxWidth: "24rem", margin: "auto" }}>
      <form onSubmit={handleSubmit}>
        <FormControl sx={{ width: "24rem", marginTop: "3rem" }}>
          <TextField
            margin="dense"
            label="Name"
            onChange={(e) => {
              setName(e.target.value);
              setNameError("");
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
              setEmailError("");
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
              setContactError("");
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
              setPassError("");
            }}
            error={!!passError}
            helperText={passError}
            fullWidth
          />
          <Button
            variant="contained"
            type="submit"
            sx={{ textTransform: "none", marginTop: "1.2rem" }}
          >
            Add Supplier
          </Button>
        </FormControl>
      </form>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        key={vertical + horizontal}
      >
          <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Supplier successfully added
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default AddSupplier;
