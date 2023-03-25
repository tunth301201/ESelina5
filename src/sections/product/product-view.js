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
  
  
  const ViewProduct = (props) => {

    // Get product (id, name, ...) from products.js
    const {
        product
    } = props;
  
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
      >
        <Card>
          <CardHeader
            title="Product information"
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
                    label="Name"
                    name="name"
                    // onChange={handleChange}
                    required
                    defaultValue={product.name}
                    InputProps={{
                        readOnly: true
                      }}
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
                    value={product.collection}
                    InputProps={{
                        readOnly: true
                      }}
                  >
                    
                  </TextField>
                </Grid>
                <Grid
                  xs={12}
                  md={12}
                >
                    <label htmlFor="upload-file">
                        <img
                        src={product.image}
                        alt={product.name}
                        style={{ width: 80, height: 80, marginRight: 10 }}
                        />
                    </label>
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
                    InputProps={{
                        readOnly: true
                      }}
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
                    InputProps={{
                        readOnly: true
                      }}
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
                    InputProps={{
                        readOnly: true
                      }}
                  />
                </Grid>
                
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </form>
    );
  };

  ViewProduct.propTypes = {
    product: PropTypes.object,
  };
  
  export default ViewProduct;
  