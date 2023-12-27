import React from 'react';
import type { Product } from './types/Product';
import { Button, Grid } from '@mui/material';
import { mainCard } from './ProductCard.css';
import Image from 'next/image';

export default function MainProductCard({ product }: { product: Product }) {
  return (
    <Grid item xs={12}>
      <div className={mainCard}>
        <Image
          src={product.image_url}
          alt={product.name}
          width={300}
          height={300}
        />
        <div>
          <h2>{product.name}</h2>
          <span>{product.description}</span>
          <Button variant="contained" color="primary">
            Check it out
          </Button>
        </div>
      </div>
    </Grid>
  );
}
