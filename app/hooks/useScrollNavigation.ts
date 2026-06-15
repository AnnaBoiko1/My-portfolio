import { useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export function useScrollNavigation(nextPath: string | null, prevPath: string | null) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const containerRef = useRef<HTMLDivElement>(null);
    const isNavigating = useRef(false);

    // Restore scroll position if coming from "next" page (scrolling up)
    useEffect(() => {
        const direction = searchParams.get('direction');
        if (direction === 'up') {
            isNavigating.current = true; // Block navigation immediately to prevent inertia from triggering prev page nav

            if (containerRef.current) {
                // Use timeout to ensure content is loaded/rendered and layout is settled
                setTimeout(() => {
                    if (containerRef.current) {
                        containerRef.current.scrollTop = 0;

                        // Unlock navigation after restoration and a buffer for inertia to dissipate
                        setTimeout(() => {
                            isNavigating.current = false;
                        }, 800);
                    } else {
                        isNavigating.current = false;
                    }
                }, 10);
            } else {
                isNavigating.current = false;
            }
        }
    }, [searchParams]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Throttle navigation to prevent multiple pushes
        const navigate = (path: string, direction: 'up' | 'down') => {
            if (isNavigating.current) return;
            isNavigating.current = true;

            if (direction === 'up') {
                router.push(`${path}?direction=up`);
            } else {
                router.push(path);
            }

            // Reset navigation lock after a bit in case navigation fails or cancels
            // But usually unmount happens first
            setTimeout(() => {
                isNavigating.current = false;
            }, 1500);
        };

        // Accumulated delta for wheel — requires intentional over-scroll before navigating
        const WHEEL_THRESHOLD = 300; // px of accumulated delta needed
        const RESET_DELAY = 200;     // ms of inactivity before resetting accumulated delta

        let accumulatedDelta = 0;
        let resetTimer: ReturnType<typeof setTimeout> | null = null;

        const handleWheel = (e: WheelEvent) => {
            const { scrollTop, scrollHeight, clientHeight } = container;
            // Buffer (1px) to handle fractional pixels or zoom levels
            const isAtBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 2;
            const isAtTop = scrollTop <= 0;

            const atEdge = (e.deltaY > 0 && isAtBottom && nextPath) ||
                           (e.deltaY < 0 && isAtTop && prevPath);

            if (!atEdge) {
                // Not at the edge — reset accumulator
                accumulatedDelta = 0;
                if (resetTimer) clearTimeout(resetTimer);
                return;
            }

            // Accumulate delta only when at the edge
            accumulatedDelta += e.deltaY;

            // Reset accumulator after inactivity (e.g. user pauses scrolling)
            if (resetTimer) clearTimeout(resetTimer);
            resetTimer = setTimeout(() => {
                accumulatedDelta = 0;
            }, RESET_DELAY);

            if (Math.abs(accumulatedDelta) >= WHEEL_THRESHOLD) {
                accumulatedDelta = 0;
                if (e.deltaY > 0 && isAtBottom && nextPath) {
                    navigate(nextPath, 'down');
                } else if (e.deltaY < 0 && isAtTop && prevPath) {
                    navigate(prevPath, 'up');
                }
            }
        };

        // Touch handling
        let touchStartY = 0;

        const handleTouchStart = (e: TouchEvent) => {
            touchStartY = e.touches[0].clientY;
        }

        const handleTouchEnd = (e: TouchEvent) => {
            const touchEndY = e.changedTouches[0].clientY;
            const deltaY = touchStartY - touchEndY; // Positive = swipe up (scroll down)
            const { scrollTop, scrollHeight, clientHeight } = container;
            const isAtBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 2;
            const isAtTop = scrollTop <= 0;

            if (deltaY > 80 && isAtBottom && nextPath) {
                navigate(nextPath, 'down');
            } else if (deltaY < -80 && isAtTop && prevPath) {
                navigate(prevPath, 'up');
            }
        }

        container.addEventListener('wheel', handleWheel);
        container.addEventListener('touchstart', handleTouchStart);
        container.addEventListener('touchend', handleTouchEnd);

        return () => {
            container.removeEventListener('wheel', handleWheel);
            container.removeEventListener('touchstart', handleTouchStart);
            container.removeEventListener('touchend', handleTouchEnd);
            if (resetTimer) clearTimeout(resetTimer);
        };
    }, [nextPath, prevPath, router]);

    return containerRef;
}
