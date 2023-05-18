import { format } from 'date-fns';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { SeverityPill } from 'src/components/severity-pill';
import { useRouter } from 'next/navigation';

const statusMap = {
  waiting: 'warning',
  shipping: 'primary',
  delivered: 'success',
  return: 'error'
};

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

export const OverviewLatestOrders = (props) => {
  const { orders = [], sx } = props;
  const router = useRouter();
  const handleViewAllOrders = () => {
    router.push('/order');
  }

  return (
    <Card sx={sx}>
      <CardHeader title="Latest Orders" />
      <Scrollbar sx={{ flexGrow: 1 }}>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Order
                </TableCell>
                <TableCell>
                  Customer
                </TableCell>
                <TableCell sortDirection="desc">
                  Date
                </TableCell>
                <TableCell>
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => {
            

                return (
                  <TableRow
                    hover
                    key={order._id}
                  >
                    <TableCell>
                      {order.order_number}
                    </TableCell>
                    <TableCell>
                      {order.user_id.firstname + ' ' + order.user_id.lastname}
                    </TableCell>
                    <TableCell>
                      {formatDateTimeDislay(order.createdAt)}
                    </TableCell>
                    <TableCell>
                      <SeverityPill color={statusMap[order.order_status]}>
                        {order.order_status}
                      </SeverityPill>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
        onClick={handleViewAllOrders.bind(null)}
          color="inherit"
          endIcon={(
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          )}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </CardActions>
    </Card>
  );
};

OverviewLatestOrders.prototype = {
  orders: PropTypes.array,
  sx: PropTypes.object
};
