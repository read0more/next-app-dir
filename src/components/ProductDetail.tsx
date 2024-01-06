import { productDetail, MainImage } from './ProductDetail.css';
import { Chip, Grid } from '@mui/material';
import { Product } from './types/Product';
import Image from 'next/image';
import { formatPrice } from '@/lib/format';
import AddToCartButton from './AddToCartButton';

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
      <Grid container item xs={12} sm={6} direction={'column'} spacing={1}>
        <Grid item>
          <h2>{product.name}</h2>
        </Grid>
        <Grid item>
          <Chip
            label={formatPrice(product.price)}
            size="small"
            color="primary"
            sx={{
              width: '64px',
              margin: '.2rem 0',
            }}
          />
        </Grid>
        <Grid item>
          <p>{product.description}</p>
        </Grid>
        <Grid item>
          <AddToCartButton productId={product.id} />
        </Grid>
      </Grid>
    </Grid>
  );
}
