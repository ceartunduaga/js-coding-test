import React from 'react';
import PropTypes from 'prop-types';
import {
  TableRow,
  TableCell,
  IconButton,
  Collapse,
  Box,
  Typography,
  Table,
  TableHead,
  TableBody,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import moment from 'moment';

function Row({ row }) {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.OrderId}
        </TableCell>
        <TableCell>{moment(row.Date).format('MMMM Do YYYY, h:mm a')}</TableCell>
        <TableCell align="right">{row.Total}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Items
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Item</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell align="right">Unit</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.Items.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {item.Item}
                      </TableCell>
                      <TableCell>{item.Quantity}</TableCell>
                      <TableCell align="right">{item.ItemPrice}</TableCell>
                      <TableCell align="right">
                        {(
                          parseFloat(item.ItemPrice.replace('$', '')) *
                          item.Quantity
                        ).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    OrderId: PropTypes.number.isRequired,
    CustomerId: PropTypes.number.isRequired,
    CustomerName: PropTypes.string.isRequired,
    Total: PropTypes.string.isRequired,
    Date: PropTypes.string.isRequired,
    Items: PropTypes.arrayOf(
      PropTypes.shape({
        Item: PropTypes.string.isRequired,
        ItemPrice: PropTypes.string.isRequired,
        Quantity: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default Row;
