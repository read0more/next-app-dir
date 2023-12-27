'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import ProductCard from './ProductCard';
import type { Product } from './types/Product';
import { Grid } from '@mui/material';
import MainProductCard from './MainProductCard';

export default function ProductList() {
  const { data } = useQuery({
    queryKey: ['productList'],
    queryFn: () => {
      return axios.get(`${process.env.NEXT_PUBLIC_API_URL}/product`);
    },
  });
  const mainProduct = data?.data[0];

  return (
    <Grid container spacing={3}>
      {mainProduct && <MainProductCard product={mainProduct} />}
      {data?.data.slice(1).map((product: Product, index: number) => {
        const isNew = index < 3;
        return <ProductCard key={product.id} product={product} isNew={isNew} />;
      })}
    </Grid>
  );
}
