import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOrUpdateTab } from "../redux/tabSlice";
import { Alert, Autocomplete, Box, Button, FormControl, Snackbar, TextField } from "@mui/material";
import axios from "axios";

export default function Estimation() {
  const dispatch = useDispatch();
  const [quantityError, setQuantityError] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [suppliersData, setSuppliersData] = useState([]);
  const [packagesData, setPackagesData] = useState([]);
  const [supplierPackage, setSupplierPackage] = useState(null);
  const [supplier, setSupplier] = useState(null);
  const [quantity, setQuantity] = useState(0);

  const id = Number(supplier ? supplier.id:0);

  useEffect(() => {
    dispatch(createOrUpdateTab("/estimation"));
  });

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
    const fetchPackages = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/suppliers/${id}`);
        console.log(response.data.packages);
        setPackagesData(response.data.packages);
      } catch (error) {
        console.error("Error fetching packages data:", error);
      }
    };

    if (id > 0) fetchPackages();
  }, [id]);

  const validateDetails = (quantity) => {
    let res = true;
    if (quantity > supplierPackage.quantity) {
      setQuantityError("Enter a valid quantity");
      res = false;
    }
    return res;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const res = validateDetails(quantity);
    if (res) {
      console.log([{
        packageId: supplierPackage.id,
        quantity: quantity,
      }])
      // axios
      //   .post("http://localhost:8080/api/packages/price", {
      //     packageId: supplierPackage.id,
      //     quantity: quantity,
      //   })
      //   .then((response) => {
      //     console.log(response);
      //     setSnackbarOpen(true);
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
    }
  };

  function updateQuantity(e) {
    setQuantity(e.target.value);
    setQuantityError("");
  }

  function updateSupplier(_, newValue) {
        setSupplier(
          newValue
          ? {
            id: newValue.id,
            name: newValue.name,
            email: newValue.email,
          }
          : null
        );
  }

  function updatePackage(_, newValue) {
        setSupplierPackage(
          newValue
          ? {
            id: newValue.id,
            packageName: newValue.packageName,
            quantity: newValue.quantity
          }
          : null
        );
  }

  return (
    <Box sx={{ maxWidth: "44rem", margin: "auto" }}>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth sx={{ display: "flex", flexDirection: "row", marginTop: "3rem" }}>
          <Autocomplete
            id="supplier"
            options={suppliersData}
            value={supplier}
            onChange={updateSupplier}
            getOptionLabel={(option) =>
              option ? `${option.name} (${option.email})` : ""
            }
            isOptionEqualToValue={(option, value) => {
              if (!value) return false;
              return option.id === value.id;
            }}
            sx={{ paddingTop: "0.5rem", paddingRight: "0.5rem" }}
            fullWidth
            renderInput={(params) => <TextField {...params} label="Supplier" />}
          />
          <Autocomplete
            id="package"
            options={packagesData}
            value={supplierPackage}
            onChange={updatePackage}
            getOptionLabel={(option) =>
              option ? `${option.packageName} (${option.quantity})` : ""
            }
            isOptionEqualToValue={(option, value) => {
              if (!value) return false;
              return option.id === value.id;
            }}
            sx={{ paddingTop: "0.5rem", paddingRight: "0.5rem" }}
            fullWidth
            renderInput={(params) => <TextField {...params} label="Package" />}
          />
          <TextField
            margin="dense"
            label="Quantity"
            required
            value={quantity}
            onChange={updateQuantity}
            error={!!quantityError}
            helperText={quantityError}
            fullWidth
          />
        </FormControl>
        
        <Button
          variant="contained"
          type="submit"
          sx={{ textTransform: "none", marginTop: "1.2rem" }}
        >
          Estimate
        </Button>
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
