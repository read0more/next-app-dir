import { style, globalStyle } from '@vanilla-extract/css';
import { grey } from '@mui/material/colors';

export const card = style({
  padding: '.5rem',
  borderRadius: '5px',
  backgroundColor: 'white',
  minHeight: '500px',
  display: 'flex',
  flexDirection: 'column',
});

globalStyle(`${card} > img`, {
  width: '100%',
  height: '200px',
  objectFit: 'cover',
});

globalStyle(`${card} > div`, {
  display: 'flex',
  flexDirection: 'column',
  padding: '1rem',
  flex: 1,
});

globalStyle(`${card} > div > span`, {
  marginTop: 'auto',
});

// export const mainCard = style([
//   card,
//   {
//     minHeight: '0',
//     display: 'flex',
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: '2rem',
//   },
// ]);
export const mainCard = style({
  minHeight: '0',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '2rem',
  padding: '.5rem',
  borderRadius: '5px',
  backgroundColor: 'white',
});

globalStyle(`${mainCard} > img`, {
  flex: 1,
});

globalStyle(`${mainCard} > div`, {
  padding: '0',
  flex: 2,
});

globalStyle(`${mainCard} > div > span`, {
  display: 'block',
  marginTop: '1rem',
  color: grey[500],
});

globalStyle(`${mainCard} > div > button`, {
  marginTop: '1rem',
});
