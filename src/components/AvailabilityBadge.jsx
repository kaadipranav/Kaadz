import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const AvailabilityBadge = () => {
    const [pulse, setPulse] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setPulse(prev => !prev);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5, duration: 0.5 }}
            className="fixed top-20 right-4 z-50"
        >
            <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-cyber-black/90 backdrop-blur-sm border border-matrix-green/30 
                   rounded-lg px-4 py-2 flex items-center gap-2 shadow-lg"
                style={{
                    boxShadow: '0 0 20px hsla(var(--hue), 100%, 50%, 0.2)'
                }}
            >
                {/* Pulsing dot */}
                <motion.div
                    animate={{
                        scale: pulse ? [1, 1.2, 1] : 1,
                        opacity: pulse ? [1, 0.6, 1] : 1
                    }}
                    transition={{ duration: 1 }}
                    className="w-2 h-2 rounded-full bg-matrix-green"
                    style={{
                        boxShadow: '0 0 8px hsla(var(--hue), 100%, 50%, 0.8)'
                    }}
                />

                {/* Text */}
                <span className="text-xs sm:text-sm font-mono text-matrix-green">
                    Available for projects
                </span>
            </motion.div>
        </motion.div>
    );
};

export default AvailabilityBadge;
