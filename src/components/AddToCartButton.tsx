'use client';

import { Button } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';

type AddToCartParams = {
  cartId?: string;
  quantity: number;
  productId: string;
};

export default function AddToCartButton({ productId }: { productId: string }) {
  const [cartId, setCartId] = useState(localStorage.getItem('cartId'));

  const mutation = useMutation({
    mutationFn: ({ quantity }: AddToCartParams) => {
      return axios.post<{
        cartId: number;
      }>(`${process.env.NEXT_PUBLIC_API_URL}/cart`, {
        cartId,
        quantity,
        productId,
      });
    },
    onSuccess: ({ data }) => {
      const responsedCartId = data.cartId.toString();
      localStorage.setItem('cartId', responsedCartId);
      setCartId(responsedCartId);
    },
  });

  return (
    <Button
      variant="contained"
      color="primary"
      sx={{
        mt: '.2rem',
      }}
      onClick={() => mutation.mutate({ quantity: 1, productId })}
    >
      Add to cart
    </Button>
  );
}
