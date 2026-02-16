'use client';

import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';

export default function FloatingNav() {
    const [visible, setVisible] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, 'change', (latest) => {
        setVisible(latest > 300);
    });

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded-full backdrop-blur-xl bg-[rgba(10,10,10,0.7)] border border-[var(--border)] shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
        >
            <div className="flex items-center gap-6">
                <button
                    onClick={scrollToTop}
                    className="text-sm font-light text-[var(--gold)] hover:text-[var(--gold-light)] transition-colors duration-300 tracking-[-0.01em]"
                >
                    kaadz
                </button>
                <div className="w-px h-3 bg-[var(--border)]" />
                <div className="flex items-center gap-1.5">
                    <div className="status-dot" />
                    <span className="text-mono text-[10px] text-[var(--text-muted)] tracking-[0.15em] uppercase">
                        Online
                    </span>
                </div>
            </div>
        </motion.nav>
    );
}
