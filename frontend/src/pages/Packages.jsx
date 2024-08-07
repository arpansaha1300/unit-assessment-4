import { useState } from 'react';
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
  TextField,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const Packages = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const packagesData = [
    { id: 1, name: 'Package One', address: '123 Main St', supplierId: 1, quantity: 10 },
    { id: 2, name: 'Package Two', address: '456 Elm St', supplierId: 2, quantity: 20 },
    { id: 3, name: 'Package Three', address: '789 Oak St', supplierId: 3, quantity: 30 },
    { id: 4, name: 'Package Four', address: '101 Maple St', supplierId: 4, quantity: 40 },
    { id: 5, name: 'Package Five', address: '202 Pine St', supplierId: 5, quantity: 50 },
    { id: 6, name: 'Package Six', address: '303 Cedar St', supplierId: 6, quantity: 60 },
    { id: 7, name: 'Package Seven', address: '404 Birch St', supplierId: 7, quantity: 70 },
    { id: 8, name: 'Package Eight', address: '505 Walnut St', supplierId: 8, quantity: 80 },
    { id: 9, name: 'Package Nine', address: '606 Ash St', supplierId: 9, quantity: 90 },
    { id: 10, name: 'Package Ten', address: '707 Cherry St', supplierId: 10, quantity: 100 },
  ];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('id');
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [updatedPackage, setUpdatedPackage] = useState({ id: '', name: '', address: '', supplierId: '', quantity: '' });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleEditClick = (pkg) => {
    setSelectedPackage(pkg);
    setUpdatedPackage({ ...pkg });
    setEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
    setSelectedPackage(null);
  };

  const handleUpdatePackage = async () => {
    try {
      await axios.put(`http://localhost:8080/api/packages/${selectedPackage.id}`, updatedPackage);
    } catch (error) {
      console.error('Error updating package:', error);
    } finally {
      handleEditDialogClose();
    }
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
      await axios.delete(`http://localhost:8080/api/packages/${selectedPackage.id}`);
    } catch (error) {
      console.error('Error deleting package:', error);
    } finally {
      handleDeleteDialogClose();
    }
  };

  const sortedData = packagesData.sort((a, b) => {
    if (orderBy === 'name') {
      return order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    } else if (orderBy === 'quantity') {
      return order === 'asc' ? a.quantity - b.quantity : b.quantity - a.quantity;
    } else if (orderBy === 'id') {
      return order === 'asc' ? a.id - b.id : b.id - a.id;
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Packages ({packagesData.length})
          </Typography>
        </Box>
        {isMobile ? (
          <Stack spacing={2}>
            {sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((pkg, index) => (
              <Box key={index} sx={{ border: '1px solid #ddd', borderRadius: '4px', p: 2 }}>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  {pkg.id}
                </Typography>
                <Typography variant="h6">{pkg.name}</Typography>
                <Typography variant="body2">{pkg.address}</Typography>
                <Typography variant="body2">Supplier ID: {pkg.supplierId}</Typography>
                <Typography variant="body2">Quantity: {pkg.quantity}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <IconButton size="small" sx={{ color: 'black' }} onClick={() => handleEditClick(pkg)}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" sx={{ color: 'red', ml: 1 }} onClick={() => handleDeleteClick(pkg)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            ))}
          </Stack>
        ) : (
          <Table sx={{ width: '100%', tableLayout: 'fixed' }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', width: '10%' }}>
                  <TableSortLabel
                    active={orderBy === 'id'}
                    direction={orderBy === 'id' ? order : 'asc'}
                    onClick={(event) => handleRequestSort(event, 'id')}
                  >
                    ID
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', width: '20%' }}>
                  <TableSortLabel
                    active={orderBy === 'name'}
                    direction={orderBy === 'name' ? order : 'asc'}
                    onClick={(event) => handleRequestSort(event, 'name')}
                  >
                    Name
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', width: '30%' }}>Address</TableCell>
                <TableCell sx={{ fontWeight: 'bold', width: '20%' }}>Supplier ID</TableCell>
                <TableCell sx={{ fontWeight: 'bold', width: '20%' }}>
                  <TableSortLabel
                    active={orderBy === 'quantity'}
                    direction={orderBy === 'quantity' ? order : 'asc'}
                    onClick={(event) => handleRequestSort(event, 'quantity')}
                  >
                    Quantity
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'right', width: '10%' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((pkg, index) => (
                <TableRow key={index} sx={{ '&:hover': { backgroundColor: '#f0f0f0' } }}>
                  <TableCell>{pkg.id}</TableCell>
                  <TableCell>{pkg.name}</TableCell>
                  <TableCell>{pkg.address}</TableCell>
                  <TableCell>{pkg.supplierId}</TableCell>
                  <TableCell>{pkg.quantity}</TableCell>
                  <TableCell sx={{ textAlign: 'right' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                      <IconButton size="small" sx={{ color: 'black' }} onClick={() => handleEditClick(pkg)}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" sx={{ color: 'red', ml: 1 }} onClick={() => handleDeleteClick(pkg)}>
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
      <Dialog open={editDialogOpen} onClose={handleEditDialogClose}>
        <DialogTitle>Edit Package</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            value={updatedPackage.name}
            onChange={(e) => setUpdatedPackage({ ...updatedPackage, name: e.target.value })}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Address"
            value={updatedPackage.address}
            onChange={(e) => setUpdatedPackage({ ...updatedPackage, address: e.target.value })}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Supplier ID"
            value={updatedPackage.supplierId}
            onChange={(e) => setUpdatedPackage({ ...updatedPackage, supplierId: e.target.value })}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Quantity"
            value={updatedPackage.quantity}
            onChange={(e) => setUpdatedPackage({ ...updatedPackage, quantity: e.target.value })}
            fullWidth
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose} color="primary">Cancel</Button>
          <Button onClick={handleUpdatePackage} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose}>
        <DialogTitle>Delete Package</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this package?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose} color="primary">Cancel</Button>
          <Button onClick={handleDeletePackage} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default Packages;
