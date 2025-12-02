import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Shield, Zap } from 'lucide-react';

const SpeedGuarantee = ({ delay = 0 }) => {
    const [pulseIntensity, setPulseIntensity] = useState(0.3);

    useEffect(() => {
        const interval = setInterval(() => {
            setPulseIntensity(0.3 + Math.random() * 0.3);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="py-12 sm:py-16 px-4 relative">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                    whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    viewport={{ once: true }}
                    transition={{
                        duration: 0.6,
                        delay,
                        ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                    className="relative p-8 sm:p-10 border-2 border-matrix-green/40 rounded-lg
                     bg-cyber-black/70 backdrop-blur-sm overflow-hidden group"
                    style={{
                        boxShadow: `0 0 40px hsla(var(--hue), 100%, 50%, ${pulseIntensity}), inset 0 0 60px hsla(var(--hue), 100%, 50%, 0.05)`
                    }}
                >
                    {/* Animated background grid */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0"
                            style={{
                                backgroundImage: 'linear-gradient(hsla(var(--hue), 100%, 50%, 0.1) 1px, transparent 1px), linear-gradient(90deg, hsla(var(--hue), 100%, 50%, 0.1) 1px, transparent 1px)',
                                backgroundSize: '20px 20px'
                            }}
                        />
                    </div>

                    {/* Scan line effect */}
                    <motion.div
                        className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-matrix-green/60 to-transparent"
                        animate={{ top: ['0%', '100%'] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                    />

                    <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
                        {/* Icon */}
                        <motion.div
                            animate={{
                                rotate: [0, 5, -5, 0],
                                scale: [1, 1.05, 1]
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: 'easeInOut'
                            }}
                            className="flex-shrink-0"
                        >
                            <div className="relative">
                                <Shield
                                    size={64}
                                    className="text-matrix-green"
                                    style={{
                                        filter: 'drop-shadow(0 0 20px hsla(var(--hue), 100%, 50%, 0.8))',
                                        strokeWidth: 1.5
                                    }}
                                />
                                {/* Pulsing ring */}
                                <motion.div
                                    className="absolute inset-0 rounded-full border-2 border-matrix-green/30"
                                    animate={{
                                        scale: [1, 1.3, 1],
                                        opacity: [0.5, 0, 0.5]
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: 'easeOut'
                                    }}
                                />
                            </div>
                        </motion.div>

                        {/* Content */}
                        <div className="flex-1 text-center sm:text-left">
                            <motion.h3
                                className="text-2xl sm:text-3xl font-bold mb-3 font-mono"
                                style={{
                                    color: '#ffffff',
                                    textShadow: '0 0 20px hsla(var(--hue), 100%, 50%, 0.4)'
                                }}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: delay + 0.2 }}
                            >
                                <Zap size={24} className="inline-block mr-2 text-matrix-green" />
                                Speed Guarantee
                            </motion.h3>

                            <motion.p
                                className="text-gray-300 text-base sm:text-lg leading-relaxed"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: delay + 0.3 }}
                            >
                                If I don't deliver within the promised time window{' '}
                                <span className="text-matrix-green font-semibold font-mono"
                                    style={{ textShadow: '0 0 10px hsla(var(--hue), 100%, 50%, 0.5)' }}>
                                    (24/48/72 hours)
                                </span>
                                , you get your money back.{' '}
                                <span className="text-white font-semibold">No questions asked.</span>
                            </motion.p>

                            {/* Subtext */}
                            <motion.p
                                className="text-gray-500 text-sm mt-3 font-mono"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: delay + 0.4 }}
                            >
                                → Zero risk. Zero delays. Zero bureaucracy.
                            </motion.p>
                        </div>
                    </div>

                    {/* Corner decorations */}
                    <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-matrix-green/60" />
                    <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-matrix-green/60" />
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-matrix-green/60" />
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-matrix-green/60" />

                    {/* Glitch effect overlay */}
                    <motion.div
                        className="absolute inset-0 bg-matrix-green/5 mix-blend-overlay pointer-events-none"
                        animate={{
                            opacity: [0, 0.1, 0, 0.05, 0]
                        }}
                        transition={{
                            duration: 0.3,
                            repeat: Infinity,
                            repeatDelay: 3 + Math.random() * 5
                        }}
                    />
                </motion.div>
            </div>
        </section>
    );
};

SpeedGuarantee.propTypes = {
    delay: PropTypes.number,
};

export default SpeedGuarantee;
