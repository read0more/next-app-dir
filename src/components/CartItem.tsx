import type { CartItem } from '@/hooks/useCart';
import { formatPrice } from '@/lib/format';
import {
  Stack,
  ListItem,
  Typography,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Image from 'next/image';
import React from 'react';

type Props = {
  item: CartItem;
};

export default function CartItem({ item }: Props) {
  const queryClient = useQueryClient();
  const maximumQuantity = item.quantity + 10;
  const mutation = useMutation({
    mutationFn: ({ quantity }: { quantity: number }) => {
      return axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/cart/${item.cartId}`,
        {
          productId: item.productId,
          quantity,
        },
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cart'],
      });
    },
  });

  const handleChange = (event: SelectChangeEvent) => {
    mutation.mutate({ quantity: +event.target.value });
  };

  return (
    <ListItem>
      <Stack direction="row" spacing={3} alignItems="center">
        <Image
          src={item.image_url}
          alt={item.name}
          width={150}
          height={200}
          objectFit="cover"
        />
        <Stack direction="column" spacing={2}>
          <Typography variant="h6">{item.name}</Typography>
          <p>Price: {formatPrice(item.price)}</p>
          <Stack direction="row" spacing={1} alignItems="center">
            <p>Quantity:</p>
            {/* TODO: 최대 수량 정해야함 */}
            <Select
              value={`${item.quantity}`}
              label="Quantity"
              onChange={handleChange}
              sx={{
                backgroundColor: 'white',
              }}
            >
              {Array.from({ length: maximumQuantity }, (_, i) => i + 1).map(
                (quantity) => (
                  <MenuItem key={quantity} value={quantity}>
                    {quantity}
                  </MenuItem>
                ),
              )}
            </Select>
          </Stack>
          <p>Total: {formatPrice(item.price * item.quantity)}</p>
        </Stack>
      </Stack>
    </ListItem>
  );
}
