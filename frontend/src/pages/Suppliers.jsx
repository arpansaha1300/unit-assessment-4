import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
  IconButton,
  Stack,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TableSortLabel,
  Grid,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { createOrUpdateTab } from "../redux/tabSlice";
import LaunchIcon from "@mui/icons-material/Launch";
import { setId } from "../redux/authSlice";

const Suppliers = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [suppliersData, setSuppliersData] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [supplierToDelete, setSupplierToDelete] = useState(null);
  const [goToPage, setGoToPage] = useState("");

  useEffect(() => {
    dispatch(createOrUpdateTab("/suppliers-list"));
  }, [dispatch]);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/suppliers");
        setSuppliersData(response.data);
      } catch (error) {
        console.error("Error fetching suppliers data:", error);
      }
    };

    fetchSuppliers();
  }, []);

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("id");
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedData = suppliersData.sort((a, b) => {
    if (orderBy === "id") {
      if (order === "asc") {
        return a.id - b.id;
      } else {
        return b.id - a.id;
      }
    } else if (orderBy === "name") {
      if (order === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    }
  });

  const totalPages = Math.ceil(suppliersData.length / rowsPerPage);

  const customLabelDisplayedRows = ({ page }) => {
    <input />;
    return `page ${page + 1} of ${totalPages}`;
  };

  const openEditSupplierTab = (supplier) => {
    const path = `/suppliers-list/${supplier.id}/edit`;
    dispatch(
      createOrUpdateTab({
        path: path,
        data: supplier,
      })
    );
    navigate(path);
  };

  const handleDeleteSupplier = async () => {
    try {
      await axios.delete(
        `http://localhost:8080/api/suppliers/${supplierToDelete.id}`
      );
      setSuppliersData((state) => {
        const newState = [...state];
        newState.splice(
          newState.findIndex((s) => s.id === supplierToDelete.id),
          1
        );
        return newState;
      });
    } catch (error) {
      console.error("Error deleting supplier:", error);
    } finally {
      handleDeleteDialogClose();
    }
  };

  const handleDeleteClick = (supplier) => {
    setSupplierToDelete(supplier);
    setDeleteDialogOpen(true);
  };

  const handleLaunchClick = (supplier) => {
    dispatch(setId(supplier.id));
    navigate("/supplier-profile");
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
    setSupplierToDelete(null);
  };

  const handleGoToPageChange = (event) => {
    setGoToPage(event.target.value);
  };

  const handleGoToPage = () => {
    const newPage = parseInt(goToPage, 10) - 1;
    if (
      newPage >= 0 &&
      newPage < Math.ceil(suppliersData.length / rowsPerPage)
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
            Suppliers ({suppliersData.length})
          </Typography>
        </Box>
        {isMobile ? (
          <Stack spacing={2}>
            {sortedData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((supplier, index) => (
                <Box
                  key={index}
                  sx={{ border: "1px solid #ddd", borderRadius: "4px", p: 2 }}
                >
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    {supplier.id}
                  </Typography>
                  <Typography variant="h6">{supplier.name}</Typography>
                  <Typography variant="body2">{supplier.email}</Typography>
                  <Typography variant="body2">
                    {supplier.contactInfo}
                  </Typography>
                  <IconButton
                    size="small"
                    sx={{ color: "black" }}
                    onClick={() => openEditSupplierTab(supplier)}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    sx={{ color: "red", ml: "20px" }}
                    onClick={() => handleDeleteClick(supplier)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    sx={{ color: "blue", ml: "20px" }}
                    onClick={() => handleLaunchClick(supplier)}
                  >
                    <LaunchIcon fontSize="small" />
                  </IconButton>
                </Box>
              ))}
          </Stack>
        ) : (
          <Table sx={{ width: "100%" }}>
            <TableHead>
              <TableRow sx={{ "&:hover": { background: "#f0f0f0" } }}>
                <TableCell sx={{ fontWeight: "bold" }}>
                  <TableSortLabel
                    active={orderBy === "id"}
                    direction={orderBy === "id" ? order : "asc"}
                    onClick={(event) => handleRequestSort(event, "id")}
                  >
                    ID
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  <TableSortLabel
                    active={orderBy === "name"}
                    direction={orderBy === "name" ? order : "desc"}
                    onClick={(event) => handleRequestSort(event, "name")}
                  >
                    Name
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Contact</TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", textAlign: "right", pr: "44px" }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((supplier, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:hover": { backgroundColor: "#f0f0f0" } }}
                  >
                    <TableCell>{supplier.id}</TableCell>
                    <TableCell>{supplier.name}</TableCell>
                    <TableCell>{supplier.email}</TableCell>
                    <TableCell>{supplier.contactInfo}</TableCell>
                    <TableCell sx={{ textAlign: "right" }}>
                      <IconButton
                        size="small"
                        sx={{ color: "black" }}
                        onClick={() => openEditSupplierTab(supplier)}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        sx={{ color: "red", ml: "20px" }}
                        onClick={() => handleDeleteClick(supplier)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        sx={{ color: "blue", ml: "20px" }}
                        onClick={() => handleLaunchClick(supplier)}
                      >
                        <LaunchIcon fontSize="small" />
                      </IconButton>
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
            // sx={{border:'1px solid red'}}
            component="div"
            count={suppliersData.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={isMobile ? [] : [5, 10, 15]}
            labelRowsPerPage={isMobile ? "" : ""}
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
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this supplier?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}>Cancel</Button>
          <Button onClick={handleDeleteSupplier} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default Suppliers;
