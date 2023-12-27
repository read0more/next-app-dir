import React from 'react';
import type { Product } from './types/Product';
import { Chip, Grid } from '@mui/material';
import { card } from './ProductCard.css';
import Image from 'next/image';
import { formatPrice } from '@/lib/format';

export default function ProductCard({
  product,
  isNew,
}: {
  product: Product;
  isNew?: boolean;
}) {
  return (
    <Grid item xs={4} sm={4}>
      <div className={card}>
        <Image
          src={product.image_url}
          alt={product.name}
          width={300}
          height={300}
        />
        <div>
          <h2>{product.name}</h2>
          {isNew && (
            <Chip
              label="New"
              size="small"
              sx={{
                width: '64px',
                margin: '.5rem 0',
              }}
            />
          )}
          <p>{product.description}</p>
          <span>{formatPrice(product.price)}</span>
        </div>
      </div>
    </Grid>
  );
}
