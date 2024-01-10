import { style } from '@vanilla-extract/css';
import { grey } from '@mui/material/colors';

export const textfield = style({
  minWidth: '250px',
});

export const iconBox = style({
  backgroundColor: grey[300],
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  padding: '.7rem',
  cursor: 'pointer',
});

export const icon = style({
  color: grey[600],
});
