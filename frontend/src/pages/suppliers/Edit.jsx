import {
  Alert,
  Box,
  Button,
  FormControl,
  Snackbar,
  TextField,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { createOrUpdateTab } from "../../redux/tabSlice";
import {
  createEditSupplierSession,
  updateEditSupplierSessionContact,
  updateEditSupplierSessionEmail,
  updateEditSupplierSessionName,
} from "../../redux/editSupplierSlice";

export default function EditSupplier() {
  const [contactError, setContactError] = useState();
  const dispatch = useDispatch();
  const params = useParams();
  const location = useLocation();
  const [supplier, setSupplier] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const sessions = useSelector((state) => state.editSupplier.sessions);
  const userRole = useSelector((state) => state.auth.role);

  const session = useMemo(
    () => sessions[params.supplierId],
    [params.supplierId, sessions]
  );

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

  const isDirty = useMemo(() => {
    if (!supplier || !session) return false;
    return (
      supplier.name !== session.name ||
      supplier.email !== session.email ||
      supplier.contactInfo !== session.contactInfo
    );
  }, [session, supplier]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/suppliers/${params.supplierId}`)
      .then((res) => {
        setSupplier(res.data);
      });
  }, [params.supplierId]);

  useEffect(() => {
    if (supplier && !session) {
      dispatch(createEditSupplierSession(supplier));
    }
  }, [supplier, session, dispatch]);

  useEffect(() => {
    if (userRole === "ADMIN" && supplier) {
      dispatch(
        createOrUpdateTab({
          path: location.pathname,
          data: supplier,
        })
      );
    }
  }, [dispatch, supplier]);

  const updateSupplier = async (e) => {
    e.preventDefault();
    const res = validateDetails(session.contactInfo);

    if (res) {
      try {
        const res = await axios.put(
          `http://localhost:8080/api/suppliers/${supplier.id}`,
          {
            name: session.name,
            email: session.email,
            contactInfo: session.contactInfo,
          }
        );
        setSupplier(res.data);
        setSnackbarOpen(true);
      } catch (error) {
        console.error("Error updating supplier:", error);
      }
    }
  };

  function updateName(e) {
    dispatch(
      updateEditSupplierSessionName({ id: supplier.id, name: e.target.value })
    );
  }

  function updateEmail(e) {
    dispatch(
      updateEditSupplierSessionEmail({ id: supplier.id, email: e.target.value })
    );
  }

  function updateContact(e) {
    setContactError("");
    const value=e.target.value;
    if(value.length<=10)
    {
      dispatch(
        updateEditSupplierSessionContact({
          id: supplier.id,
          contactInfo: e.target.value,
        })
      );
    }
  }

  return session ? (
    <Box sx={{ maxWidth: "24rem", margin: "auto" }}>
      <form onSubmit={updateSupplier}>
        <FormControl fullWidth>
          <TextField
            margin="dense"
            label="Name"
            name="name"
            fullWidth
            required
            value={session.name}
            disabled={userRole === "SUPPLIER"}
            onChange={updateName}
          />
          <TextField
            margin="dense"
            label="Email"
            name="email"
            type="email"
            required
            fullWidth
            value={session.email}
            disabled={userRole === "SUPPLIER"}
            onChange={updateEmail}
          />
          <TextField
            margin="dense"
            label="Contact"
            name="contact"
            fullWidth
            required
            type="number"
            InputProps={{ inputProps: { min: 0 } }}
            error={!!contactError}
            helperText={contactError}
            value={session.contactInfo}
            onChange={updateContact}
          />
          <Button
            variant="contained"
            type="submit"
            disabled={!isDirty}
            sx={{ textTransform: "none", marginTop: "0.2rem" }}
          >
            Save
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
          Supplier successfully edited
        </Alert>
      </Snackbar>
    </Box>
  ) : null;
}
