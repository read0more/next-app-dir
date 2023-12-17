'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import ProductCard from './ProductCard';
import type { Product } from './types/Product';
import { Grid } from '@mui/material';

export default function ProductList() {
  const { data } = useQuery({
    queryKey: ['productList'],
    queryFn: () => {
      return axios.get(`${process.env.NEXT_PUBLIC_API_URL}/product`);
    },
  });

  return (
    <Grid container spacing={3}>
      {data?.data.map((product: Product) => {
        return <ProductCard key={product.id} product={product} />;
      })}
    </Grid>
  );
}
