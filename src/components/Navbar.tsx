'use client';

import {
  Badge,
  ClickAwayListener,
  Stack,
  TextField,
  Tooltip,
  Typography,
  tooltipClasses,
} from '@mui/material';
import SvgIcon from '@mui/material/SvgIcon';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { icon, iconBox, textfield } from './Navbar.css';
import useCart from '@/hooks/useCart';
import CartTooltip from './CartTooltip';
import { grey } from '@mui/material/colors';

export default function Navbar() {
  const { itemsCount } = useCart();
  const [openCart, setOpenCart] = useState(false);

  function handleTooltipToggle() {
    setOpenCart((prevOpen) => !prevOpen);
  }

  function handleTooltipClose() {
    setOpenCart(false);
  }

  return (
    <nav>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        margin={2}
      >
        <Link href="/">
          <Stack direction="row" spacing={2} alignItems="center">
            <Image src="/logo.svg" alt="logo" width={40} height={40} />
            <Typography variant="h6" color="black">
              E-commerce
            </Typography>
          </Stack>
        </Link>
        <Stack direction="row" spacing={2} alignItems="center">
          <TextField label="Search" variant="outlined" className={textfield} />

          <ClickAwayListener onClickAway={handleTooltipClose}>
            <div>
              <Tooltip
                PopperProps={{
                  disablePortal: true,
                }}
                onClose={handleTooltipClose}
                open={openCart}
                disableFocusListener
                disableHoverListener
                disableTouchListener
                arrow
                title={<CartTooltip />}
                componentsProps={{
                  tooltip: {
                    sx: {
                      backgroundColor: grey[600],
                      [`& .${tooltipClasses.arrow}`]: {
                        color: grey[600],
                      },
                    },
                  },
                }}
              >
                <div className={iconBox} onClick={handleTooltipToggle}>
                  <Badge
                    badgeContent={itemsCount ? itemsCount : ''}
                    color="primary"
                  >
                    <SvgIcon component={ShoppingCartIcon} className={icon} />
                  </Badge>
                </div>
              </Tooltip>
            </div>
          </ClickAwayListener>
        </Stack>
      </Stack>
    </nav>
  );
}
