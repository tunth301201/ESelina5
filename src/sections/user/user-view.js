import {
    Box,
    Button,
    Card, CardActions, CardContent,
    CardHeader, Divider, FormControlLabel, Radio,
    RadioGroup, TextField,
    Unstable_Grid2 as Grid
  } from '@mui/material';
  import { useCallback } from 'react';
  import PropTypes from 'prop-types';
    
    
    const ViewUser = (props) => {
      const {User} = props;

      
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
    
      return (
        <form
          autoComplete="off"
          noValidate
        >
          <Card>
            <CardHeader
              title="User information"
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
                      label="Email"
                      name="email"
                      required
                      value={User.email}
                    />
                  </Grid>
                  <Grid
                    xs={12}
                    md={6}
                  >
                    <TextField
                      fullWidth
                      label="First Name"
                      name="firstName"
                      required
                      value={User.firstname}
                    >
                    </TextField>
                  </Grid>
                  <Grid
                    xs={12}
                    md={6}
                  >
                    <TextField
                      fullWidth
                      label="Last Name"
                      name="lastName"
                      required
                      value={User.lastname}
                    />
                  </Grid>
                 
                  <Grid
                    xs={12}
                    md={6}
                  >
                    <TextField
                      fullWidth
                      label="Phone"
                      name="phone"
                      value={User.phone}
                    />
                  </Grid>

                  <Grid
                    xs={12}
                    md={6}
                  >
                    <TextField
                      fullWidth
                      label="Birthday"
                      name="birthday"
                      value={formatDateTimeDislay(User.birthday)}
                    />
                  </Grid>
                  
                  

                  <Grid
                    xs={12}
                    md={12}
                  >
                    <TextField
                      fullWidth
                      label="Address"
                      name="address"
                      multiline
                      value={User.address}
                    />
                  </Grid>
  
                </Grid>
              </Box>
            </CardContent>
            <Divider />
          </Card>
        </form>
      );
    };

    ViewUser.propTypes = {
      User: PropTypes.object,
    };
    
    export default ViewUser;
    