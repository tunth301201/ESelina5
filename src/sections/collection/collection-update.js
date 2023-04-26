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
  import PropTypes from 'prop-types';
  import { updateCategory } from 'src/api/apiService';
  
  const UpdateCollection = (props) => {
    const { Collection, onSuccess, onSubmit } = props;

    const [values, setValues] = useState({
      name: Collection.name,
      description: Collection.description,
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
          const upCategory = {
            name: values.name,
            description: values.description
          }
          console.log(Collection)
          updateCategory(Collection.id, upCategory).then((res) => {
            onSubmit(res.data);
          });
          onSuccess(); 
        } catch (e) {
          console.log('Error updating category:', e);
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
            title="Update Collection"
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
                    defaultValue={values.name}
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
                    defaultValue={values.description}
                    multiline
                  />
  
                </Grid>
              
                
              </Grid>
            </Box>
          </CardContent>
          <Divider />
          <CardActions sx={{ justifyContent: 'flex-end' }} style={{ justifyContent: 'center' }}>
            <Button variant="contained" type='submit'>
              Save
            </Button>
          </CardActions>
        </Card>
      </form>
    );
  };

  UpdateCollection.propTypes = {
    Collection: PropTypes.object,
  };
  
  export default UpdateCollection;
  