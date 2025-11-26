import { motion } from 'framer-motion';

const ScanlineEffect = () => {
    return (
        <div className="fixed inset-0 pointer-events-none z-[998] overflow-hidden">
            {/* Periodic vertical scanline sweep */}
            <motion.div
                className="absolute w-full h-1 bg-gradient-to-b from-transparent via-matrix-green/20 to-transparent"
                style={{
                    boxShadow: '0 0 20px rgba(0, 255, 65, 0.3)',
                    filter: 'blur(1px)'
                }}
                animate={{
                    top: ['-10%', '110%']
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'linear',
                    repeatDelay: 5
                }}
            />

            {/* Subtle horizontal scanlines (CRT effect) */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 65, 0.1) 2px, rgba(0, 255, 65, 0.1) 4px)',
                    pointerEvents: 'none'
                }}
            />

            {/* Random glitch scanlines */}
            <motion.div
                className="absolute w-full h-px bg-cyan-400/40"
                style={{
                    boxShadow: '0 0 10px rgba(0, 255, 255, 0.4)',
                }}
                animate={{
                    top: ['20%', '80%', '40%', '90%', '10%'],
                    opacity: [0, 1, 0, 1, 0]
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    times: [0, 0.2, 0.4, 0.7, 1]
                }}
            />
        </div>
    );
};

export default ScanlineEffect;
