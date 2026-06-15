"use client";
import * as React from 'react';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
// Imports
import {
    ClerkProvider,
    SignedIn,
    SignedOut,
    UserButton,
    useClerk, // Import useClerk
} from '@clerk/nextjs'
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { LanguageCode } from '@/lib/translations';



const NavigationSeparator = ({ sx }: { sx?: any }) => (
    <Typography sx={sx} component="span">|</Typography>
);

export default function Navbar() {
    const pathname = usePathname();
    const router = useRouter();
    const { openSignIn, signOut } = useClerk(); // Get methods

    // --- Theme State ---
    const { theme, toggleTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // --- Auth State ---


    // --- Language State ---
    const [languageAnchorEl, setLanguageAnchorEl] = useState<null | HTMLElement>(null);
    const { language, setLanguage, t } = useLanguage();
    const [hoveredLanguage, setHoveredLanguage] = useState<string | null>(null);
    const openLanguageMenu = Boolean(languageAnchorEl);

    const handleLanguageClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setLanguageAnchorEl(event.currentTarget);
    };

    // --- Sign Out Confirmation ---
    const [showSignOutDialog, setShowSignOutDialog] = useState(false);

    const handleSignOutClick = () => {
        setShowSignOutDialog(true);
    };

    const handleSignOutConfirm = async () => {
        setShowSignOutDialog(false);
        await signOut();
        router.push('/');
    };

    const handleSignOutCancel = () => {
        setShowSignOutDialog(false);
    };

    const handleLanguageClose = (lang?: LanguageCode) => {
        setLanguageAnchorEl(null);
        if (lang) setLanguage(lang);
    };

    // --- Styles ---
    const navLinkStyle = (path: string) => ({
        fontSize: { md: '1.1rem', lg: '1.25rem', xl: '1.4rem' },
        color: pathname === path ? 'var(--purple)' : 'var(--text)',
        textTransform: 'none',
        minWidth: 0,
        p: 0,
        '&:hover': { bgcolor: 'transparent', color: 'var(--purple)' }
    });

    const mobileNavLinkStyle = (path: string) => ({
        fontSize: '1rem',
        fontWeight: 600,
        color: pathname === path ? 'var(--purple)' : 'var(--text)',
        textTransform: 'none',
        minWidth: 0,
        p: 0,
        whiteSpace: 'nowrap'
    });

    // Prevent hydration errors by not rendering until mounted
    if (!mounted) {
        return null;
    }

    return (
        <>


            {/* Desktop Navbar (Sticky) */}
            <Box sx={{
                position: 'sticky',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 100,
                display: { xs: 'none', md: 'grid' },
                gridTemplateColumns: '1fr auto 1fr',
                alignItems: 'center',
                p: 4,
                pt: 6,
                background: 'var(--navbar-bg)',
                backdropFilter: 'blur(5px)',
                WebkitBackdropFilter: 'blur(5px)',
                transition: 'background-color 0.3s ease',
                height: '90px',
            }}>
                {/* Left: Empty Spacer for Grid */}
                <Box />



                {/* Center: Navigation */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: { md: 2, lg: 4, xl: 6 }, justifyContent: 'center' }}>
                    <Button onClick={() => router.push('/')} sx={navLinkStyle('/')}>{t('nav_home')}</Button>
                    <NavigationSeparator sx={{ fontSize: { md: '1.1rem', lg: '1.25rem', xl: '1.4rem' }, color: 'var(--text)', lineHeight: 1 }} />
                    <Button onClick={() => router.push('/about')} sx={navLinkStyle('/about')}>{t('nav_about')}</Button>
                    <NavigationSeparator sx={{ fontSize: { md: '1.1rem', lg: '1.25rem', xl: '1.4rem' }, color: 'var(--text)', lineHeight: 1 }} />
                    <Button onClick={() => router.push('/projects')} sx={navLinkStyle('/projects')}>{t('nav_projects')}</Button>
                    <NavigationSeparator sx={{ fontSize: { md: '1.1rem', lg: '1.25rem', xl: '1.4rem' }, color: 'var(--text)', lineHeight: 1 }} />
                    <Button onClick={() => router.push('/contact')} sx={navLinkStyle('/contact')}>{t('nav_contact')}</Button>
                </Box>

                {/* Right: Auth, Theme & Language */}
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', alignItems: 'center' }}>
                    {/* Auth Button */}
                    {/* Auth Buttons */}
                    <SignedOut>
                        <Button
                            onClick={() => openSignIn()}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                bgcolor: 'transparent',
                                p: 0,
                                minWidth: 0,
                                '&:hover': {
                                    bgcolor: 'transparent',
                                    opacity: 0.8,
                                    '& .MuiTypography-root': {
                                        background: 'var(--blue)',
                                        backgroundClip: 'text',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        color: 'transparent'
                                    }
                                }
                            }}
                        >
                            <img
                                src="/log_in.svg"
                                alt={t('nav_signup')}
                                width={32}
                                height={32}
                                style={{ marginBottom: '0px' }}
                            />
                            <Typography
                                sx={{
                                    fontSize: '0.65rem',
                                    fontWeight: 700,
                                    textTransform: 'none',
                                    lineHeight: 1,
                                    background: 'var(--purple)',
                                    backgroundClip: 'text',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    color: 'transparent'
                                }}
                            >
                                {t('nav_signup')}
                            </Typography>
                        </Button>
                    </SignedOut>
                    <SignedIn>
                        <Button
                            onClick={handleSignOutClick}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                bgcolor: 'transparent',
                                p: 0,
                                minWidth: 0,
                                '&:hover': {
                                    bgcolor: 'transparent',
                                    opacity: 0.8,
                                    '& .MuiTypography-root': {
                                        background: 'var(--purple)',
                                        backgroundClip: 'text',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        color: 'transparent'
                                    }
                                }
                            }}
                        >
                            <img
                                src="/log_out.svg"
                                alt={t('nav_signout')}
                                width={32}
                                height={32}
                                style={{ marginBottom: '0px' }}
                            />
                            <Typography
                                sx={{
                                    fontSize: '0.65rem',
                                    fontWeight: 700,
                                    textTransform: 'none',
                                    lineHeight: 1,
                                    background: 'var(--blue)',
                                    backgroundClip: 'text',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    color: 'transparent'
                                }}
                            >
                                {t('nav_signout')}
                            </Typography>
                        </Button>
                    </SignedIn>

                    {/* Theme Toggle */}
                    <Box
                        onClick={toggleTheme}
                        sx={{
                            width: 32,
                            height: 32,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            cursor: 'pointer',
                            transition: 'transform 0.2s',
                            '&:hover': { transform: 'scale(1.1)' }
                        }}
                    >
                        {theme === 'light' ? (
                            <span style={{ fontSize: '3rem', marginBottom: '6px' }}>☀</span>
                        ) : (
                            <span style={{ fontSize: '2.4rem', marginBottom: '6px' }}>☾</span>
                        )}
                    </Box>

                    {/* Language Dropdown */}
                    <Button
                        onClick={handleLanguageClick}
                        sx={{
                            fontSize: '1.4rem',
                            fontWeight: '900',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5,
                            color: 'var(--text)',
                            minWidth: 0,
                            textTransform: 'none',
                            p: 0
                        }}
                    >
                        {language} <span style={{ fontSize: '0.8em' }}>▼</span>
                    </Button>
                    <Menu
                        anchorEl={languageAnchorEl}
                        open={openLanguageMenu}
                        onClose={() => handleLanguageClose()}
                        PaperProps={{
                            sx: {
                                mt: 1,
                                bgcolor: 'var(--blue)',
                                borderRadius: '10px',
                                fontWeight: '800',
                                color: 'var(--text)',
                                border: '3px solid var(--purple)',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                            }
                        }}
                    >
                        {(['EN', 'FR', 'UA', 'DE'] as LanguageCode[]).map((lang) => (
                            <MenuItem
                                key={lang}
                                onClick={() => handleLanguageClose(lang)}
                                onMouseEnter={() => setHoveredLanguage(lang)}
                                onMouseLeave={() => setHoveredLanguage(null)}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    gap: 2,
                                    fontWeight: 500,
                                    fontSize: { xs: '1rem', md: '1.7rem' },
                                    p: 1,
                                    mt: { xs: -2, md: -2 },
                                    mb: { xs: -2, md: -2 },
                                    color: 'var(--background)',
                                    '&:hover': {
                                        color: 'var(--purple)',
                                        fontWeight: 900,
                                    }

                                }}
                            >
                                {lang}
                                <Box
                                    component="span"
                                    sx={{
                                        opacity: hoveredLanguage === lang ? 1 : (language === lang ? { xs: 1, md: 0 } : 0),
                                        transition: 'opacity 0.2s',
                                        fontSize: '0.9em',
                                        color: 'var(--background)'
                                    }}
                                >
                                    ✔
                                </Box>
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
            </Box>

            {/* Mobile Navbar (Bottom Fixed) */}
            <Box sx={{
                width: '100%',
                bottom: 0,
                position: "fixed",
                left: 0,
                right: 0,
                display: { xs: 'flex', md: 'none' },
                justifyContent: 'center',
                pb: 6,
                alignItems: 'center',
                gap: 2,
                zIndex: 100,
                backgroundColor: 'transparent',
                pt: 2,
                height: '80px',
            }}>
                <Button onClick={() => router.push('/')} sx={mobileNavLinkStyle('/')}>{t('nav_home')}</Button>
                <NavigationSeparator sx={{ fontSize: '1rem', fontWeight: 300, color: 'var(--text)', lineHeight: 1 }} />
                <Button onClick={() => router.push('/about')} sx={mobileNavLinkStyle('/about')}>{t('nav_about')}</Button>
                <NavigationSeparator sx={{ fontSize: '1rem', fontWeight: 300, color: 'var(--text)', lineHeight: 1 }} />
                <Button onClick={() => router.push('/projects')} sx={mobileNavLinkStyle('/projects')}>{t('nav_projects')}</Button>
                <NavigationSeparator sx={{ fontSize: '1rem', fontWeight: 300, color: 'var(--text)', lineHeight: 1 }} />
                <Button onClick={() => router.push('/contact')} sx={mobileNavLinkStyle('/contact')}>{t('nav_contact')}</Button>
            </Box>

            {/* Mobile Top Bar for Auth/Theme/Lang (Optional, adding since users asked for these features and desktop only shows them) */}
            <Box sx={{
                position: 'fixed',
                top: 2,
                left: 10,
                right: 20,
                zIndex: 100,
                display: { xs: 'flex', md: 'none' },
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 2,
                p: 2,
                backgroundColor: 'transparent',
                // backdropFilter: 'blur(5px)',
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <SignedOut>
                        <Button
                            onClick={() => openSignIn()}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                bgcolor: 'transparent',
                                p: 0,
                                minWidth: 0,
                                '&:hover': {
                                    bgcolor: 'transparent',
                                    opacity: 0.8,
                                    '& .MuiTypography-root': {
                                        background: 'var(--blue)',
                                        backgroundClip: 'text',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        color: 'transparent'
                                    }
                                }
                            }}
                        >
                            <img
                                src="/log_in.svg"
                                alt={t('nav_signup')}
                                width={28}
                                height={28}
                                style={{ marginBottom: '0px' }}
                            />
                            <Typography
                                sx={{
                                    fontSize: '0.6rem',
                                    fontWeight: 700,
                                    textTransform: 'none',
                                    lineHeight: 1,
                                    background: 'var(--purple)',
                                    backgroundClip: 'text',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    color: 'transparent'
                                }}
                            >
                                {t('nav_signup')}
                            </Typography>
                        </Button>
                    </SignedOut>
                    <SignedIn>
                        <Button
                            onClick={handleSignOutClick}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                bgcolor: 'transparent',
                                p: 0,
                                minWidth: 0,
                                '&:hover': {
                                    bgcolor: 'transparent',
                                    opacity: 0.8,
                                    '& .MuiTypography-root': {
                                        background: 'var(--purple)',
                                        backgroundClip: 'text',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        color: 'transparent'
                                    }
                                }
                            }}
                        >
                            <img
                                src="/log_out.svg"
                                alt={t('nav_signout')}
                                width={28}
                                height={28}
                                style={{ marginBottom: '0px' }}
                            />
                            <Typography
                                sx={{
                                    fontSize: '0.6rem',
                                    fontWeight: 700,
                                    textTransform: 'none',
                                    lineHeight: 1,
                                    background: 'var(--blue)',
                                    backgroundClip: 'text',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    color: 'transparent'
                                }}
                            >
                                {t('nav_signout')}
                            </Typography>
                        </Button>
                    </SignedIn>
                </Box>

                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <Box
                        onClick={toggleTheme}
                        sx={{ width: 28, height: 28, display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}
                    >
                        {theme === 'light' ? (
                            <span style={{ fontSize: '2.4rem', marginBottom: '4px' }}>☀</span>
                        ) : (
                            <span style={{ fontSize: '2rem', marginBottom: '4px' }}>☾</span>
                        )}
                    </Box>
                    <Button
                        onClick={handleLanguageClick}
                        sx={{ fontSize: '1rem', fontWeight: '900', color: 'var(--text)', minWidth: 0, p: 0 }}
                    >
                        {language} <span style={{ fontSize: '1em', marginLeft: 6 }}>▼</span>
                    </Button>

                </Box>
            </Box>

            {/* Sign Out Confirmation Dialog */}
            <Dialog
                open={showSignOutDialog}
                onClose={handleSignOutCancel}
                PaperProps={{
                    sx: {
                        bgcolor: 'var(--blue)',
                        borderRadius: '20px',
                        border: '3px solid var(--purple)',
                        p: 2,
                        color: 'var(--text)'
                    }
                }}
            >
                <DialogTitle sx={{ fontWeight: 800, fontSize: '1.5rem', color: 'var(--purple)', textAlign: 'center' }}>
                    {t('nav_signout')}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{
                        color: theme === 'dark' ? '#0f0f23' : 'var(--text)',
                        fontSize: '1.1rem',
                        fontWeight: 500,
                        textAlign: 'center'
                    }}>
                        {t('signout_confirm_message')}
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ gap: 2, p: 3, justifyContent: 'center' }}>
                    <Button
                        onClick={handleSignOutCancel}
                        sx={{
                            bgcolor: '#f0f9ff',
                            color: 'var(--purple)',
                            textTransform: 'none',
                            fontWeight: 700,
                            borderRadius: '10px',
                            px: 2,
                            '&:hover': { bgcolor: '#e0f2fe' }
                        }}
                    >
                        {t('signout_confirm_cancel')}
                    </Button>
                    <Button
                        onClick={handleSignOutConfirm}
                        variant="contained"
                        sx={{
                            bgcolor: 'var(--purple)',
                            color: '#fff',
                            textTransform: 'none',
                            fontWeight: 700,
                            borderRadius: '10px',
                            '&:hover': { bgcolor: 'var(--purple)', opacity: 0.9 }
                        }}
                    >
                        {t('signout_confirm_button')}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
