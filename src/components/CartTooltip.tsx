import React from 'react';
import { Button, Stack, Typography } from '@mui/material';
import useCart from '@/hooks/useCart';
import { grey } from '@mui/material/colors';
import { formatPrice } from '@/lib/format';

export default function CartTooltip() {
  const { itemsCount, subtotal } = useCart();

  return (
    <Stack>
      <Typography variant="subtitle1">{itemsCount} Items</Typography>
      <Typography variant="subtitle1" mt={2} color={grey[300]}>
        Subtotal: {formatPrice(subtotal)}
      </Typography>
      <Button variant="contained" color="primary" fullWidth>
        VIEW CART
      </Button>
    </Stack>
  );
}
