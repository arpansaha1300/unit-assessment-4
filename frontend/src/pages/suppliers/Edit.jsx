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
  const sessions = useSelector((state) => state.editSupplier.sessions);
  const userRole = useSelector((state) => state.auth.role);
  const [session, setSession] = useState(null);
  const [state, setState] = useState({
    open: false,
    vertical: "bottom",
    horizontal: "right",
  });
  const { vertical, horizontal, open } = state;

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

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const handleSubmission = () => {
    setState({
      vertical: "bottom",
      horizontal: "right",
      open: true,
    });
  };

  useEffect(() => {
    setSession(sessions[params.supplierId]);
  }, [params.supplierId, sessions]);

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
        const response = await axios.put(
          `http://localhost:8080/api/suppliers/${supplier.id}`,
          {
            name: session.name,
            email: session.email,
            contactInfo: session.contactInfo,
          }
        );
        console.log(response);
        handleSubmission();
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
    dispatch(
      updateEditSupplierSessionContact({
        id: supplier.id,
        contactInfo: e.target.value,
      })
    );
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
            onChange={updateEmail}
          />
          <TextField
            margin="dense"
            label="Contact"
            name="contact"
            fullWidth
            required
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
          sx={{ width: "100%" }}
        >
          Supplier successfully edited
        </Alert>
      </Snackbar>
    </Box>
  ) : null;
}
