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
  
  const UpdateCollection = (props) => {

    // Get Collection (id, name, ...) from Collections.js
    const {
        Collection
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
                    // onChange={handleChange}
                    required
                    defaultValue={Collection.name}
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
                    // onChange={handleChange}
                    required
                    defaultValue={Collection.description}
                    multiline
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

  UpdateCollection.propTypes = {
    Collection: PropTypes.object,
  };
  
  export default UpdateCollection;
  