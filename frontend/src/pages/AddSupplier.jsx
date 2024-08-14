import {
  Alert,
  Box,
  Button,
  FormControl,
  Snackbar,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOrUpdateTab } from "../redux/tabSlice";
import axios from "axios";
import {
  updateAddSupplierSessionContact,
  updateAddSupplierSessionEmail,
  updateAddSupplierSessionName,
} from "../redux/addSupplierSessionSlice";

function AddSupplier() {
  const dispatch = useDispatch();
  const [nameError, setNameError] = useState("");
  const [contactError, setContactError] = useState("");
  const [emailError, setEmailError] = useState("");
  const session = useSelector((state) => state.addSupplier);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    dispatch(createOrUpdateTab("/add-supplier"));
  }, [dispatch]);

  const validateDetails = (contact) => {
    const regExp = /^[0-9]+$/g;
    let res = true;
    if (!regExp.test(contact)) {
      setContactError("Contact number should contain only numbers");
      res = false;
    }
    if (contact.length != 10) {
      setContactError("Contact number should be 10 digits only");
      res = false;
    }
    return res;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const res = validateDetails(session.contactInfo);
    if (res) {
      axios
        .post("http://localhost:8080/api/suppliers", {
          name: session.name,
          email: session.email,
          contactInfo: session.contactInfo,
        })
        .then(() => {
          setSnackbarOpen(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  function updateName(e) {
    dispatch(updateAddSupplierSessionName(e.target.value));
    setNameError("");
  }

  function updateEmail(e) {
    dispatch(updateAddSupplierSessionEmail(e.target.value));
    setEmailError("");
  }

  function updateContact(e) {
    const value = e.target.value;
    if (value.length <= 10) {
      dispatch(updateAddSupplierSessionContact(e.target.value));
      setContactError("");
    }
  }

  return (
    <Box sx={{ maxWidth: "24rem", margin: "auto" }}>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth sx={{ marginTop: "3rem" }}>
          <TextField
            margin="dense"
            label="Name"
            required
            value={session.name}
            onChange={updateName}
            error={!!nameError}
            helperText={nameError}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            required
            value={session.email}
            onChange={updateEmail}
            error={!!emailError}
            helperText={emailError}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Contact"
            required
            type="number"
            InputProps={{ inputProps: { min: 0 } }}
            value={session.contactInfo}
            onChange={updateContact}
            error={!!contactError}
            helperText={contactError}
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
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Supplier successfully added
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default AddSupplier;
