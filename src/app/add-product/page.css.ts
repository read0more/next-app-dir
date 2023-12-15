import { style, globalStyle } from '@vanilla-extract/css';

export const textField = style({});

globalStyle(`${textField} .MuiFilledInput-root`, {
  background: 'white !important',
});

globalStyle(`${textField} .MuiFilledInput-root:hover:before`, {
  borderBottom: 'none !important',
});

globalStyle(`${textField} .MuiFilledInput-root::before`, {
  border: 'none',
});

globalStyle(`${textField} .MuiFilledInput-root::after`, {
  border: 'none',
});

export const loadingSpinner = style({
  marginLeft: '10px',
});
