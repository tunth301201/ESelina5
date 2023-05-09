import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { Box, Divider, MenuItem, MenuList, Popover, Typography } from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';
import { getUserProfile } from 'src/api/apiServices';

export const AccountPopover = (props) => {
  const { anchorEl, onClose, open } = props;
  const router = useRouter();
  const auth = useAuth();
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    getUserProfile().then((res) => {
      setUserProfile(res.data);
    })
  },[]);

  const handleSignOut = useCallback(
    () => {
      onClose?.();
      auth.signOut();
      localStorage.removeItem('token');
      router.push('/auth/login');
    },
    [onClose, auth, router]
  );

  
  const handleViewAccount = () => {
    router.push({
      pathname: '/account',
    });
  }


  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom'
      }}
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 200 } }}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2
        }}
        
      >
        <Typography variant="overline">
          Account
        </Typography>
        {userProfile? (
          <Typography
            color="text.secondary"
            variant="body2"
            onClick={handleViewAccount.bind(null)}
          >
            {userProfile.firstname} {userProfile.lastname}
          </Typography>
        ): ""}
        
      </Box>
      <Divider />
      <MenuList
        disablePadding
        dense
        sx={{
          p: '8px',
          '& > *': {
            borderRadius: 1
          }
        }}
      >
        <MenuItem onClick={handleSignOut}>
          Sign out
        </MenuItem>
      </MenuList>
    </Popover>
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired
};
