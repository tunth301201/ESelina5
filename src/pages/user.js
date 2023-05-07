import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import XMarkIcon from '@heroicons/react/24/solid/XMarkIcon';
import { MoreVert } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle, IconButton, InputAdornment, Menu,
  MenuItem, OutlinedInput, Stack,
  styled,
  SvgIcon,
  Typography,
} from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import CreateUser from 'src/sections/user/user-create';
import UpdateUser from 'src/sections/user/user-update';
import ViewUser from 'src/sections/user/user-view';
import { format } from 'date-fns';
import { deleteOneUser, getAllUsers, getUserById } from 'src/api/apiService';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <SvgIcon fontSize="small">
            <XMarkIcon />
          </SvgIcon>
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};


const Page = () => {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [selectedEditUser, setSelectedEditUser] = useState(null);
  const [selectedDeleteUser, setSelectedDeleteUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);



  useEffect(() => {
    getAllUsers().then((res) => {
      setUsers(res.data);
    })
    .catch((err) => {
      console.error("Error getting user:", err);
    });
  }, []);
  

  const handleAddClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleDeleteClose = () => {
    setOpenDelete(false);
  };

  const handleEditClose = () => {
    setOpenEdit(false);
  };

  const handleViewClose = () => {
    setOpenView(false);
  }

  function formatDateTimeDislay(inputString) {
    // Convert input string to JavaScript Date object
    var date = new Date(inputString);
  
    // Extract individual components (year, month, day, hours, minutes, seconds) from the Date object
    var year = date.getFullYear();
    var month = ("0" + (date.getMonth() + 1)).slice(-2); // Months are zero-indexed, so we add 1 and pad with leading zero
    var day = ("0" + date.getDate()).slice(-2); // Pad with leading zero
    var hours = ("0" + date.getHours()).slice(-2); // Pad with leading zero
    var minutes = ("0" + date.getMinutes()).slice(-2); // Pad with leading zero
    var seconds = ("0" + date.getSeconds()).slice(-2); // Pad with leading zero
  
    // Format the date and time components into a user-friendly string
    var formattedDateTime = day + "/" + month + "/" + year + " " + hours + ":" + minutes + ":" + seconds;
  
    // Return the formatted date and time string
    return formattedDateTime;
  }

  const handleDeleteUserClick = (userId) => {
    deleteOneUser(userId).then((res) => {
      handleDeleteClose();
      setUsers(users.filter((user) => user._id !== userId));
    })
    .catch((err) => {
      console.log(err);
    })
  }


  const columns = [
    { 
      field: 'name', 
      headerName: 'Name', 
      headerAlign: 'left',
      flex: 1, 
      sortable: true,
      minWidth: 300,
      renderCell: (params) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="subtitle2">
          {params.row.firstname} {params.row.lastname}
        </Typography>
      </div>
      ),
    },
    { field: 'email', headerName: 'Email', flex: 1, sortable: true, align: 'left', headerAlign: 'left' },
    { field: 'noOfOrders', headerName: 'No Of Orders', flex: 1, sortable: true, align: 'right', headerAlign: 'right' },
    { field: 'role', headerName: 'Permission', flex: 1, sortable: true, align: 'center', headerAlign: 'center' },
    { 
      field: 'createdAt', 
      headerName: 'Created At', 
      flex: 1, 
      sortable: true, 
      align: 'right', 
      headerAlign: 'right',
      renderCell: (params) => {
        let createdAt = formatDateTimeDislay(params.row.createdAt);
      return (
          <Typography variant="subtitle2">
              {createdAt}
          </Typography>
      );
      },
    },    
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      sortable: false,
      align: 'center',
      headerAlign: 'center',
      marginRight: 10,
      disableColumnMenu: true,
      renderCell: (params) => {
        const [anchorEl, setAnchorEl] = useState(null);
        const handleMenuOpen = (event) => {
          setAnchorEl(event.currentTarget);
        };
        const handleMenuClose = () => {
          setAnchorEl(null);
        };
        const handleViewClick = async () => {
          await getUserById(params.row.id).then((res) => {
            setSelectedUser(res.data)
          })
          setOpenView(true);
          handleMenuClose();
        };
        
        const handleDeleteClick = () => {
          const deleteUser = {
            id: params.row.id,
            firstname: params.row.firstname,
            lastname: params.row.lastname,
          };
          setSelectedDeleteUser(deleteUser);
          setOpenDelete(true);
          handleMenuClose();
        };
        return (
          <div>
            <IconButton
              aria-controls={`actions-menu-${params.id}`}
              aria-haspopup="true"
              aria-label="Actions"
              onClick={handleMenuOpen}
            >
              <MoreVert />
            </IconButton>
            <Menu
              id={`actions-menu-${params.id}`}
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleViewClick}>View</MenuItem>
              <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
            </Menu>
          </div>
        );
      },
    },
  ]; 

  const [sortModel, setSortModel] = useState([
    {
      field: 'createdAt',
      sort: 'desc',
    },
  ]);

  const handleSortModelChange = (newSortModel) => {
    setSortModel(newSortModel);
  };

const rows = users.map((item) => {
    return {
      id: item._id,
      firstname: item.firstname,
      lastname: item.lastname,
      email: item.email,
      noOfOrders: 10,
      role: item.role,
      createdAt: item.createdAt,
    };
  });

  const handleCreateNewUser = (values) => {
    users.push(values);
    setUsers([...users]);
  }


  return (
    <>
      <Head>
        <title>
          User Management
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  User Management
                </Typography>
              </Stack>
            </Stack>
            
            <Card>
              <Stack
                alignItems="center"
                direction="row"
                justifyContent="space-between"
                spacing={2}
                sx={{ p: 2 }}
              >
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
                  
                </Stack>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
                  <Button
                      startIcon={(
                        <SvgIcon fontSize="small">
                          <PlusIcon />
                        </SvgIcon>
                      )}
                      variant="contained"
                      onClick={handleAddClick}
                    >
                      Add
                    </Button>
                </Stack>
              </Stack>
            </Card>

            {/* User Table start */}
            <Card>
              <div style={{ width: '100%'}}>
              <DataGrid 
                autoHeight 
                rows={rows} 
                columns={columns}
                sortModel={sortModel}
                onSortModelChange={handleSortModelChange}
                slots={{ toolbar: GridToolbar }}
                disableColumnSelector
                disableDensitySelector
                initialState={{
                  pagination: {paginationModel: {pageSize: 10}},
                  filter: {
                    filterModel: {
                      items: [],
                      
                    },
                  },
                }}
                slotProps={{
                  toolbar: {
                    showQuickFilter: true,
                    quickFilterProps: { debounceMs: 500 },
                  },
                }}
                getRowHeight={() => 'auto'} 
                pageSizeOptions={[10, 25, 50]} />
              </div>
            </Card>
            {/* User Table end */}
          </Stack>

          {/* Create User Dialog start */}
          <div>
            <BootstrapDialog
              onClose={handleClose}
              aria-labelledby="customized-dialog-title"
              open={open}
            >
                <CreateUser 
                onSuccess={() => handleClose()}
                onSubmit={handleCreateNewUser}
                />
            </BootstrapDialog>
          </div>
          {/* Create User Dialog end */}

          {/* View User Dialog start */}
          <div>
            <BootstrapDialog
                onClose={handleViewClose}
                aria-labelledby="customized-dialog-title"
                open={openView}
              >
                <ViewUser 
                 User={selectedUser}
                />
              </BootstrapDialog>
          </div>
          {/* View User Dialod end */}

          {/* Delete Dialog start */}
          <div>
            <BootstrapDialog
                onClose={handleDeleteClose}
                aria-labelledby="customized-dialog-title"
                open={openDelete}
              >
                <DialogContent dividers>
                  Are you sure to delete {selectedDeleteUser ? `${selectedDeleteUser.firstname} ${selectedDeleteUser.lastname}` : 'this User'}?
                </DialogContent>
                <DialogActions style={{ justifyContent: 'center' }}>
                  <Button onClick={handleDeleteClose}>No</Button>
                  <Button autoFocus onClick={handleDeleteUserClick.bind(null,selectedDeleteUser?.id)} variant="contained">
                    Yes
                  </Button>
                </DialogActions>
              </BootstrapDialog>
          </div>
          {/* Delete Dialog end */}
        </Container>
      </Box>
    </>
  );
};


Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
