import { useEffect, useState } from 'react';
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
  TextField,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const Suppliers = () => {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  //   const suppliersData = [
  //   { id: 1, name: 'Supplier One', email: 'supplier1@example.com', contact: '123-456-7890' },
  //   { id: 2, name: 'Supplier Two', email: 'supplier2@example.com', contact: '234-567-8901' },
  //   { id: 3, name: 'Supplier Three', email: 'supplier3@example.com', contact: '345-678-9012' },
  //   { id: 4, name: 'Supplier Four', email: 'supplier4@example.com', contact: '456-789-0123' },
  //   { id: 5, name: 'Supplier Five', email: 'supplier5@example.com', contact: '567-890-1234' },
  //   { id: 6, name: 'Supplier Six', email: 'supplier6@example.com', contact: '678-901-2345' },
  //   { id: 7, name: 'Supplier Seven', email: 'supplier7@example.com', contact: '789-012-3456' },
  //   { id: 8, name: 'Supplier Eight', email: 'supplier8@example.com', contact: '890-123-4567' },
  //   { id: 9, name: 'Supplier Nine', email: 'supplier9@example.com', contact: '901-234-5678' },
  //   { id: 10, name: 'Supplier Ten', email: 'supplier10@example.com', contact: '012-345-6789' },
  // ];

  const [suppliersData, setSuppliersData] = useState([]);


  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [supplierToDelete, setSupplierToDelete] = useState(null);
  const [updatedSupplier, setUpdatedSupplier] = useState({ name: '', email: '', contactInfo: '' });

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/suppliers');
        console.log(response.data);
        setSuppliersData(response.data);
      } catch (error) {
        console.error('Error fetching suppliers data:', error);
      }
    };

    fetchSuppliers();
  }, []);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const totalPages = Math.ceil(suppliersData.length / rowsPerPage);

  const customLabelDisplayedRows = ({ page }) => {
    return `page ${page + 1} of ${totalPages}`;
  };

  const handleEditClick = (supplier) => {
    setSelectedSupplier(supplier);
    setUpdatedSupplier({ name: supplier.name, email: supplier.email, contactInfo: supplier.contactInfo });
    setEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
    setSelectedSupplier(null);
  };

  const handleUpdateSupplier = async () => {
    try {
      await axios.put(`http://localhost8080/api/suppliers/${selectedSupplier.id}`,updatedSupplier);
    } catch (error) {
      console.error('Error updating supplier:', error);
    } finally {
      handleEditDialogClose();
    }
  };

  const handleDeleteSupplier = async () => {
    try {
      await axios.delete(`http://localhost8080/api/suppliers/${supplierToDelete.id}`);
    } catch (error) {
      console.error('Error deleting supplier:', error);
    } finally {
      handleDeleteDialogClose();
    }
  };

  const handleDeleteClick = (supplier) => {
    setSupplierToDelete(supplier);
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
    setSupplierToDelete(null);
  };

  

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Suppliers ({suppliersData.length})
          </Typography>
        </Box>
        {isMobile ? (
          <Stack spacing={2}>
            {suppliersData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((supplier, index) => (
              <Box key={index} sx={{ border: '1px solid #ddd', borderRadius: '4px', p: 2 }}>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  {supplier.id}
                </Typography>
                <Typography variant="h6">{supplier.name}</Typography>
                <Typography variant="body2">{supplier.email}</Typography>
                <Typography variant="body2">{supplier.contactInfo}</Typography>
              </Box>
            ))}
          </Stack>
        ) : (
          <Table sx={{ width: '100%' }}>
            <TableHead>
              <TableRow sx={{ '&:hover': { background: '#f0f0f0' } }}>
                <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>contactInfo</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'right' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {suppliersData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((supplier, index) => (
                <TableRow key={index} sx={{ '&:hover': { backgroundColor: '#f0f0f0' } }}>
                  <TableCell>{supplier.id}</TableCell>
                  <TableCell>{supplier.name}</TableCell>
                  <TableCell>{supplier.email}</TableCell>
                  <TableCell>{supplier.contactInfo}</TableCell>
                  <TableCell sx={{ textAlign: 'right' }}>
                    <IconButton size="small" sx={{ color: 'black' }} onClick={() => handleEditClick(supplier)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" sx={{ color: 'red', ml: '20px' }} onClick={() => handleDeleteClick(supplier)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <TablePagination
            component="div"
            count={suppliersData.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={isMobile ? [] : [5, 10, 15]}
            labelRowsPerPage={isMobile ? '' : 'Rows per page'}
            labelDisplayedRows={customLabelDisplayedRows}
          />
        </Box>
      </CardContent>

      <Dialog open={editDialogOpen} onClose={handleEditDialogClose}>
        <DialogTitle>Edit Supplier</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            fullWidth
            value={updatedSupplier.name}
            onChange={(e) => setUpdatedSupplier({ ...updatedSupplier, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Email"
            fullWidth
            value={updatedSupplier.email}
            onChange={(e) => setUpdatedSupplier({ ...updatedSupplier, email: e.target.value })}
          />
          <TextField
            margin="dense"
            label="contactInfo"
            fullWidth
            value={updatedSupplier.contactInfo}
            onChange={(e) => setUpdatedSupplier({ ...updatedSupplier, contactInfo: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose}>Cancel</Button>
          <Button onClick={handleUpdateSupplier}>Update</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>Are you sure you want to delete this supplier?</DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}>Cancel</Button>
          <Button onClick={handleDeleteSupplier} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default Suppliers;