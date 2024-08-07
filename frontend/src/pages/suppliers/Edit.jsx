import { Box, Button, FormControl, TextField } from "@mui/material";

export default function EditSupplier() {
  function handleSubmit() {
    console.log("submit");
  }

  return (
    <Box sx={{ maxWidth: "24rem", margin: "auto" }}>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth>
          <TextField margin="dense" label="Name" fullWidth />
          <TextField margin="dense" label="Email" fullWidth />
          <TextField margin="dense" label="Contact" fullWidth />
          <Button
            variant="contained"
            type="submit"
            sx={{ textTransform: "none", marginTop: "0.2rem" }}
          >
            Log In
          </Button>
        </FormControl>
      </form>
    </Box>
  );
}
