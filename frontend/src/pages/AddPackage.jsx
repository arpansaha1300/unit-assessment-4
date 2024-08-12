import { Alert, Box, Button, FormControl, Snackbar, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createOrUpdateTab } from "../redux/tabSlice";
import axios from "axios";


function AddPackage() {
    const dispatch = useDispatch();
  const [quantityError, setQuantityError] = useState("");
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [quantity, setQuantity] = useState();
  const [supplierId, setSupplierId] = useState();
  const [state, setState] = useState({
    open: false,
    vertical: "bottom",
    horizontal: "right",
  });
  const { vertical, horizontal, open } = state;

  const handleSubmission = () => {
    setState({
      vertical: "bottom",
      horizontal: "right",
      open: true,
    });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  useEffect(() => {
    dispatch(createOrUpdateTab("/add-package"));
  }, [dispatch]);

  const validateDetails = (quantity) => {
    let res = true;
    if (quantity <= 0){
      setQuantityError("Enter a valid quantity");
      res = false;
    }
    return res;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const res = validateDetails(quantity);
    if (res) {
      axios
        .post("http://localhost:8080/api/packages", {
          packageName: name,
          address: address,
          quantity: quantity,
          supplierId: supplierId
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
            required
            onChange={(e) => {
              setName(e.target.value);
            }}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Address"
            required
            onChange={(e) => {
              setAddress(e.target.value);
            }}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Quantity"
            required
            onChange={(e) => {
              setQuantity(e.target.value);
              setQuantityError("");
            }}
            error={!!quantityError}
            helperText={quantityError}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Supplier Id"
            required
            onChange={(e) => {
              setSupplierId(e.target.value);
            }}
            fullWidth
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
          Package successfully added
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default AddPackage