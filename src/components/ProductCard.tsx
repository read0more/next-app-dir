import React from 'react';
import type { Product } from './types/Product';
import { Grid } from '@mui/material';
import { card } from './ProductCard.css';
// import Image from 'next/image';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Grid item xs={4} sm={6}>
      <div className={card}>
        {/* TODO: next/image로 */}
        <img
          src={product.image_url}
          alt={product.name}
          width={300}
          height={300}
        />
        <div>{product.name}</div>
        <div>{product.price}</div>
        <div>{product.description}</div>
      </div>
    </Grid>
  );
}
