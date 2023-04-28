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
                    value={product.category_id.name}
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
                        src={`data:${product.images[0].contentType};base64,${product.images[0].data}`}
                        alt={product.name}
                        style={{ width: 80, height: 80, marginRight: 10 }}
                        />
                    </label>

                    <label htmlFor="upload-file">
                        <img
                        src={`data:${product.images[1].contentType};base64,${product.images[1].data}`}
                        alt={product.name}
                        style={{ width: 80, height: 80, marginRight: 10 }}
                        />
                    </label>

                    <label htmlFor="upload-file">
                        <img
                        src={`data:${product.images[2].contentType};base64,${product.images[2].data}`}
                        alt={product.name}
                        style={{ width: 80, height: 80, marginRight: 10 }}
                        />
                    </label>

                    <label htmlFor="upload-file">
                        <img
                        src={`data:${product.images[3].contentType};base64,${product.images[3].data}`}
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
                    value={product.description}
                    InputProps={{
                        readOnly: true
                      }}
                  />
  
                </Grid>
                <Grid
                  xs={12}
                  md={4}
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
                  md={4}
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

                <Grid
                  xs={12}
                  md={4}
                >
                  <TextField
                    fullWidth
                    label="Discount"
                    name="discount"
                    // onChange={handleChange}
                    required
                    type="number"
                    defaultValue={product.discount}
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
  