import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';

type CartItem = {
  id: string;
  cartId: string;
  quantity: number;
  productId: string;
};

type AddToCartParams = {
  cartId?: string;
  quantity: number;
  productId: string;
};

export default function useCart() {
  const queryClient = useQueryClient();
  const [cartId, setCartId] = useState(localStorage.getItem('cartId'));

  const { data: cartItems } = useQuery({
    queryKey: ['cart', cartId],
    queryFn: async () => {
      return cartId
        ? (
            await axios.get<CartItem[]>(
              `${process.env.NEXT_PUBLIC_API_URL}/cart/${cartId}`,
            )
          ).data
        : null;
    },
  });

  const addMutation = useMutation({
    mutationFn: ({ quantity, productId }: AddToCartParams) => {
      return axios.post<{
        cartId: number;
      }>(`${process.env.NEXT_PUBLIC_API_URL}/cart/${cartId}`, {
        quantity,
        productId,
      });
    },
    onSuccess: ({ data }) => {
      const responsedCartId = data.cartId.toString();
      localStorage.setItem('cartId', responsedCartId);
      setCartId(responsedCartId);
      queryClient.invalidateQueries({
        queryKey: ['cart', cartId],
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ quantity, productId }: AddToCartParams) => {
      return axios.patch<{
        cartId: number;
      }>(`${process.env.NEXT_PUBLIC_API_URL}/cart/${cartId}`, {
        quantity,
        productId,
      });
    },
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['cart', cartId],
      }),
  });

  return {
    cartItems,
    addCart: addMutation.mutate,
    updateCart: updateMutation.mutate,
    isAddCartPending: addMutation.isPending,
    isUpdateCartPending: updateMutation.isPending,
  };
}
