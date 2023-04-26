import {
  Box,
  Button,
  FormControlLabel,
  Unstable_Grid2 as Grid,
  Link,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useFormik } from 'formik';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from 'src/hooks/use-auth';
import { Layout as AuthLayout } from 'src/layouts/auth/layout';
import * as Yup from 'yup';
import dayjs, {Dayjs} from 'dayjs';
import { useState } from 'react';

const Page = () => {
  const router = useRouter();
  const auth = useAuth();

  
  const formik = useFormik({
    initialValues: {
      email: 'tu@gmail.com',
      firstname: 'Selina', 
      lastname: 'Nguyen',
      password: '12345678',
      passwordConfirm: '12345678',
      gender: 'female',
      birthday: Date.now(),
      phone: '2662822882982',
      address: 'bkdmbcs',
      submit: null
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
      firstname: Yup
        .string()
        .required('Fisrtname is required'),
      lastname: Yup
        .string()
        .required('Lastname is required'),
      password: Yup
        .string()
        .max(255)
        .min(8)
        .required('Password is required'),
      passwordConfirm: Yup
        .string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
      gender: Yup
        .string()
        .required('Gender is required'),
      birthday: Yup
        .number()
        .required('Birthday is required'),
      phone: Yup
        .string()
        .required('Phone number is required'),
      address: Yup
        .string()
        .required('Address is required'),
    }),
    onSubmit: async (values, helpers) => {
      try {
        await auth.signUp(values.email, values.password, values.firstname, values.lastname, values.gender, values.birthday.toString(), values.phone, values.address);
        router.push('/');
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });




  return (
    <>
      <Head>
        <title>
          Register | SelinaShop
        </title>
      </Head>
      <Box
        sx={{
          flex: '1 1 auto',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: '100px',
            width: '100%'
          }}
        >
          <div>
            <Stack
              spacing={1}
              sx={{ mb: 3 }}
            >
              <Typography variant="h4">
                Register
              </Typography>
              <Typography
                color="text.secondary"
                variant="body2"
              >
                Already have an account?
                &nbsp;
                <Link
                  component={NextLink}
                  href="/auth/login"
                  underline="hover"
                  variant="subtitle2"
                >
                  Log in
                </Link>
              </Typography>
            </Stack>
            
            <form
                noValidate
                onSubmit={formik.handleSubmit}
              >
                      <Grid
                        container
                        spacing={3}
                      >
                        {/* email */}
                        <Grid
                          xs={12}
                          md={12}
                        >
                          <TextField
                            error={!!(formik.touched.email && formik.errors.email)}
                            fullWidth
                            helperText={formik.touched.email && formik.errors.email}
                            label="Email"
                            name="email"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            type="email"
                            value={formik.values.email}
                          />
                        </Grid>

                        {/* firstname */}
                        <Grid
                          xs={12}
                          md={6}
                        >
                          <TextField
                            error={!!(formik.touched.firstname && formik.errors.firstname)}
                            fullWidth
                            helperText={formik.touched.firstname && formik.errors.firstname}
                            label="First Name"
                            name="firstname"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.firstname}
                          >
                          </TextField>
                        </Grid>

                        {/* lastname */}
                        <Grid
                          xs={12}
                          md={6}
                        >
                          <TextField
                            error={!!(formik.touched.lastname && formik.errors.lastname)}
                            fullWidth
                            helperText={formik.touched.lastname && formik.errors.lastname}
                            label="Last Name"
                            name="lastname"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.lastname}
                          />
                        </Grid>

                        {/* gender */}
                        <Grid
                          xs={12}
                          md={12}
                        >
                          <RadioGroup
                            row
                            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                            name="gender"
                            value={formik.values.gender}
                            onChange={formik.handleChange}
                          >
                            <FormControlLabel value="female" control={<Radio />} label="Female" checked labelPlacement="top"/>
                            <FormControlLabel value="male" control={<Radio />} label="Male" labelPlacement="top"/>
                          </RadioGroup>
                        </Grid>
                      
                        {/* password */}
                        <Grid
                          xs={12}
                          md={6}
                        >
                          <TextField
                            error={!!(formik.touched.password && formik.errors.password)}
                            fullWidth
                            helperText={formik.touched.password && formik.errors.password}
                            label="Password"
                            name="password"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            type="password"
                            value={formik.values.password}
                          />
                        </Grid>

                        {/* confirm password */}
                        <Grid
                          xs={12}
                          md={6}
                        >
                          <TextField
                          error={!!(formik.touched.passwordConfirm && formik.errors.passwordConfirm)}
                          fullWidth
                          helperText={formik.touched.passwordConfirm && formik.errors.passwordConfirm}
                          label="Confirm Password"
                          name="passwordConfirm"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          type="password"
                          value={formik.values.passwordConfirm}
                        />
                        </Grid>

                        {/* phone */}
                        <Grid
                          xs={12}
                          md={6}
                        >
                          <TextField
                            error={!!(formik.touched.phone && formik.errors.phone)}
                            fullWidth
                            helperText={formik.touched.phone && formik.errors.phone}
                            label="Phone"
                            name="phone"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.phone}
                          >
                          </TextField>
                        </Grid>

                        {/* birthday */}
                        <Grid
                          xs={12}
                          md={6}
                        >

                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                              disableFuture
                              label="Birthday"
                              openTo="year"
                              views={['year', 'month', 'day']}
                              value={formik.values.birthday}
                              onChange={(value) => {
                                  formik.setFieldValue('birthday', Date.parse(value));
                                  }}
                              renderInput={(params) => <TextField {...params} />}
                            />
                          </LocalizationProvider>
                        </Grid>

                         {/* address */}
                         <Grid
                          xs={12}
                          md={12}
                        >
                          <TextField
                            error={!!(formik.touched.address && formik.errors.address)}
                            fullWidth
                            helperText={formik.touched.address && formik.errors.address}
                            label="Address"
                            name="address"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.address}
                          />
                        </Grid>
                      </Grid>


                  {formik.errors.submit && (
                    <Typography
                      color="error"
                      sx={{ mt: 3 }}
                      variant="body2"
                    >
                      {formik.errors.submit}
                    </Typography>
                  )}

                      <Button
                        fullWidth
                        size="large"
                        sx={{ mt: 3 }}
                        type="submit"
                        variant="contained"
                      >
                        Continue
                      </Button>
              </form>
          </div>
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <AuthLayout>
    {page}
  </AuthLayout>
);

export default Page;
