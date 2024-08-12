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

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("id");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

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
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    {pkg.id}
                  </Typography>
                  <Typography variant="h6">{pkg.packageName}</Typography>
                  <Typography variant="body2">{pkg.address}</Typography>
                  <Typography variant="body2">
                    Supplier ID: {pkg.supplierId}
                  </Typography>
                  <Typography variant="body2">
                    Quantity: {pkg.quantity}
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
                  Supplier ID
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
                    <TableCell>{pkg.address}</TableCell>
                    <TableCell>{pkg.supplierId}</TableCell>
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
        <TablePagination
          component="div"
          count={packagesData.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={isMobile ? [] : [5, 10, 15]}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Packages per page"
          labelDisplayedRows={customLabelDisplayedRows}
        />
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
