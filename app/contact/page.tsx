"use client";
import * as React from 'react';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { getCalApi } from "@calcom/embed-react";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Link from 'next/link';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactForm from "@/components/ContactForm";
import { useLanguage } from '@/context/LanguageContext';
import { useScrollNavigation } from '../hooks/useScrollNavigation';

export default function ContactPage() {
  const [copied, setCopied] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const containerRef = useScrollNavigation(null, '/projects');
  const { t } = useLanguage();

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "30min" });
      cal("ui", { "styles": { "branding": { "brandColor": "#000000" } }, "hideEventTypeDetails": false, "layout": "month_view" });
    })();
  }, []);
  return (
    <>
      <Box ref={containerRef} sx={{
        height: '100%',
        overflowY: 'scroll',
        scrollSnapType: 'y mandatory',
        scrollBehavior: 'smooth',
        '&::-webkit-scrollbar': { display: 'none' },
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
        pb: 5
      }}>
        <Navbar />
        {/* Секція  - перша snap точка */}
        <Container maxWidth="lg" sx={{
          scrollSnapAlign: 'start',
          scrollMarginTop: { xs: '60px', md: '90px' },
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          gap: 2,
          pt: { xs: 10, md: '10vh' },
          pb: { xs: 12, md: 20 }
        }}>

          {/* ✅ 2 КОНТЕНТ КОЛОНКИ як у Bootstrap */}
          <Grid container spacing={8} sx={{ px: { xs: 2, md: 12 } }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{
                width: 450,      // ✅ ФІКСОВАНА ширина
                maxWidth: '100%', // ✅ Responsive
                mx: 0            // ✅ Left alignment
              }}>
                <Typography variant='h3' sx={{ mb: 1, fontWeight: 700, fontSize: { xs: '2.2rem', md: '2.8rem' } }}>
                  {t('contact_title')}
                </Typography>

                {/* Blue underline decoration */}
                <Typography variant="h4" sx={{ mb: 2.5, fontWeight: 600, position: 'relative', lineHeight: 1 }}>
                  <span style={{ color: 'var(--blue)' }}>____</span>
                </Typography>

                {/* Job Search Status Pill */}
                <Box sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1.2,
                  px: 2,
                  py: 0.8,
                  borderRadius: '50px',
                  border: '1px solid var(--pill-green-border)',
                  bgcolor: 'var(--pill-green-bg)',
                  color: 'var(--pill-green-text)',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  mb: 3,
                  lineHeight: 1.2
                }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'var(--pill-green-text)', flexShrink: 0 }} />
                  <span>{t('contact_status_pill')}</span>
                </Box>

                {/* Short Paragraph Description */}
                <Typography variant='h5' sx={{
                  mb: 4,
                  fontSize: { xs: '1rem', md: '1.2rem' },
                  lineHeight: 1.6,
                  fontWeight: 400,
                  color: 'var(--text)',
                  opacity: 0.9
                }} dangerouslySetInnerHTML={{ __html: t('contact_description') }} />

                {/* Contact Links List */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.8, mb: 5 }}>
                  {/* Email Row */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', color: 'var(--text)', opacity: 0.7, flexShrink: 0 }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                    </Box>

                    {/* Email address + inline actions */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5, flexWrap: 'wrap', minWidth: 0 }}>
                      <Typography variant='h5' sx={{
                        fontSize: { xs: '1rem', md: '1.2rem' },
                        textDecoration: 'underline',
                        textDecorationColor: 'var(--purple)',
                        textDecorationThickness: '2px',
                        textUnderlineOffset: '4px',
                        fontWeight: 500,
                        color: 'var(--purple)',
                        cursor: 'pointer',
                        flexShrink: 0,
                        '&:hover': {
                          color: 'var(--blue)',
                          textDecorationColor: 'var(--blue)',
                        }
                      }}
                        onClick={async (e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          try {
                            await navigator.clipboard.writeText('annaboiko1@icloud.com');
                            setCopied(true);
                          } catch (err) {
                            const textArea = document.createElement('textarea');
                            textArea.value = 'annaboiko1@icloud.com';
                            document.body.appendChild(textArea);
                            textArea.select();
                            document.execCommand('copy');
                            document.body.removeChild(textArea);
                            setCopied(true);
                          }
                        }}
                      >
                        annaboiko1@icloud.com
                      </Typography>

                      {/* Inline actions */}
                      {copied ? (
                        <Typography sx={{ display: 'block', fontSize: '0.78rem', color: 'var(--blue)', fontWeight: 600, whiteSpace: 'nowrap' }}>
                          {t('contact_copied')}
                        </Typography>
                      ) : (
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0.8, flexShrink: 0 }}>
                          <Typography
                            onClick={async (e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              try {
                                await navigator.clipboard.writeText('annaboiko1@icloud.com');
                                setCopied(true);
                              } catch (err) {
                                const textArea = document.createElement('textarea');
                                textArea.value = 'annaboiko1@icloud.com';
                                document.body.appendChild(textArea);
                                textArea.select();
                                document.execCommand('copy');
                                document.body.removeChild(textArea);
                                setCopied(true);
                              }
                            }}
                            sx={{ display: 'block', fontSize: '0.78rem', color: 'var(--blue)', fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap', lineHeight: 1.6, '&:hover': { opacity: 0.7 } }}
                          >
                            {t('contact_copy')}
                          </Typography>
                          <Typography
                            component="a"
                            href="mailto:annaboiko1@icloud.com"
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                            sx={{ display: 'block', fontSize: '0.78rem', color: 'var(--blue)', fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap', textDecoration: 'none', lineHeight: 1.6, '&:hover': { opacity: 0.7 } }}
                          >
                            {t('contact_email')}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </Box>

                  {/* Location Row */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', color: 'var(--text)', opacity: 0.7 }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                    </Box>
                    <Typography variant='h5' sx={{
                      fontSize: { xs: '1rem', md: '1.2rem' },
                      fontWeight: 400,
                      color: 'var(--text)'
                    }}>
                      {t('contact_location_text')}
                    </Typography>
                  </Box>

                  {/* LinkedIn Row */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', color: 'var(--text)', opacity: 0.7 }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </Box>
                    <Link href="https://www.linkedin.com/in/anna-boiko1/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                      <Typography variant='h5' sx={{
                        fontSize: { xs: '1rem', md: '1.2rem' },
                        color: 'var(--purple)',
                        textDecoration: 'underline',
                        textDecorationColor: 'transparent',
                        textUnderlineOffset: '4px',
                        fontWeight: 500,
                        transition: 'all 0.2s',
                        '&:hover': {
                          color: 'var(--blue)',
                          textDecorationColor: 'var(--blue)',
                        }
                      }}>
                        linkedin.com/in/anna-boiko1
                      </Typography>
                    </Link>
                  </Box>

                  {/* GitHub Row */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', color: 'var(--text)', opacity: 0.7 }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.058-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.176 2.873.171 3.176.768.84 1.239 1.91 1.239 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </Box>
                    <Link href="https://github.com/AnnaBoiko1" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                      <Typography variant='h5' sx={{
                        fontSize: { xs: '1rem', md: '1.2rem' },
                        color: 'var(--purple)',
                        textDecoration: 'underline',
                        textDecorationColor: 'transparent',
                        textUnderlineOffset: '4px',
                        fontWeight: 500,
                        transition: 'all 0.2s',
                        '&:hover': {
                          color: 'var(--blue)',
                          textDecorationColor: 'var(--blue)',
                        }
                      }}>
                        github.com/AnnaBoiko1
                      </Typography>
                    </Link>
                  </Box>
                </Box>

                {/* Cal.com  */}
                <Box
                  data-cal-link="annaboiko/30min"
                  data-cal-namespace="30min"
                  data-cal-config='{"layout":"month_view"}'
                  sx={{
                    width: '100%',
                    maxWidth: '450px',
                    minHeight: '60px',
                    height: 'auto',
                    py: 1.5,
                    px: 2,
                    fontSize: '1.5rem',
                    fontWeight: 600,
                    color: 'var(--btn-text)',
                    bgcolor: 'transparent',
                    backgroundImage: `linear-gradient(45deg, transparent 25%, var(--btn-stripes) 25%, var(--btn-stripes) 50%, transparent 50%, transparent 75%, var(--btn-stripes) 75%)`,
                    textTransform: 'none',
                    display: 'inline-flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textShadow: '1px 1px 1px rgba(0,0,0,0.3), 0 0 3px rgba(255,255,255,0.4)',
                    backgroundSize: '15px 15px',
                    cursor: 'pointer',
                    position: 'relative',
                    backgroundOrigin: 'padding-box',
                    borderRadius: 3,
                    boxSizing: 'border-box',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      inset: 0,
                      borderRadius: 3,
                      padding: '3px',
                      background: 'var(--purple)',
                      WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      WebkitMaskComposite: 'xor',
                      maskComposite: 'exclude',
                      pointerEvents: 'none',
                    },
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 10px 30px var(--red)',
                      bgcolor: 'var(--btn-hover-bg)',
                      backgroundImage: 'none',
                      zIndex: 10
                    }
                  }}
                >
                  <Typography variant='h5' sx={{ fontWeight: 600, fontSize: { xs: '1.1rem', sm: '1.4rem', md: '1.6rem' }, textAlign: 'center' }}>
                    {t('contact_schedule_appointment')}
                  </Typography>
                </Box>


              </Box>
            </Grid>

            {/* ПРАВА КОЛОНКА - Форма (Desktop Only) */}
            <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Box sx={{ p: 4, borderRadius: 10, bgcolor: 'transparent', mt: 0 }}>
                <ContactForm />
              </Box>
            </Grid>
          </Grid>
        </Container>

        {/* NEW MOBILE FORM SECTION */}
        <Container maxWidth="lg" sx={{
          display: { xs: 'flex', md: 'none' },
          scrollSnapAlign: 'start',
          minHeight: '100vh',
          flexDirection: 'column',
          justifyContent: 'center',
          pb: 20
        }}>
          <Box sx={{ p: 2, borderRadius: 10, bgcolor: 'transparent' }}>
            <ContactForm />
          </Box>
        </Container>
        <Footer />
      </Box>


    </>

  );
}
