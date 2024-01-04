import { grey } from '@mui/material/colors';
import { style } from '@vanilla-extract/css';

export const productDetail = style({
  padding: '10px',
  backgroundColor: grey[300],
});

export const MainImage = style({
  objectFit: 'cover',
  width: '100%',
});
