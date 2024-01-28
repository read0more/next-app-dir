'use client';
import CartItem from '@/components/CartItem';
import useCart from '@/hooks/useCart';
import { Box, Divider, Typography } from '@mui/material';
import React from 'react';

export default function Cart() {
  const { cartItems } = useCart();
  return (
    <Box>
      <Typography variant="h5">Shopping Cart</Typography>
      <Box
        sx={{
          mt: 2,
        }}
      >
        {cartItems?.map((item, index) => (
          <>
            <CartItem key={item.id} item={item} />
            {index !== cartItems.length - 1 && (
              <Divider
                sx={{
                  marginY: 2,
                }}
              />
            )}
          </>
        ))}
      </Box>
    </Box>
  );
}
