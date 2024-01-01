import React from 'react';
import { productDetail, MainImage, productInfo } from './ProductDetail.css';
import { Chip, Grid } from '@mui/material';
import { Product } from './types/Product';
import Image from 'next/image';
import { formatPrice } from '@/lib/format';

export default function ProductDetail({ product }: { product: Product }) {
  return (
    <Grid container spacing={3} className={productDetail}>
      <Grid item xs={12} sm={6}>
        <Image
          src={product.image_url}
          alt={product.name}
          width={500}
          height={500}
          className={MainImage}
        />
      </Grid>
      <Grid item xs={12} sm={6} className={productInfo}>
        <h2>{product.name}</h2>
        <Chip
          label={formatPrice(product.price)}
          size="small"
          color="primary"
          sx={{
            width: '64px',
            margin: '.5rem 0',
          }}
        />
        <p>{product.description}</p>
      </Grid>
    </Grid>
  );
}
