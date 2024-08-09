import { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Breadcrumbs,
  Link,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {useSelector} from 'react-redux'


export default function ProfilePage() {
  const [supplier, setSupplier] = useState(null);
  const supplierId = useSelector((state) => state.auth.id);

  useEffect(() => {
    const fetchSupplierData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/suppliers/${supplierId}`
        );
        setSupplier(response.data);
      } catch (error) {
        console.error("Error fetching supplier data:", error);
      }
    };
    fetchSupplierData();
  }, []);

  if (!supplier) {
    return (
      <Container sx={{ py: 5 }}>
        <Grid container justifyContent="center">
          <Grid item md={6} textAlign="center">
            <Typography>Loading...</Typography>
          </Grid>
        </Grid>
      </Container>
    );
  }

  return (
        <Grid container spacing={2}  sx={{ py: 2,}}>
          <Grid item xs={12} >
            <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 4 }}>
              <Link color="inherit" href="#">
                Home
              </Link>
              <Link color="inherit" href="#">
                Suppliers
              </Link>
              <Typography color="textPrimary">Supplier Profile</Typography>
            </Breadcrumbs>
          </Grid>

          <Grid item xs={12} lg={4}>
            <Card sx={{boxShadow:'none',border:'1px solid #f0f0f0'}}>
              <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="h6" sx={{ mt: 2, fontWeight: "" }}>
                  Supplier
                </Typography>
                <CardMedia
                  component="img"
                  image="https://st2.depositphotos.com/1092019/10717/i/450/depositphotos_107178150-stock-photo-suppliers-on-office-folder-blurred.jpg"
                  alt="Supplier"
                  sx={{
                    width: 150,
                    height: 140,
                    borderRadius: "50%",
                    margin: "auto",
                  }}
                />
              </CardContent>
            </Card>

            <Card sx={{ mt: 3,boxShadow:'none',border:'1px solid #f0f0f0'}}>
              <CardContent>
                <List>
                  <ListItem>
                    <ListItemText primary="ID" secondary={supplier.id} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Name" secondary={supplier.name} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Email" secondary={supplier.email} />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Phone"
                      secondary={supplier.contactInfo}
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} lg={8} sx={{p:1.5, }} >
            <TableContainer component={Paper}sx={{boxShadow:'none',border:'1px solid #f0f0f0'}}>
              <Typography
                variant="h6"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontWeight: "bold",
                }}
              >
                Packages Assigned
              </Typography>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Package ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Address</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {supplier.packages.map((pkg) => (
                    <TableRow
                      key={pkg.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>{pkg.id}</TableCell>
                      <TableCell>{pkg.packageName}</TableCell>
                      <TableCell>{pkg.quantity}</TableCell>
                      <TableCell>{pkg.address}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
  );
}
