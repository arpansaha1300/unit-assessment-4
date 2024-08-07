import { Button, FormControl, TextField } from "@mui/material"



function AddSupplier() {

  return (
    <form align="center">
        <FormControl sx={{width: "24rem"}}>
        <TextField
            margin="dense"
            label="Name"
            fullWidth
          />
          <TextField
            margin="dense"
            label="Email"
            fullWidth
          />
          <TextField
            margin="dense"
            label="Contact"
            fullWidth
          />
          <TextField
            margin="dense"
            label="Password"
            fullWidth
          />
          <Button variant="contained" type="submit" sx={{ textTransform: "none", marginTop: '0.2rem' }}>Log In</Button>
        </FormControl>
    </form>
  )
}

export default AddSupplier