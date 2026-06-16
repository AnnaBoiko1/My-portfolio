'use client';

import { useState, useRef, useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Image from 'next/image';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

interface ImageCarouselProps {
    images: string[];
    alt: string;
    slideWidth?: string | number;
    objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
    height?: string | number | object;
}

export default function ImageCarousel({ images, alt, slideWidth = '85vw', objectFit = 'cover', height = '40vh' }: ImageCarouselProps) {
    const [open, setOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [scrollProgress, setScrollProgress] = useState(0);
    const scrollRef = useRef<HTMLDivElement>(null);

    const handleOpen = (src: string) => {
        setSelectedImage(src);
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const target = e.currentTarget;
        const totalScroll = target.scrollWidth - target.clientWidth;
        if (totalScroll <= 0) return;
        setScrollProgress(target.scrollLeft / totalScroll);
    };

    useEffect(() => {
        setScrollProgress(0);
        if (scrollRef.current) {
            scrollRef.current.scrollLeft = 0;
        }
    }, [images]);

    return (
        <>
            <Box
                ref={scrollRef}
                onScroll={handleScroll}
                sx={{
                    display: 'flex',
                    overflowX: 'auto',
                    scrollSnapType: 'x mandatory',
                    scrollBehavior: 'smooth',
                    gap: 2,
                    pb: 2,
                    '::-webkit-scrollbar': { display: 'none' }, // Hide scrollbar
                    scrollbarWidth: 'none'
                }}
            >
                {images.map((src, index) => (
                    <Box key={index} sx={{
                        minWidth: slideWidth, // Use prop
                        height: height,
                        scrollSnapAlign: 'center',
                        position: 'relative',
                        borderRadius: 3,
                        overflow: 'hidden',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                        flexShrink: 0
                    }}
                        onClick={() => handleOpen(src)}
                    >
                        <Image
                            src={src}
                            alt={`${alt} ${index + 1}`}
                            fill
                            style={{ objectFit: objectFit }} // Use prop
                        />
                    </Box>
                ))}
            </Box>

            {/* Pagination Controls */}
            {images.length > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, mt: 1.5, mb: 1 }}>
                    <Button
                        onClick={() => {
                            if (scrollRef.current) {
                                scrollRef.current.scrollBy({ left: -scrollRef.current.clientWidth, behavior: 'smooth' });
                            }
                        }}
                        sx={{
                            minWidth: 0,
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            bgcolor: 'rgba(167, 73, 214, 0.1)',
                            color: 'var(--purple)',
                            border: '1.5px solid rgba(167, 73, 214, 0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            '&:hover': {
                                bgcolor: 'var(--purple)',
                                color: '#ffffff',
                                boxShadow: '0 0 10px rgba(167, 73, 214, 0.3)'
                            }
                        }}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="15 18 9 12 15 6" />
                        </svg>
                    </Button>

                    {/* Progress Dots */}
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        {images.map((_, idx) => {
                            const totalImages = images.length;
                            const activeIndex = Math.min(
                                Math.round(scrollProgress * (totalImages - 1)),
                                totalImages - 1
                            );
                            return (
                                <Box
                                    key={idx}
                                    onClick={() => {
                                        if (scrollRef.current) {
                                            const targetLeft = idx * scrollRef.current.clientWidth;
                                            scrollRef.current.scrollTo({ left: targetLeft, behavior: 'smooth' });
                                        }
                                    }}
                                    sx={{
                                        width: activeIndex === idx ? '20px' : '8px',
                                        height: '8px',
                                        borderRadius: '4px',
                                        bgcolor: activeIndex === idx ? 'var(--purple)' : 'var(--copy-email-hover)',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease'
                                    }}
                                />
                            );
                        })}
                    </Box>

                    <Button
                        onClick={() => {
                            if (scrollRef.current) {
                                scrollRef.current.scrollBy({ left: scrollRef.current.clientWidth, behavior: 'smooth' });
                            }
                        }}
                        sx={{
                            minWidth: 0,
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            bgcolor: 'rgba(167, 73, 214, 0.1)',
                            color: 'var(--purple)',
                            border: '1.5px solid rgba(167, 73, 214, 0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            '&:hover': {
                                bgcolor: 'var(--purple)',
                                color: '#ffffff',
                                boxShadow: '0 0 10px rgba(167, 73, 214, 0.3)'
                            }
                        }}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 18 15 12 9 6" />
                        </svg>
                    </Button>
                </Box>
            )}

            {/* Full Screen Modal */}
            <Modal
                open={open}
                onClose={handleClose}
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'rgba(0,0,0,0.9)' }}
            >
                <Box sx={{ position: 'relative', maxWidth: '100vw', maxHeight: '100vh', outline: 'none' }}>
                    <IconButton
                        onClick={handleClose}
                        sx={{ position: 'absolute', top: 10, right: 10, color: 'white', zIndex: 2000 }}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </IconButton>
                    {selectedImage && (
                        <Image
                            src={selectedImage}
                            alt="Full screen view"
                            width={1200}
                            height={800}
                            style={{ maxWidth: '100vw', maxHeight: '100vh', objectFit: 'contain' }}
                        />
                    )}
                </Box>
            </Modal>
        </>
    );
}
