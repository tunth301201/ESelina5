import { useCallback, useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@mui/material';
import { useFormik } from 'formik';
import { changPassword, getUserById, getUserProfile, updateProfile } from 'src/api/apiService';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers';


export const AccountProfileDetails = ({UserProfile}) => {

  const userInfo = UserProfile;
 
  const formik = useFormik({
    initialValues: {
      firstName: userInfo.firstname,
      lastName: userInfo.lastname,
      email: userInfo.email,
      oldPassword: '',
      newPassword: '',
      gender: userInfo.gender,
      birthday: new Date(userInfo.birthday).getTime(),
      phone: userInfo.phone,
      address: userInfo.address,
      submit: null
    },
    onSubmit: async(values) => {
      console.log("formik value: ", values);
      try{
        var updateUserDto = {
          firstname: values.firstName,
          lastname: values.lastName,
          gender: values.gender,
          birthday: values.birthday.toString(),
          phone: values.phone,
          address: values.address,
        };
        updateProfile(updateUserDto);
      } catch(err) {
        console.log(err);
      }

      if (values.oldPassword && values.newPassword) {
        try{
          var changePasswordDto = {
            oldPassword: values.oldPassword,
            newPassword: values.newPassword
          };
          console.log("passDTO: ", changePasswordDto)
          changPassword(changePasswordDto);
        } catch(err) {
        console.log(err);
        }
      }
    }
  });



  

  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={formik.handleSubmit}
    >
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
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
                    value={formik.values.email}
                    
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
                    onChange={formik.handleChange}
                    required
                    value={formik.values.firstName}
                  />
                </Grid>
                <Grid
                  xs={12}
                  md={6}
                >
                  <TextField
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    onChange={formik.handleChange}
                    required
                    value={formik.values.lastName}
                  />
                </Grid>
                <Grid
                  xs={12}
                  md={12}
                >
                  <RadioGroup
                    row
                    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    name='gender'
                    value={formik.values.gender}
                    onChange={formik.handleChange}
                  >
                    <FormControlLabel value="female" control={<Radio />} label="Female" labelPlacement="top"/>
                    <FormControlLabel value="male" control={<Radio />} label="Male" labelPlacement="top"/>
                  </RadioGroup>
  
                </Grid>
               
                <Grid
                  xs={12}
                  md={6}
                >
                  <TextField
                    fullWidth
                    label="Old Password"
                    name="oldPassword"
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.oldPassword}
                  />
                </Grid>

                <Grid
                  xs={12}
                  md={6}
                >
                  <TextField
                    fullWidth
                    label="New Password"
                    name="newPassword"
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.newPassword}
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
                  onChange={formik.handleChange}
                  value={formik.values.phone}
                   />
                </Grid>

                <Grid
                xs={12}
                md={6}
                >
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                    fullWidth
                    disableFuture
                    label="Birthday"
                    openTo="year"
                    views={['year', 'month', 'day']}
                    value={formik.values.birthday}
                    onChange={(value) => {
                      formik.setFieldValue('birthday', Date.parse(value));
                    }}
                    renderInput={(params) => <TextField fullWidth {...params} />}
                    />
                  </LocalizationProvider>
                </Grid>

                <Grid
                  xs={12}
                  md={12}
                >
                  <TextField
                    fullWidth
                    label="Address"
                    name="address"
                    onChange={formik.handleChange}
                    value={formik.values.address}
                  />
                </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained" type="submit">
            Save details
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
