import {
  Alert,
  Autocomplete,
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
  updateAddPackageSessionAddress,
  updateAddPackageSessionName,
  updateAddPackageSessionQuantity,
  updateAddPackageSessionSupplier,
} from "../redux/addPackageSessionSlice";

function AddPackage() {
  const dispatch = useDispatch();
  const session = useSelector((state) => state.addPackage);
  const [quantityError, setQuantityError] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [suppliersData, setSuppliersData] = useState([]);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/suppliers");
        setSuppliersData(response.data);
      } catch (error) {
        console.error("Error fetching suppliers data:", error);
      }
    };

    fetchSuppliers();
  }, []);

  useEffect(() => {
    dispatch(createOrUpdateTab("/add-package"));
  }, [dispatch]);

  const validateDetails = (quantity) => {
    let res = true;
    if (quantity <= 0) {
      setQuantityError("Enter a valid quantity");
      res = false;
    }
    return res;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const res = validateDetails(session.quantity);
    if (res) {
      axios
        .post("http://localhost:8080/api/packages", {
          packageName: session.name,
          address: session.address,
          quantity: session.quantity,
          supplierId: session.supplier.id,
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
    dispatch(updateAddPackageSessionName(e.target.value));
  }

  function updateAddress(e) {
    dispatch(updateAddPackageSessionAddress(e.target.value));
  }

  function updateQuantity(e) {
    dispatch(updateAddPackageSessionQuantity(e.target.value));
    setQuantityError("");
  }

  function updateSupplier(_, newValue) {
    dispatch(
      updateAddPackageSessionSupplier(
        newValue
          ? {
              id: newValue.id,
              name: newValue.name,
              email: newValue.email,
            }
          : null
      )
    );
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
            fullWidth
          />
          <TextField
            margin="dense"
            label="Address"
            required
            value={session.address}
            onChange={updateAddress}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Quantity"
            required
            value={session.quantity}
            onChange={updateQuantity}
            error={!!quantityError}
            helperText={quantityError}
            fullWidth
          />
          <Autocomplete
            id="supplier"
            options={suppliersData}
            value={session.supplier}
            onChange={updateSupplier}
            getOptionLabel={(option) =>
              option ? `${option.name} (${option.email})` : ""
            }
            isOptionEqualToValue={(option, value) => {
              if (!value) return false;
              return option.id === value.id;
            }}
            sx={{ paddingTop: "0.5rem", paddingBottom: "0.5rem" }}
            renderInput={(params) => <TextField {...params} label="Supplier" />}
          />
          <Button
            variant="contained"
            type="submit"
            sx={{ textTransform: "none", marginTop: "1.2rem" }}
          >
            Add Package
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
          Package successfully added
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default AddPackage;
