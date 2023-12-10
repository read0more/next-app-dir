import type { Metadata } from 'next';
import { Box, Container, Typography } from '@mui/material';
import React from 'react';
import Form from './Form';

export const metadata: Metadata = {
  title: 'Ecommerce add product',
  description: 'Ecommerce website add product',
};

export default function AddProductPage() {
  return (
    <Box bgcolor="grey.200">
      <Container
        sx={{
          pt: 2,
          pb: 2,
        }}
      >
        <Typography variant="h6">Add Product</Typography>
        <Form />
      </Container>
    </Box>
  );
}
