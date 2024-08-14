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
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import axios from "axios";
import {
  addEstimationRow,
  updateEPackage,
  updateEPackages,
  updateEQuantity,
  updateESupplier,
} from "../redux/estimationSlice";

export default function Estimation() {
  const dispatch = useDispatch();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [suppliersData, setSuppliersData] = useState([]);
  const estimation = useSelector((state) => state.estimation);
  const [responseData, setResponseData] = useState();

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const requestBody = estimation.map((e) => ({
      id: e.package.id,
      quantity: e.quantity,
    }));
    await axios.post("http://localhost:8080/api/packages/totalprice", {
      packages: requestBody,
    })
      .then((response) => {
        setResponseData(response.data);
      });
  };

  function addRow() {
    dispatch(addEstimationRow());
  }

  return (
    <>
      <Box sx={{ maxWidth: "44rem", margin: "auto" }}>
        <Button variant="contained" onClick={addRow}>
          Add more
        </Button>
        <form onSubmit={handleSubmit}>
          {estimation.map((row, i) => (
            <FormRow suppliers={suppliersData} row={row} key={i} i={i} />
          ))}

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
      {responseData && (
        <Table align="center" sx={{maxWidth: "50rem", marginTop: "6rem", boxShadow: "0px 1px 5px 0px #bdbdbd", borderRadius: "0.2rem"}}>
          <TableHead>
            <TableRow >
              <TableCell align="center" sx={{fontWeight: "bold"}}>Original Price (Rs.)</TableCell>
              <TableCell align="center" sx={{fontWeight: "bold"}}>Discounted Price (Rs.)</TableCell>
              <TableCell align="center" sx={{fontWeight: "bold"}}>Discount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {responseData.map((row, id) => (
              <TableRow
                key={id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 }, "&:hover": { background: "#f0f0f0" } }}
              >
                <TableCell align="center">{row.totalPriceBeforeDiscount}</TableCell>
                <TableCell align="center">{row.totalPriceAfterDiscount}</TableCell>
                <TableCell align="center">{row.discount}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
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
    <FormControl
      fullWidth
      sx={{ display: "flex", flexDirection: "row", marginTop: "1rem" }}
    >
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
