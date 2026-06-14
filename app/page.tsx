"use client";
import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import Button from '@mui/material/Button';
import { useUser } from '@clerk/nextjs';

import { SxProps, Theme } from '@mui/material/styles';

import Navbar from '@/components/Navbar';
import { useLanguage } from '@/context/LanguageContext';
import { useScrollNavigation } from './hooks/useScrollNavigation';

export default function Home() {
  const pathname = usePathname();
  const router = useRouter();
  const containerRef = useScrollNavigation('/about', null);
  const { user, isSignedIn } = useUser();
  const { t } = useLanguage();

  return (
    <>
      <Box ref={containerRef} sx={{
        height: '100%', // Fit parent (BackgroundCanva -> Body)
        overflowY: 'scroll',
        scrollSnapType: 'y mandatory',
        scrollBehavior: 'smooth',
        '&::-webkit-scrollbar': { display: 'none' },
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
        pb: 5 // Optional padding at bottom for content
      }}>
        <Navbar />
        <Container maxWidth="lg" sx={{
          scrollSnapAlign: 'start',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 4,
          pb: 20 // Shift content up visually
        }}>

          {/* === MOBILE LAYOUT (Original) === */}
          <Box sx={{ display: { xs: 'block', md: 'none' } }}>
            {isSignedIn && user?.firstName && (
              <Typography variant="h3" sx={{ fontSize: '1.5rem', fontWeight: 300, mb: 1, color: 'var(--purple)' }}>
                {t('home_nice_to_meet')} {user.firstName}!
              </Typography>
            )}
            <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 2 }}>
              <Typography variant="h1" sx={{ fontSize: '3rem', fontWeight: 350, lineHeight: 1.3, mr: 2 }}>
                {isSignedIn ? t('home_my') : t('home_hi_my')}
              </Typography>
              <Box sx={{ mb: 1 }}>
                <Image
                  src="/annaboiko.png"
                  alt="Anna Boiko"
                  width={250} // Increased size
                  height={250}
                  style={{ objectFit: 'contain' }}
                  priority
                />
              </Box>
            </Box>

            <Typography variant="h1" sx={{ fontSize: '3rem', fontWeight: 350, mb: 6, lineHeight: 1 }}>
              {t('home_name_is')} <strong>{t('home_name_anna')}</strong><span style={{ color: 'var(--dot-color)' }}>.</span>
            </Typography>

            <Typography variant="h3" sx={{ fontSize: '1.2rem', color: 'text', mb: 3, maxWidth: 600 }} dangerouslySetInnerHTML={{ __html: t('home_bio_mobile') }} />
            <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', mb: 2 }}>
              <Box sx={{
                borderRadius: '50px',
                px: 2,
                py: 0.8,
                fontSize: '0.85rem',
                fontWeight: 400,
                color: 'var(--text)',
                border: '1px solid var(--text)',
                opacity: 0.8,
                display: 'inline-flex',
                alignItems: 'center',
                bgcolor: 'transparent',
                lineHeight: 1
              }}>
                {t('home_status_fulltime')}
              </Box>
              <Box sx={{
                borderRadius: '50px',
                px: 2,
                py: 0.8,
                fontSize: '0.85rem',
                fontWeight: 400,
                color: 'var(--text)',
                border: '1px solid var(--text)',
                opacity: 0.8,
                display: 'inline-flex',
                alignItems: 'center',
                bgcolor: 'transparent',
                lineHeight: 1
              }}>
                {t('home_status_preference')}
              </Box>
            </Box>
          </Box>

          {/* === DESKTOP LAYOUT === */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, flexDirection: 'column', width: '100%', gap: 8 }}>
            {/* Top Row: Name + Image */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              {/* Left Names */}
              <Box>
                {isSignedIn && user?.firstName && (
                  <Typography variant="h3" sx={{ fontSize: '2.5rem', fontWeight: 300, mb: 1, color: 'var(--purple)' }}>
                    {t('home_nice_to_meet')} {user.firstName}!
                  </Typography>
                )}
                <Typography variant="h1" sx={{ fontSize: '7rem', fontWeight: 350, mb: 1, lineHeight: 1.2 }}>
                  {isSignedIn ? t('home_my') : t('home_hi_my')}
                </Typography>
                <Typography variant="h1" sx={{ fontSize: '7rem', fontWeight: 350, lineHeight: 1, whiteSpace: 'nowrap' }}>
                  {t('home_name_is')} <strong>{t('home_name_anna')}</strong><span style={{ color: 'var(--dot-color)' }}>.</span>
                </Typography>
              </Box>
              {/* Right Image */}
              <Box>
                <Image
                  src="/annaboiko.png"
                  alt="Anna Boiko"
                  width={600}
                  height={600}
                  style={{ objectFit: 'contain', maxWidth: '100%', height: 'auto' }}
                  priority
                />
              </Box>
            </Box>
            {/* Bottom Row: Bio */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Typography variant="h3" sx={{ fontSize: '1.5rem', color: 'text', maxWidth: 800 }} dangerouslySetInnerHTML={{ __html: t('home_bio_desktop') }} />
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Box sx={{
                  borderRadius: '50px',
                  px: 2.5,
                  py: 1,
                  fontSize: '0.95rem',
                  fontWeight: 400,
                  color: 'var(--text)',
                  border: '1px solid var(--text)',
                  opacity: 0.8,
                  display: 'inline-flex',
                  alignItems: 'center',
                  bgcolor: 'transparent',
                  lineHeight: 1
                }}>
                  {t('home_status_fulltime')}
                </Box>
                <Box sx={{
                  borderRadius: '50px',
                  px: 2.5,
                  py: 1,
                  fontSize: '0.95rem',
                  fontWeight: 400,
                  color: 'var(--text)',
                  border: '1px solid var(--text)',
                  opacity: 0.8,
                  display: 'inline-flex',
                  alignItems: 'center',
                  bgcolor: 'transparent',
                  lineHeight: 1
                }}>
                  {t('home_status_preference')}
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>

        <Container sx={{
          minHeight: '100vh',
          scrollSnapAlign: 'start',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start'
        }}>
          <Typography variant='h3' sx={{ fontSize: { xs: '2rem', md: '3rem' } }}>
            <strong>{t('home_work_together')}</strong><span style={{ color: 'var(--dot-color)' }}>.</span>
          </Typography>
          <Typography variant="h4" sx={{ mb: 3, fontWeight: 600, position: 'relative', top: -16, lineHeight: 1 }}><span style={{ color: 'var(--blue)' }}>____</span></Typography>
          <Typography variant='h5' sx={{ fontSize: { xs: '1rem', md: '1.5rem' } }} dangerouslySetInnerHTML={{ __html: t('home_work_description') }} />

          <Box sx={{
            display: 'flex',
            gap: 3,
            flexWrap: 'wrap',
            mt: 4,
            mb: 15,
            width: '100%'
          }}>
            <Button
              href="/Anna Boiko_Resume data analyst.pdf"
              download="Anna Boiko_Resume data analyst.pdf"
              sx={{
                px: { xs: 4, md: 5 },
                py: { xs: 1.2, md: 1.8 },
                fontSize: { xs: '1.1rem', md: '1.3rem' },
                fontWeight: 600,
                color: 'var(--btn-cv-text)',
                bgcolor: 'var(--btn-cv-bg)',
                border: '1px solid var(--btn-cv-border)',
                textTransform: 'none',
                borderRadius: '12px',
                boxShadow: 'var(--btn-cv-shadow)',
                transition: 'all 0.2s',
                '&:hover': {
                  bgcolor: 'var(--btn-cv-hover-bg)',
                  boxShadow: 'var(--btn-cv-hover-shadow)',
                  transform: 'translateY(-2px)'
                }
              }}
            >
              {t('home_download_cv')}
            </Button>

            <Button
              onClick={() => router.push('/contact')}
              sx={{
                px: { xs: 4, md: 5 },
                py: { xs: 1.2, md: 1.8 },
                fontSize: { xs: '1.1rem', md: '1.3rem' },
                fontWeight: 600,
                color: 'var(--purple)',
                bgcolor: 'var(--btn-touch-bg)',
                border: '1px solid var(--purple)',
                textTransform: 'none',
                borderRadius: '12px',
                transition: 'all 0.2s',
                '&:hover': {
                  bgcolor: 'var(--btn-touch-hover-bg)',
                  transform: 'translateY(-2px)'
                }
              }}
            >
              {t('home_get_in_touch')}
            </Button>
          </Box>
        </Container>
      </Box>


    </>
  );
}
