import {
    Box,
    Button,
    Card, CardContent,
    CardHeader, styled, TextField,
    Unstable_Grid2 as Grid,
    Divider,
    CardActions
  } from '@mui/material';
  import { useCallback, useRef, useState } from 'react';
import { createCategory } from 'src/api/apiService';
  
  
  const CreateCollection = ({ onSuccess, onSubmit }) => {
    const [values, setValues] = useState({
      name: "",
      description: ""
    });
  
    const handleChange = useCallback(
      (event) => {
        setValues((prevState) => ({
          ...prevState,
          [event.target.name]: event.target.value
        }));
      }, 
      []
    );

    
  
    const handleSubmit = useCallback(
      (event) => {
        event.preventDefault();

        try {
          const newCategory = {
            name: values.name,
            description: values.description
          }
          createCategory(newCategory).then((res) => {
            onSubmit(res.data);
          });
          
          onSuccess(); 
          
        } catch (error) {
          console.log('Error creating category:', error);
        }
      },
      [values.name, values.description, onSuccess]
    );
  
 
    return (
      <form
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
      >
        <Card>
          <CardHeader
            subheader="Please enter Collection information to add to your store"
            title="Add New Collection"
          />
          <CardContent sx={{ pt: 0 }}>
            <Box sx={{ m: -1.5 }}>
              <Grid
                container
                spacing={3}
              >
                <Grid
                  xs={12}
                  md={12}
                >
                  <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    onChange={handleChange}
                    required
                    value={values.name}
                  />
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
               
                
              </Grid>
            </Box>
          </CardContent>
          <Divider />
          <CardActions sx={{ justifyContent: 'flex-end' }} style={{ justifyContent: 'center' }}>
            <Button variant="contained" type='submit'>
              Add Collection
            </Button>
          </CardActions>
        </Card>
      </form>
    );
  };
  
  export default CreateCollection;
  