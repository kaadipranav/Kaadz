import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Snowflake } from 'lucide-react';

const PerformanceToggle = ({ isLowPerf, onToggle }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.5 }}
            className="fixed bottom-6 left-6 z-[1000]"
        >
            <AnimatePresence mode="wait">
                {!isLowPerf ? (
                    <motion.button
                        key="high-perf"
                        onClick={onToggle}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative px-4 py-3 bg-cyber-black/80 backdrop-blur-sm border border-red-500/50 rounded-lg shadow-lg hover:border-red-500 transition-all duration-300"
                        style={{
                            boxShadow: '0 0 20px rgba(239, 68, 68, 0.2)'
                        }}
                    >
                        <div className="flex items-center gap-2">
                            <motion.div
                                animate={{
                                    rotate: [0, -10, 10, -10, 0],
                                    scale: [1, 1.1, 1, 1.1, 1]
                                }}
                                transition={{
                                    duration: 0.5,
                                    repeat: Infinity,
                                    repeatDelay: 3
                                }}
                            >
                                <Flame className="w-4 h-4 text-red-500" />
                            </motion.div>
                            <span className="text-sm font-mono text-red-400 group-hover:text-red-300">
                                My PC can't handle this 💀
                            </span>
                        </div>

                        {/* Subtle fire glow effect */}
                        <motion.div
                            className="absolute inset-0 rounded-lg bg-red-500/10 blur-xl"
                            animate={{ opacity: [0.3, 0.6, 0.3] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                    </motion.button>
                ) : (
                    <motion.button
                        key="low-perf"
                        onClick={onToggle}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative px-4 py-3 bg-cyber-black/80 backdrop-blur-sm border border-matrix-green/50 rounded-lg shadow-lg hover:border-matrix-green transition-all duration-300"
                        style={{
                            boxShadow: '0 0 20px rgba(0, 255, 65, 0.2)'
                        }}
                    >
                        <div className="flex items-center gap-2">
                            <Snowflake className="w-4 h-4 text-matrix-green" />
                            <span className="text-sm font-mono text-matrix-green/80 group-hover:text-matrix-green">
                                Potato mode active 🥔
                            </span>
                        </div>

                        {/* Subtle green glow effect */}
                        <motion.div
                            className="absolute inset-0 rounded-lg bg-matrix-green/10 blur-xl"
                            animate={{ opacity: [0.3, 0.5, 0.3] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                    </motion.button>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default PerformanceToggle;
