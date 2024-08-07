import React from 'react';
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
} from '@mui/material';

const Packages = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const packagesData = [
    { id: 1, name: 'Package One', address: '123 Main St', supplierId: 1 },
    { id: 2, name: 'Package Two', address: '456 Elm St', supplierId: 2 },
    { id: 3, name: 'Package Three', address: '789 Oak St', supplierId: 3 },
    { id: 4, name: 'Package Four', address: '101 Maple St', supplierId: 4 },
    { id: 5, name: 'Package Five', address: '202 Pine St', supplierId: 5 },
    { id: 6, name: 'Package Six', address: '303 Cedar St', supplierId: 6 },
    { id: 7, name: 'Package Seven', address: '404 Birch St', supplierId: 7 },
    { id: 8, name: 'Package Eight', address: '505 Walnut St', supplierId: 8 },
    { id: 9, name: 'Package Nine', address: '606 Ash St', supplierId: 9 },
    { id: 10, name: 'Package Ten', address: '707 Cherry St', supplierId: 10 },
  ];

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const totalPages = Math.ceil(packagesData.length / rowsPerPage);

  const customLabelDisplayedRows = ({ page }) => {
    return `page ${page + 1} of ${totalPages}`;
  };

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Packages (10)
          </Typography>
        </Box>
        {isMobile ? (
          <Stack spacing={2}>
            {packagesData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((pkg, index) => (
              <Box key={index} sx={{ border: '1px solid #ddd', borderRadius: '4px', p: 2 }}>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  {pkg.id}
                </Typography>
                <Typography variant="h6">{pkg.name}</Typography>
                <Typography variant="body2">{pkg.address}</Typography>
                <Typography variant="body2">Supplier ID: {pkg.supplierId}</Typography>
              </Box>
            ))}
          </Stack>
        ) : (
          <Table sx={{ width: '100%' }}>
            <TableHead>
              <TableRow sx={{ '&:hover': { background: '#f0f0f0' } }}>
                <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Address</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Supplier ID</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {packagesData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((pkg, index) => (
                <TableRow key={index} sx={{ '&:hover': { backgroundColor: '#f0f0f0' } }}>
                  <TableCell>{pkg.id}</TableCell>
                  <TableCell>{pkg.name}</TableCell>
                  <TableCell>{pkg.address}</TableCell>
                  <TableCell>{pkg.supplierId}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <TablePagination
            component="div"
            count={packagesData.length}
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
    </Card>
  );
};

export default Packages;
