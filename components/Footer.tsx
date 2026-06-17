'use client';
import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const [mounted, setMounted] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Box
      sx={{
        width: '100%',
        py: 2,
        px: 2,
        mt: 'auto',
        textAlign: 'right',
        fontSize: '0.1rem',
        scrollSnapAlign: 'end',
      }}
    >
      <Typography variant="caption"
        sx={{ fontSize: '0.75rem', color: 'var(--footer-text)' }}>
        © {new Date().getFullYear()} {t('common_full_name')}. All rights reserved.
      </Typography>
    </Box>
  );
}
