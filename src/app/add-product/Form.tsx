'use client';

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button, Grid, Stack, TextField } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const schema = z.object({
  name: z.string({
    required_error: '이름을 입력해주세요',
  }),
  description: z.string().optional(),
  price: z.coerce.number().min(1, '가격은 1원 이상이어야 합니다'),
  imageUrl: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

const textFieldSx = {
  '& .MuiFilledInput-root': {
    background: 'white !important',
  },
  '& .MuiFilledInput-root:hover:before': {
    borderBottom: 'none !important',
  },
  '& .MuiFilledInput-root::before': {
    border: 'none',
  },
  '& .MuiFilledInput-root::after': {
    border: 'none',
  },
};

export default function Form() {
  const { register, handleSubmit } = useForm<FormValues>({
    mode: 'onBlur',
    resolver: zodResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: ({ name, description, price, imageUrl }: FormValues) => {
      return axios.post('http://localhost:8080/product', {
        name,
        description,
        price,
        imageUrl,
      });
    },
    onSuccess: () => {
      // Invalidate and refetch
      //   queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  });

  return (
    <form
      onSubmit={handleSubmit(
        (data) => mutation.mutate(data),
        (d) => console.log(d),
      )}
    >
      <Grid container marginY={4} gap={2}>
        <Stack spacing={2} flex={1}>
          <TextField
            label="Name"
            variant="filled"
            sx={textFieldSx}
            {...register('name')}
          />
          <TextField
            label="Description"
            variant="filled"
            sx={textFieldSx}
            multiline
            {...register('description')}
          />
          <TextField
            label="Image URL"
            variant="filled"
            type="url"
            sx={textFieldSx}
            {...register('imageUrl')}
          />
          <TextField
            label="Price"
            variant="filled"
            sx={textFieldSx}
            {...register('price')}
          />
          <Button variant="contained" type="submit">
            Default
          </Button>
        </Stack>
      </Grid>
    </form>
  );
}
