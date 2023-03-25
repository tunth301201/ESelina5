import {
    Box,
    Button,
    Card, CardContent,
    CardHeader, styled, TextField,
    Unstable_Grid2 as Grid,
    Divider,
    CardActions
  } from '@mui/material';
  import { useCallback, useRef } from 'react';
  import PropTypes from 'prop-types';
  
  const collections = [
    {
      value: 'Clothes',
      label: 'Clothes'
    },
    {
      value: 'Shoes',
      label: 'Shoes'
    },
    {
      value: 'Book',
      label: 'Book'
    },
    {
      value: 'Phone',
      label: 'Phone'
    }
  ];
  
  const UpdateProduct = (props) => {

    // Get product (id, name, ...) from products.js
    const {
        product
    } = props;
  
    // const handleChange = useCallback(
    //   (event) => {
    //     setValues((prevState) => ({
    //       ...prevState,
    //       [event.target.name]: event.target.value
    //     }));
    //   },
    //   []
    // );
  
    const handleSubmit = useCallback(
      (event) => {
        event.preventDefault();
      },
      []
    );
  
    const UploadBox = styled(Box)({
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: 200,
      border: '2px dashed gray',
      borderRadius: 4,
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: '#f2f2f2',
      },
      '&:focus': {
        outline: 'none',
      },
    });
  
    const inputRef = useRef(null);
  
    const handleSelectFileClick = () => {
      inputRef.current.click();
    };
  
    return (
      <form
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
      >
        <Card>
          <CardHeader
            subheader="Edit the below product information then click save button to update the selected product"
            title="Update Product"
          />
          <CardContent sx={{ pt: 0 }}>
            <Box sx={{ m: -1.5 }}>
              <Grid
                container
                spacing={3}
              >
                <Grid
                  xs={12}
                  md={6}
                >
                  <TextField
                    fullWidth
                    helperText="Please specify the product name"
                    label="Name"
                    name="name"
                    // onChange={handleChange}
                    required
                    defaultValue={product.name}
                  />
                </Grid>
                <Grid
                  xs={12}
                  md={6}
                >
                  <TextField
                    fullWidth
                    label="Collection"
                    name="collection"
                    // onChange={handleChange}
                    required
                    select
                    SelectProps={{ native: true }}
                    value={product.collection}
                  >
                    {collections.map((option) => (
                      <option
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                </Grid>
                <Grid
                  xs={12}
                  md={12}
                >
  
                  <Box>
                      <label htmlFor="upload-file">
                          <UploadBox component="div">
                              <input
                                  ref={inputRef}
                                  accept="image/*,.png,.gif,.jpeg,.jpg"
                                  id="upload-file"
                                  multiple
                                  type="file"
                                  // onChange={handleChange}
                                  hidden
                              />
                              <Box sx={{ mt: 2 }}>
                                  <Button 
                                      variant="outlined" 
                                      size="medium" 
                                      type='file'
                                      onClick={handleSelectFileClick}
                                      >
                                  Select files
                                  </Button>
                              </Box>
                              <Box sx={{ mt: 1 }}>
                                  <small>Upload product image</small>
                              </Box>
                              <Box sx={{ mt: 2 }}>
                                <img src={product.image} alt="Product image" style={{ width: 80, height: 80 }} />
                              </Box>
                          </UploadBox>
                      </label>
                      </Box>
  
                </Grid>
                <Grid
                  xs={12}
                  md={12}
                >
                  <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    // onChange={handleChange}
                    required
                    multiline
                  />
  
                </Grid>
                <Grid
                  xs={12}
                  md={6}
                >
                  <TextField
                    fullWidth
                    label="Stock"
                    name="stock"
                    // onChange={handleChange}
                    required
                    type="number"
                    defaultValue={product.stock}
                  />
                </Grid>
                <Grid
                  xs={12}
                  md={6}
                >
                  <TextField
                    fullWidth
                    label="Price"
                    name="price"
                    // onChange={handleChange}
                    required
                    type="number"
                    defaultValue={product.price}
                  />
                </Grid>
                
              </Grid>
            </Box>
          </CardContent>
          <Divider />
          <CardActions sx={{ justifyContent: 'flex-end' }} style={{ justifyContent: 'center' }}>
            <Button variant="contained">
              Save
            </Button>
          </CardActions>
        </Card>
      </form>
    );
  };

  UpdateProduct.propTypes = {
    product: PropTypes.object,
  };
  
  export default UpdateProduct;
  