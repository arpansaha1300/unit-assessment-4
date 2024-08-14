import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  Box,
  useTheme,
  useMediaQuery,
  Stack,
  TableSortLabel,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Grid,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useDispatch } from "react-redux";
import { createOrUpdateTab } from "../redux/tabSlice";
import { useNavigate } from "react-router-dom";

const Packages = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [packagesData, setPackagesData] = useState([]);
  const [supplierMap, setSupplierMap] = useState({});

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/packages");
        setPackagesData(response.data);
      } catch (error) {
        console.error("Error fetching suppliers data:", error);
      }
    };
    fetchPackages();
  }, []);

  
  useEffect(() => {
    const supplierIds = new Set(packagesData.map((p) => p.supplierId));
    
    const fetchSuppliers = async () => {
        const updates = {};
        for (const sid of supplierIds) {
            const response = await axios.get(`http://localhost:8080/api/suppliers/${sid}`);
            updates[sid] = {
                name: response.data.name,
                email: response.data.email,
            };
        }
        setSupplierMap((prevState) => ({ ...prevState, ...updates }));
    };

    fetchSuppliers();
}, [packagesData]);


  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("id");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [goToPage, setGoToPage] = useState("");

  useEffect(() => {
    dispatch(createOrUpdateTab("/package-list"));
  }, [dispatch]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const openEditPackageTab = (pkg) => {
    const path = `/package-list/${pkg.id}/edit`;
    dispatch(createOrUpdateTab({ path: path, data: pkg }));
    navigate(path);
  };

  const handleDeleteClick = (pkg) => {
    setSelectedPackage(pkg);
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
    setSelectedPackage(null);
  };

  const handleDeletePackage = async () => {
    try {
      await axios.delete(
        `http://localhost:8080/api/packages/${selectedPackage.id}`
      );
      setPackagesData((state) => {
        const newState = [...state];
        newState.splice(
          newState.findIndex((s) => s.id === selectedPackage.id),
          1
        );
        return newState;
      });
    } catch (error) {
      console.error("Error deleting package:", error);
    } finally {
      handleDeleteDialogClose();
    }
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedData = packagesData.sort((a, b) => {
    if (orderBy === "packageName") {
      return order === "asc"
        ? a.packageName.localeCompare(b.packageName)
        : b.packageName.localeCompare(a.packageName);
    } else if (orderBy === "quantity") {
      return order === "asc"
        ? a.quantity - b.quantity
        : b.quantity - a.quantity;
    } else if (orderBy === "id") {
      return order === "asc" ? a.id - b.id : b.id - a.id;
    }
    return 0;
  });

  const totalPages = Math.ceil(packagesData.length / rowsPerPage);

  const customLabelDisplayedRows = ({ page }) => {
    return `page ${page + 1} of ${totalPages}`;
  };
  function truncateString(str, maxLength) {
    if (str.length > maxLength) {
      return str.substring(0, maxLength - 3) + "...";
    }
    return str;
  }
  const handleGoToPageChange = (event) => {
    setGoToPage(event.target.value);
  };

  const handleGoToPage = () => {
    const newPage = parseInt(goToPage, 10) - 1;
    if (
      newPage >= 0 &&
      newPage < Math.ceil(packagesData.length / rowsPerPage)
    ) {
      setPage(newPage);
    } else {
      alert("Invalid page number");
    }
  };

  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Packages ({packagesData.length})
          </Typography>
        </Box>
        {isMobile ? (
          <Stack spacing={2}>
            {sortedData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((pkg, index) => (
                <Box
                  key={index}
                  sx={{ border: "1px solid #ddd", borderRadius: "4px", p: 2 }}
                >
                  <Typography variant="h6"> {pkg.packageName}</Typography>
                  <Typography variant="body2">
                    <strong>Product ID:</strong> {pkg.id}
                  </Typography>
                  <Typography variant="body2">
                    {" "}
                    <strong>Address:</strong> {truncateString(pkg.address, 36)}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Supplier : </strong> {supplierMap[pkg.supplierId]?.name}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Quantity:</strong> {pkg.quantity}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <IconButton
                      size="small"
                      sx={{ color: "black" }}
                      onClick={() => openEditPackageTab(pkg)}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      sx={{ color: "red", ml: 1 }}
                      onClick={() => handleDeleteClick(pkg)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              ))}
          </Stack>
        ) : (
          <Table sx={{ width: "100%", tableLayout: "fixed" }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", width: "10%" }}>
                  <TableSortLabel
                    active={orderBy === "id"}
                    direction={orderBy === "id" ? order : "asc"}
                    onClick={(event) => handleRequestSort(event, "id")}
                  >
                    ID
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", width: "20%" }}>
                  <TableSortLabel
                    active={orderBy === "packageName"}
                    direction={orderBy === "packageName" ? order : "asc"}
                    onClick={(event) => handleRequestSort(event, "packageName")}
                  >
                    Name
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", width: "30%" }}>
                  Address
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", width: "20%" }}>
                  Supplier 
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", width: "20%" }}>
                  <TableSortLabel
                    active={orderBy === "quantity"}
                    direction={orderBy === "quantity" ? order : "asc"}
                    onClick={(event) => handleRequestSort(event, "quantity")}
                  >
                    Quantity
                  </TableSortLabel>
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", textAlign: "right", width: "10%" }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((pkg, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:hover": { backgroundColor: "#f0f0f0" } }}
                  >
                    <TableCell>{pkg.id}</TableCell>
                    <TableCell>{pkg.packageName}</TableCell>
                    <TableCell>{truncateString(pkg.address, 36)}</TableCell>
                    <TableCell>{supplierMap[pkg.supplierId]?.name}</TableCell>
                    <TableCell>{pkg.quantity}</TableCell>
                    <TableCell sx={{ textAlign: "right" }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-end",
                        }}
                      >
                        <IconButton
                          size="small"
                          sx={{ color: "black" }}
                          onClick={() => openEditPackageTab(pkg)}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          sx={{ color: "red", ml: 1 }}
                          onClick={() => handleDeleteClick(pkg)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        )}
        <Grid
          sx={{
            display: "flex",
            justifyContent: "right",
            flexDirection: "row",
            spacing: 3,
            p: 1,
          }}
        >
          <TablePagination
            component="div"
            count={packagesData.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={isMobile ? [] : [5, 10, 15]}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage=""
            labelDisplayedRows={customLabelDisplayedRows}
          />

          <Typography
            sx={{
              display: "flex",
              justifyContent: "right",
            }}
          >
            <input
              type="number"
              onChange={handleGoToPageChange}
              value={goToPage}
              placeholder="page"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleGoToPage();
                }
              }}
              min={0}
              style={{
                width: "60px",
                height: "30px",
                marginRight: "8px",
                marginTop: "15px",
              }}
            />
            <Button
              variant="contained"
              onClick={handleGoToPage}
              sx={{ width: "20px", height: "30px", mt: "15px" }}
            >
              Go
            </Button>
          </Typography>
        </Grid>
      </CardContent>

      <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose}>
        <DialogTitle>Delete Package</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this package?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeletePackage} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default Packages;
