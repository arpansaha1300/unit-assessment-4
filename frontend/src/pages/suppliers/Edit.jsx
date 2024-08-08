import { Box, Button, FormControl, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { createOrUpdateTab } from "../../redux/tabSlice";
import axios from "axios";

export default function EditSupplier() {
  const dispatch = useDispatch();
  const params = useParams();
  const location = useLocation();
  const [supplier, setSupplier] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/suppliers/${params.supplierId}`)
      .then((res) => {
        setSupplier(res.data);
      });
  }, [params.supplierId]);

  useEffect(() => {
    if (supplier) {
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
    const formData = new FormData(e.currentTarget);

    try {
      await axios.put(`http://localhost:8080/api/suppliers/${supplier.id}`, {
        name: formData.get("name"),
        email: formData.get("email"),
        contactInfo: formData.get("contact"),
      });
    } catch (error) {
      console.error("Error updating supplier:", error);
    }
  };

  return supplier ? (
    <Box sx={{ maxWidth: "24rem", margin: "auto" }}>
      <form onSubmit={updateSupplier}>
        <FormControl fullWidth>
          <TextField
            margin="dense"
            label="Name"
            name="name"
            fullWidth
            defaultValue={supplier.name}
          />
          <TextField
            margin="dense"
            label="Email"
            name="email"
            fullWidth
            defaultValue={supplier.email}
          />
          <TextField
            margin="dense"
            label="Contact"
            name="contact"
            fullWidth
            defaultValue={supplier.contactInfo}
          />
          <Button
            variant="contained"
            type="submit"
            sx={{ textTransform: "none", marginTop: "0.2rem" }}
          >
            Save
          </Button>
        </FormControl>
      </form>
    </Box>
  ) : null;
}
