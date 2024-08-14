import { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
  Stack,
  Box,
  Button,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";

export default function ProfilePage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [supplier, setSupplier] = useState(null);
  const supplierId = useSelector((state) => state.auth.id);
  const [image, setImage] = useState(null);

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
  }, [supplierId]);

  const truncateString = (str, maxLength) => {
    if (str.length > maxLength) {
      return str.substring(0, maxLength - 3) + "...";
    }
    return str;
  };
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const validFormats = ["image/jpeg", "image/png"];
      if (validFormats.includes(file.type)) {
        const formData = new FormData();
        formData.append("image", file);

        const reader = new FileReader();
        reader.onloadend = () => {
          setImage(reader.result);
        };
        reader.readAsDataURL(file);

        await axios.post(
          `http://localhost:8080/api/suppliers/${supplierId}/uploadImage`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        // console.log(response.data)
      } else {
        alert("Please upload a JPG or PNG image.");
      }
    }
  };

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
    <Grid container spacing={2} sx={{ py: 2 }}>
      <Grid item xs={12} lg={4}>
        <Card sx={{ boxShadow: "none", border: "1px solid #f0f0f0" }}>
          <CardContent sx={{ textAlign: "center" }}>
            <Typography variant="h5" sx={{ mt: 2, fontWeight: "bold" }}>
              Supplier
            </Typography>
            <CardMedia
              component="img"
              image={
                image
                  ? image
                  : `data:image/png;base64, ${supplier.profileImage}`
              }
              alt="Supplier"
              sx={{
                width: 150,
                height: 140,
                borderRadius: "50%",
                margin: "auto",
              }}
            />
            <Button
              variant="outlined"
              component="label"
              sx={{ marginTop: "7px" }}
            >
              Upload Image
              <input
                type="file"
                accept="image/jpeg,image/png"
                onChange={handleFileChange}
                hidden
              />
            </Button>
          </CardContent>
        </Card>

        <Card sx={{ mt: 3, boxShadow: "none", border: "1px solid #f0f0f0" }}>
          <CardContent>
            <List>
              <ListItem>
                <ListItemText
                  primary={
                    <Typography sx={{ fontWeight: "bold" }}>ID</Typography>
                  }
                  secondary={supplier.id}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={
                    <Typography sx={{ fontWeight: "bold" }}>Name</Typography>
                  }
                  secondary={supplier.name}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={
                    <Typography sx={{ fontWeight: "bold" }}>Email</Typography>
                  }
                  secondary={supplier.email}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={
                    <Typography sx={{ fontWeight: "bold" }}>Phone</Typography>
                  }
                  secondary={supplier.contactInfo}
                />
              </ListItem>
            </List>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} lg={8}>
        {isMobile ? (
          <>
            {supplier.packages.length == 0 ? (
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                No Packages Assigned
              </Typography>
            ) : (
              <Card sx={{ boxShadow: "none", border: "1px solid #f0f0f0" }}>
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      p: 1,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    Packages Assigned
                  </Typography>
                  <Stack spacing={2}>
                    {supplier.packages.map((pkg) => (
                      <Box
                        key={pkg.id}
                        sx={{
                          border: "1px solid #f0f0f0",
                          borderRadius: "4px",
                          p: 2,
                        }}
                      >
                        <Typography variant="body1">
                          <strong>Package ID:</strong> {pkg.id}
                        </Typography>
                        <Typography>
                          <strong>Name:</strong> {pkg.packageName}
                        </Typography>
                        <Typography>
                          <strong>Quantity:</strong> {pkg.quantity}
                        </Typography>
                        <Typography>
                          <strong>Address:</strong> {pkg.address}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            )}
          </>
        ) : (
          <>
            {supplier.packages.length === 0 ? (
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                No Packages Assigned
              </Typography>
            ) : (
              <TableContainer
                component={Paper}
                sx={{ boxShadow: "none", border: "1px solid #f0f0f0" }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontWeight: "bold",
                    padding: 1,
                  }}
                >
                  Packages Assigned
                </Typography>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>
                        Package ID
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>
                        Quantity
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Address</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {supplier.packages.map((pkg) => (
                      <TableRow
                        key={pkg.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell>{pkg.id}</TableCell>
                        <TableCell>{pkg.packageName}</TableCell>
                        <TableCell>{pkg.quantity}</TableCell>
                        <TableCell>{truncateString(pkg.address, 36)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </>
        )}
      </Grid>
    </Grid>
  );
}
