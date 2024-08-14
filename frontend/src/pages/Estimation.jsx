/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOrUpdateTab } from "../redux/tabSlice";
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  FormControl,
  IconButton,
  Snackbar,
  TextField,
} from "@mui/material";
import axios from "axios";
import {
  addEstimationRow,
  deleteEstimationRow,
  updateEPackage,
  updateEPackages,
  updateEQuantity,
  updateESupplier,
} from "../redux/estimationSlice";
import CloseIcon from "@mui/icons-material/Close";

export default function Estimation() {
  const dispatch = useDispatch();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [suppliersData, setSuppliersData] = useState([]);
  const estimation = useSelector((state) => state.estimation.rows);

  useEffect(() => {
    dispatch(createOrUpdateTab("/estimation"));
  }, [dispatch]);

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

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    if (ev.nativeEvent.srcElement.name === "estimate") {
      const requestBody = estimation.map((e) => ({
        id: e.package.id,
        quantity: e.quantity,
      }));
      await axios.post("http://localhost:8080/api/packages/totalprice", {
        packages: requestBody,
      });
    } else {
      dispatch(addEstimationRow());
    }
  };

  function deleteRow(i) {
    dispatch(deleteEstimationRow({ i }));
  }

  return (
    <Box sx={{ maxWidth: "44rem", margin: "auto" }}>
      <form onSubmit={handleSubmit}>
        {estimation.map((row, i) => (
          <Box
            key={i}
            sx={{ display: "flex", gap: "1rem", alignItems: "center" }}
          >
            <FormRow suppliers={suppliersData} row={row} i={i} />
            {estimation.length > 1 && (
              <div>
                <IconButton onClick={() => deleteRow(i)}>
                  <CloseIcon />
                </IconButton>
              </div>
            )}
          </Box>
        ))}

        <Box sx={{ display: "flex", gap: "1rem", marginTop: "1.2rem" }}>
          <Button
            variant="contained"
            type="submit"
            name="estimate"
            sx={{ textTransform: "none" }}
          >
            Estimate
          </Button>
          <Button type="submit" name="add" variant="outlined">
            Add more
          </Button>
        </Box>
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

function FormRow({ suppliers, row, i }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/suppliers/${row.supplier.id}`
        );
        dispatch(updateEPackages({ i, packages: response.data.packages }));
      } catch (error) {
        console.error("Error fetching packages data:", error);
      }
    };

    if (row.supplier) fetchPackages();
  }, [dispatch, i, row.supplier]);

  function updateQuantity(quantity, i) {
    dispatch(updateEQuantity({ i, quantity }));
  }

  function updateSupplier(supplier, i) {
    dispatch(updateESupplier({ i, supplier }));
  }

  function updatePackage(pkg, i) {
    dispatch(updateEPackage({ i, package: pkg ? pkg : null }));
  }

  return (
    <FormControl fullWidth sx={{ display: "flex", flexDirection: "row" }}>
      <Autocomplete
        id="supplier"
        options={suppliers}
        value={row.supplier}
        onChange={(_, val) => updateSupplier(val, i)}
        getOptionLabel={(option) =>
          option ? `${option.name} (${option.email})` : ""
        }
        isOptionEqualToValue={(option, value) => {
          if (!value) return false;
          return option.id === value.id;
        }}
        sx={{ paddingTop: "0.5rem", paddingRight: "0.5rem" }}
        fullWidth
        renderInput={(params) => (
          <TextField {...params} label="Supplier" required />
        )}
      />
      <Autocomplete
        id="package"
        options={row.packages}
        value={row.package}
        onChange={(_, val) => updatePackage(val, i)}
        getOptionLabel={(option) =>
          option ? `${option.packageName} (${option.quantity})` : ""
        }
        isOptionEqualToValue={(option, value) => {
          if (!value) return false;
          return option.id === value.id;
        }}
        disabled={row.supplier === null}
        sx={{ paddingTop: "0.5rem", paddingRight: "0.5rem" }}
        fullWidth
        renderInput={(params) => (
          <TextField {...params} label="Package" required />
        )}
      />
      <TextField
        margin="dense"
        label="Quantity"
        type="number"
        required
        inputProps={{
          min: 0,
          max: row.package?.quantity,
        }}
        disabled={row.package === null}
        value={row.quantity}
        onChange={(e) => updateQuantity(e.target.value, i)}
        fullWidth
      />
    </FormControl>
  );
}
