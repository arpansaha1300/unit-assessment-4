import axios from "axios";
import { useEffect, useState } from "react";
import { Typography, Grid, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const supplierId = 6;

function Profile() {
  const [supplier, setSupplier] = useState(null);

  useEffect(() => {
    const fetchSupplierData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/suppliers/${supplierId}`);
        setSupplier(response.data);
      } catch (error) {
        console.error("Error fetching supplier data:", error);
      }
    };
    fetchSupplierData();
  }, []);

  if (!supplier) {
    return (
      <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
        <Typography>Loading...</Typography>
      </Grid>
    );
  }

  return (
    <Grid container spacing={3}  sx={{display:'flex',flexDirection:'column', justifyContent:'center',alignItems:'center', width:'100%'}}>
      <Grid item xs={10} sm={8} md={6} sx={{border:'1px solid #f0f0f0',width:'100%'}}>
        <Card sx={{boxShadow:'none'}}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{display:'flex',justifyContent:'center',alignItems:'center',fontWeight:'bold'}}>Supplier Information</Typography>
            {/* <TableContainer component={Paper} sx={{boxShadow:'none'}}> */}
              <Table >
                <TableBody>
                <TableRow>
                    <TableCell><strong>ID</strong></TableCell>
                    <TableCell>{supplier.id}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>Name</strong></TableCell>
                    <TableCell>{supplier.name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>Email</strong></TableCell>
                    <TableCell>{supplier.email}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>Phone</strong></TableCell>
                    <TableCell>{supplier.contactInfo}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            {/* </TableContainer> */}
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={10} sm={8} md={6} sx={{border:'1px solid #f0f0f0',width:'100%',mt:'4px'}}>
        <Card sx={{boxShadow:'none'}}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{display:'flex',justifyContent:'center',alignItems:'center',fontWeight:'bold'}}>Packages Assigned</Typography>
            {/* <TableContainer component={Paper} > */}
              <Table >
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Package Name</strong></TableCell>
                    <TableCell><strong>Quantity</strong></TableCell>
                    <TableCell><strong>Address</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {supplier.packages.map((pkg) => (
                    <TableRow key={pkg.id}>
                      <TableCell>{pkg.packageName}</TableCell>
                      <TableCell>{pkg.quantity}</TableCell>
                      <TableCell>{pkg.address}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            {/* </TableContainer> */}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Profile;
