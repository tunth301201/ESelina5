import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import XMarkIcon from '@heroicons/react/24/solid/XMarkIcon';
import { MoreVert } from '@mui/icons-material';
import {
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
import { useState } from 'react';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import CreatePromotion from 'src/sections/promotion/promotion-create';
import UpdatePromotion from 'src/sections/promotion/promotion-update';
// import ViewPromotion from 'src/sections/promotion/promotion-view';
import { format } from 'date-fns';

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


const items = [
  {
    id: '5e887ac47eed253091be10cb',
    name: 'Carson Darrin',
    description: 'Clothes',
    discount: 5,
    startDate: 1555016400000,
    endDate: 1555016400000,
  },
  {
    id: '5e887b209c28ac3dd97f6db5',
    name: 'Fran Perez',
    description: 'Phone',
    discount: 10,
    startDate: 1555016400000,
    endDate: 1555016400000,
  },
  {
    id: '5e887b7602bdbc4dbb234b27',
    name: 'Fran Perez',
    description: 'Phone',
    discount: 10,
    startDate: 1554930000000,
    endDate: 1554930000000,
  },
  {
    id: '5e86809283e28b96d2d38537',
    name: 'Fran Perez',
    description: 'Phone',
    discount: 10,
    startDate: 1554930000000,
    endDate: 1554757200000,
  },
  {
    id: '5e86805e2bafd54f66cc95c3',
    name: 'Fran Perez',
    description: 'Phone',
    discount: 10,
    startDate: 1554930000000,
    endDate: 1554670800000,
  },
  {
    id: '5e887a1fbefd7938eea9c981',
    name: 'Fran Perez',
    description: 'Phone',
    discount: 10,
    startDate: 1554930000000,
    endDate: 1554670800000,
  },
  {
    id: '5e887d0b3d090c1b8f162003',
    name: 'Fran Perez',
    description: 'Phone',
    discount: 10,
    startDate: 1554930000000,
    endDate: 1554670800000,
  },
  {
    id: '5e88792be2d4cfb4bf0971d9',
    name: 'Fran Perez',
    description: 'Phone',
    discount: 10,
    startDate: 1554930000000,
    endDate: 1554757200000,
  },
  {
    id: '5e8877da9a65442b11551975',
    name: 'Fran Perez',
    description: 'Phone',
    discount: 10,
    startDate: 1554930000000,
    endDate: 1554757200000,
  },
  {
    id: '5e8680e60cba5019c5ca6fda',
    name: 'Fran Perez',
    description: 'Phone',
    discount: 10,
    startDate: 1554930000000,
    endDate: 1554757200000,
  }
];


const Page = () => {
  const [open, setOpen] = useState(false);

  const handleAddClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openView, setOpenView] = useState(false);

  const handleDeleteClose = () => {
    setOpenDelete(false);
  };

  const handleEditClose = () => {
    setOpenEdit(false);
  };

  const handleViewClose = () => {
    setOpenView(false);
  }

  const [selectedEditPromotion, setSelectedEditPromotion] = useState(null);

  const [selectedDeletePromotion, setSelectedDeletePromotion] = useState(null);

  const [selectedPromotion, setSelectedPromotion] = useState(null);

  const columns = [
    { field: 'name', headerName: 'Name', flex: 1, sortable: true, align: 'left', headerAlign: 'center' },
    { field: 'description', headerName: 'Description', flex: 1, sortable: true, align: 'center', headerAlign: 'center' },
    { field: 'discount', headerName: 'Discount', flex: 1, sortable: true, align: 'right', headerAlign: 'right' },
    { 
        field: 'startDate', 
        headerName: 'Start Date', 
        flex: 1, 
        sortable: true, 
        align: 'right', 
        headerAlign: 'right',
        renderCell: (params) => {
        let startDate = format(params.row.startDate, 'dd/MM/yyyy');
        return (
            <Typography variant="subtitle2">
                {startDate}
            </Typography>
        );
        },
      },     { 
      field: 'endDate', 
      headerName: 'End Date', 
      flex: 1, 
      sortable: true, 
      align: 'right', 
      headerAlign: 'right',
      renderCell: (params) => {
      let endDate = format(params.row.endDate, 'dd/MM/yyyy');
      return (
          <Typography variant="subtitle2">
              {endDate}
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
        const handleViewClick = () => {
          const viewPromotion = {
            id: params.row.id,
            name: params.row.name,
            description: params.row.description,
            discount: params.row.discount,
            startDate: params.row.startDate,
            endDate: params.row.endDate,
          };
          setSelectedPromotion(viewPromotion);
          setOpenView(true);
          handleMenuClose();
        };
        const handleEditClick = () => {
          const editPromotion = {
            id: params.row.id,
            name: params.row.name,
            description: params.row.description,
            discount: params.row.discount,
            startDate: params.row.startDate,
            endDate: params.row.endDate,
          };
          setSelectedEditPromotion(editPromotion);
          setOpenEdit(true);
          handleMenuClose();
        };
        const handleDeleteClick = () => {
          const deletePromotion = {
            id: params.row.id,
            name: params.row.name,
            description: params.row.description,
            discount: params.row.discount,
            startDate: params.row.startDate,
            endDate: params.row.endDate,
          };
          setSelectedDeletePromotion(deletePromotion);
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
              <MenuItem onClick={handleEditClick}>Edit</MenuItem>
              <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
            </Menu>
          </div>
        );
      },
    },
  ];

  const [sortModel, setSortModel] = useState([
    {
      field: 'startDate',
      sort: 'desc',
    },
  ]);

  const handleSortModelChange = (newSortModel) => {
    setSortModel(newSortModel);
  };

const rows = items.map((item) => {
    return {
      id: item.id,
      name: item.name,
      description: item.description,
      discount: item.discount,
      startDate: item.startDate,
      endDate: item.endDate,
    };
  });


  return (
    <>
      <Head>
        <title>
          Promotion Management
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
                  Promotion Management
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
                  <OutlinedInput
                      defaultValue=""
                      fullWidth
                      placeholder="Search Promotion"
                      startAdornment={(
                        <InputAdornment position="start">
                          <SvgIcon
                            color="action"
                            fontSize="small"
                          >
                            <MagnifyingGlassIcon />
                          </SvgIcon>
                        </InputAdornment>
                      )}
                      sx={{ maxWidth: 500 }}
                    />
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

            {/* Promotion Table start */}
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
                }}
                getRowHeight={() => 'auto'} 
                pageSizeOptions={[10, 25, 50]} />
              </div>
            </Card>
            {/* Promotion Table end */}
          </Stack>

          {/* Create Promotion Dialog start */}
          <div>
            <BootstrapDialog
              onClose={handleClose}
              aria-labelledby="customized-dialog-title"
              open={open}
              maxWidth="lg"
            >
              {/* <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                Add New Promotion
              </BootstrapDialogTitle> */}
              {/* <DialogContent dividers> */}
                <CreatePromotion />
              {/* </DialogContent> */}
            
            </BootstrapDialog>
          </div>
          {/* Create Promotion Dialog end */}

          {/* Edit Promotion Dialog start */}
          <div>
            <BootstrapDialog
              onClose={handleEditClose}
              aria-labelledby="customized-dialog-title"
              open={openEdit}
              maxWidth="lg"
            >
              {/* <BootstrapDialogTitle id="customized-dialog-title" onClose={handleEditClose}>
                Update Promotion
              </BootstrapDialogTitle> */}
              {/* <DialogContent dividers> */}
                <UpdatePromotion 
                 Promotion={selectedEditPromotion}
                />
              {/* </DialogContent> */}
            </BootstrapDialog>
          </div>
          {/* Edit Promotion Dialog end */}

          {/* View Promotion Dialog start */}
          <div>
            <BootstrapDialog
                onClose={handleViewClose}
                aria-labelledby="customized-dialog-title"
                open={openView}
              >
                {/* <ViewPromotion 
                 Promotion={selectedPromotion}
                /> */}
              </BootstrapDialog>
          </div>
          {/* View Promotion Dialod end */}

          {/* Delete Dialog start */}
          <div>
            <BootstrapDialog
                onClose={handleDeleteClose}
                aria-labelledby="customized-dialog-title"
                open={openDelete}
              >
                <DialogContent dividers>
                  Are you sure to delete {selectedDeletePromotion ? `${selectedDeletePromotion.name}` : 'this Promotion'}?
                </DialogContent>
                <DialogActions style={{ justifyContent: 'center' }}>
                  <Button onClick={handleDeleteClose}>No</Button>
                  <Button autoFocus onClick={handleDeleteClose} variant="contained">
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
