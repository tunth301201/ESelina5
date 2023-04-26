import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Unstable_Grid2 as Grid,
  TextField,
  styled
} from '@mui/material';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useCallback, useRef, useState } from 'react';


const CreateProduct = (props) => {
  const { Collection, onSuccess, onSubmit } = props;

  const collections = Collection;
  const [values, setValues] = useState({
    name: '',
    description: '',
    price: 0,
    stock: 0,
    discount: 0,
    collection: collections[0]._id,
  });

  const [newProduct, setNewProduct] = useState(null);

  const handleChange = useCallback(
    (event) => {
      setValues((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
    },
    []
  );

  const [selectedCollection, setSelectedCollection] = useState(collections[0]._id);

  const handleSelectChange = (event) => {
    setSelectedCollection(event.target.value);
  };


  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      try {
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('description', values.description);
        formData.append('price', values.price);
        formData.append('stock', values.stock);
        formData.append('discount', values.discount);
        formData.append('category_id', selectedCollection);

        console.log("uploaded file in form data: ", uploadedFiles)

        uploadedFiles.forEach((file) => {
          formData.append('file', file);
        })

        // console.log("name: ", values.name);
        // console.log("description: ", values.description);
        // console.log("price: ", values.price);
        // console.log("stock: ", values.stock);
        // console.log("discount: ", values.discount);
        console.log("category_id: ", selectedCollection);
        
       

        axios.post("http://localhost:4000/product/upload", formData,
        {headers: {
            'Content-Type': 'multipart/form-data',
          },}).then((res) => {
              setNewProduct(res.data);
            onSubmit(res.data);
           
          });
          onSuccess();
      } catch (e) {
        console.log('Error creating product:', e);
      }
    },
    [newProduct, onSuccess]
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

  const [uploadedFiles, setUploadedFiles] = useState([]);

  const inputRef = useRef(null);

  const handleFileChange = (event) => {
    const files = event.target.files;
    setUploadedFiles((prevFiles) => [...prevFiles, ...Array.from(files)]);
  };

  
  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit}
    >
      <Card>
        <CardHeader
          subheader="Please enter product information to add to your store"
          title="Add New Product"
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
                  onChange={handleChange}
                  required
                  value={values.name}
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
                  required
                  select
                  onChange={handleSelectChange}
                  SelectProps={{ native: true }}
                  value={selectedCollection}
                >
                  {collections.map((option) => (
                    <option
                      key={option._id}
                      value={option._id}
                    >
                      {option.name}
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
                                onChange={handleFileChange}
                                hidden
                            />
                            <Box sx={{ mt: 1 }}>
                              {uploadedFiles.length == 0 ? 
                              <small>Upload product image</small>
                              : 
                              uploadedFiles.map((file, index) => (
                                <img
                                  key={index}
                                  src={URL.createObjectURL(file)}
                                  alt={`Uploaded Image ${index + 1}`}
                                  style={{ width: "100px", height: "100px", margin: "10px" }}
                                />
                              ))
                              }
                                
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
                  onChange={handleChange}
                  required
                  multiline
                  value={values.description}
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
                  onChange={handleChange}
                  required
                  type="number"
                  value={values.stock}
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
                  onChange={handleChange}
                  required
                  type="number"
                  value={values.price}
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
                  onChange={handleChange}
                  required
                  type="number"
                  value={values.discount}
                />
              </Grid>
              
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }} style={{ justifyContent: 'center' }}>
          <Button variant="contained" type='submit'>
            Add product
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};

CreateProduct.propTypes = {
  Collection: PropTypes.object,
};

export default CreateProduct;
