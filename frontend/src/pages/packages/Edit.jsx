import { Alert, Box, Button, FormControl, Snackbar, TextField } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { createOrUpdateTab } from "../../redux/tabSlice";
import {
  createEditPackageSession,
  updateEditPackageSessionAddress,
  updateEditPackageSessionName,
  updateEditPackageSessionQuantity,
} from "../../redux/editPackageSlice";

export default function EditPackage() {
  const dispatch = useDispatch();
  const params = useParams();
  const location = useLocation();
  const [pkg, setPkg] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const sessions = useSelector((state) => state.editPackage.sessions);

  const session = useMemo(
    () => sessions[params.packageId],
    [params.packageId, sessions]
  );

  const isDirty = useMemo(() => {
    if (!pkg || !session) return false;
    return (
      pkg.packageName !== session.packageName ||
      pkg.address !== session.address ||
      pkg.quantity.toString() !== session.quantity.toString()
    );
  }, [session, pkg]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/packages/${params.packageId}`)
      .then((res) => {
        setPkg(res.data);
      });
  }, [params.packageId]);

  useEffect(() => {
    if (pkg && !session) {
      dispatch(createEditPackageSession(pkg));
    }
  }, [pkg, session, dispatch]);

  useEffect(() => {
    if (pkg) {
      dispatch(
        createOrUpdateTab({
          path: location.pathname,
          data: pkg,
        })
      );
    }
  }, [dispatch, pkg]);

  const updatePackage = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        `http://localhost:8080/api/packages/${pkg.id}`,
        {
          packageName: session.packageName,
          address: session.address,
          quantity: session.quantity,
        }
      );
      setPkg(res.data);
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error updating package:", error);
    }
  };

  function updateName(e) {
    dispatch(
      updateEditPackageSessionName({ id: pkg.id, packageName: e.target.value })
    );
  }

  function updateAddress(e) {
    dispatch(
      updateEditPackageSessionAddress({
        id: pkg.id,
        address: e.target.value,
      })
    );
  }

  function updateQuantity(e) {
    dispatch(
      updateEditPackageSessionQuantity({
        id: pkg.id,
        quantity: e.target.value,
      })
    );
  }

  return session ? (
    <Box sx={{ maxWidth: "24rem", margin: "auto" }}>
      <form onSubmit={updatePackage}>
        <FormControl fullWidth>
          <TextField
            margin="dense"
            label="Name"
            name="packageName"
            fullWidth
            required
            value={session.packageName}
            onChange={updateName}
          />
          <TextField
            margin="dense"
            label="Address"
            name="address"
            required
            fullWidth
            value={session.address}
            onChange={updateAddress}
          />
          <TextField
            margin="dense"
            label="Quantity"
            name="quantity"
            fullWidth
            required
            value={session.quantity}
            onChange={updateQuantity}
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
          Package successfully edited
        </Alert>
      </Snackbar>
    </Box>
  ) : null;
}
