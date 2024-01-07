'use client';

import useCart from '@/hooks/useCart';
import { Button } from '@mui/material';
import React from 'react';

export default function AddToCartButton({ productId }: { productId: string }) {
  const {
    cartItems,
    addCart,
    updateCart,
    isAddCartPending,
    isUpdateCartPending,
  } = useCart();
  // 현재 카트에 담긴 상품들 중에서 현재 상품에 대한 수량을 가져온다.
  const currentQuantity =
    cartItems?.find((item) => item.productId === productId)?.quantity ?? 0;

  const isUpdate = currentQuantity > 0;
  const handleOnClick = isUpdate ? updateCart : addCart;
  const isPending = isUpdate ? isUpdateCartPending : isAddCartPending;

  return (
    <Button
      variant="contained"
      color="primary"
      disabled={isPending}
      sx={{
        mt: '.2rem',
      }}
      onClick={() =>
        handleOnClick({ productId, quantity: currentQuantity + 1 })
      }
    >
      {isPending ? 'Adding to cart...' : 'Add to cart'}
    </Button>
  );
}
