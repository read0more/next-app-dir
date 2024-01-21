import React from 'react';
import { blueGrey, grey } from '@mui/material/colors';
import { Stack, ListItem, Box, Typography } from '@mui/material';
import type { SxProps } from '@mui/system';

const ListTitleSx: SxProps = {
  color: grey[300],
  marginBottom: 1,
};

const ListItemSx: SxProps = {
  padding: 0,
  color: 'white',
  cursor: 'pointer',
  '&:hover': {
    color: 'primary.main',
  },
};

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: blueGrey[600],
      }}
    >
      <Stack direction="row" justifyContent="space-between" padding={3}>
        <Box>
          <Typography variant="h6" color="black" sx={ListTitleSx}>
            SERVICES
          </Typography>
          <Stack direction="column" spacing={1} alignItems="center">
            <ListItem sx={ListItemSx}>Branding</ListItem>
            <ListItem sx={ListItemSx}>Design</ListItem>
            <ListItem sx={ListItemSx}>Marketing</ListItem>
            <ListItem sx={ListItemSx}>Advertisement</ListItem>
          </Stack>
        </Box>
        <Box>
          <Typography variant="h6" color="black" sx={ListTitleSx}>
            COMPANY
          </Typography>
          <Stack direction="column" spacing={1} alignItems="center">
            <ListItem sx={ListItemSx}>About us</ListItem>
            <ListItem sx={ListItemSx}>Contact</ListItem>
            <ListItem sx={ListItemSx}>Jobs</ListItem>
            <ListItem sx={ListItemSx}>Press kit</ListItem>
          </Stack>
        </Box>
        <Box>
          <Typography variant="h6" color="black" sx={ListTitleSx}>
            LEGAL
          </Typography>
          <Stack direction="column" spacing={1} alignItems="center">
            <ListItem sx={ListItemSx}>Terms of use</ListItem>
            <ListItem sx={ListItemSx}>Privacy policy</ListItem>
            <ListItem sx={ListItemSx}>Cookie policy</ListItem>
          </Stack>
        </Box>
      </Stack>
    </footer>
  );
}
