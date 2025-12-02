import { motion } from 'framer-motion';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { MessageSquare, Code, Rocket } from 'lucide-react';

const ProcessStep = ({ number, icon: Icon, title, description, delay = 0, isLast = false }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="relative">
            <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay }}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                className="flex gap-4 sm:gap-6 group"
            >
                {/* Step number and icon */}
                <div className="flex flex-col items-center">
                    <motion.div
                        animate={isHovered ? {
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, -5, 0]
                        } : {}}
                        transition={{ duration: 0.5 }}
                        className="relative w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center
                       border-2 border-matrix-green/40 rounded-lg bg-cyber-black/60
                       group-hover:border-matrix-green/80 transition-all duration-300"
                        style={{
                            boxShadow: isHovered
                                ? '0 0 20px hsla(var(--hue), 100%, 50%, 0.4)'
                                : '0 0 10px hsla(var(--hue), 100%, 50%, 0.2)'
                        }}
                    >
                        <Icon
                            size={24}
                            className="text-matrix-green"
                            style={{ filter: 'drop-shadow(0 0 8px hsla(var(--hue), 100%, 50%, 0.6))' }}
                        />

                        {/* Step number badge */}
                        <motion.div
                            className="absolute -top-2 -right-2 w-6 h-6 rounded-full 
                         bg-matrix-green/20 border border-matrix-green/60
                         flex items-center justify-center"
                            animate={isHovered ? { scale: [1, 1.2, 1] } : {}}
                            transition={{ duration: 0.3 }}
                        >
                            <span className="text-xs font-bold text-matrix-green font-mono">
                                {number}
                            </span>
                        </motion.div>
                    </motion.div>

                    {/* Connecting line */}
                    {!isLast && (
                        <motion.div
                            className="w-[2px] flex-1 mt-2 bg-gradient-to-b from-matrix-green/40 to-matrix-green/10"
                            initial={{ scaleY: 0 }}
                            whileInView={{ scaleY: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: delay + 0.2 }}
                            style={{ transformOrigin: 'top' }}
                        />
                    )}
                </div>

                {/* Content */}
                <div className="flex-1 pb-8">
                    <motion.h4
                        className="text-lg sm:text-xl font-bold text-white mb-2 font-mono"
                        style={{
                            textShadow: isHovered ? '0 0 15px hsla(var(--hue), 100%, 50%, 0.3)' : 'none'
                        }}
                    >
                        {title}
                    </motion.h4>
                    <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                        {description}
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

ProcessStep.propTypes = {
    number: PropTypes.number.isRequired,
    icon: PropTypes.elementType.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    delay: PropTypes.number,
    isLast: PropTypes.bool,
};

const Process = ({ delay = 0 }) => {
    const steps = [
        {
            icon: MessageSquare,
            title: "You describe your idea",
            description: "Tell me what you need. I'll ask the right questions. No fluff, no corporate theater."
        },
        {
            icon: Code,
            title: "I build the MVP within 24/48/72 hours",
            description: "Fast execution. Daily updates. Clean code. No surprises."
        },
        {
            icon: Rocket,
            title: "We polish it and deploy",
            description: "Final tweaks. Testing. Launch. You're live."
        }
    ];

    return (
        <section className="py-12 sm:py-20 px-4 relative">
            <div className="max-w-4xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay }}
                    className="text-center mb-12 sm:mb-16"
                >
                    <motion.h2
                        className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
                        style={{
                            color: '#ffffff',
                            fontFamily: 'Space Grotesk, sans-serif',
                            textShadow: '0 0 30px hsla(var(--hue), 100%, 50%, 0.3)'
                        }}
                    >
                        <span className="text-matrix-green">&lt;</span>
                        HOW WE WORK
                        <span className="text-matrix-green">/&gt;</span>
                    </motion.h2>
                    <motion.p
                        className="text-gray-400 text-base sm:text-lg"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: delay + 0.2 }}
                    >
                        Three steps. Zero bureaucracy.
                    </motion.p>
                </motion.div>

                {/* Process Steps */}
                <div className="relative">
                    {/* Background terminal effect */}
                    <div className="absolute inset-0 border border-matrix-green/10 rounded-lg bg-cyber-black/20 backdrop-blur-sm" />

                    <div className="relative p-6 sm:p-8">
                        {steps.map((step, index) => (
                            <ProcessStep
                                key={index}
                                number={index + 1}
                                {...step}
                                delay={delay + 0.3 + (index * 0.15)}
                                isLast={index === steps.length - 1}
                            />
                        ))}
                    </div>

                    {/* Corner decorations */}
                    <div className="absolute top-0 left-0 w-4 h-4 border-l border-t border-matrix-green/30" />
                    <div className="absolute top-0 right-0 w-4 h-4 border-r border-t border-matrix-green/30" />
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-l border-b border-matrix-green/30" />
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-r border-b border-matrix-green/30" />
                </div>

                {/* Decorative line */}
                <motion.div
                    className="w-32 h-px bg-gradient-to-r from-transparent via-matrix-green/30 to-transparent mx-auto mt-16"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: delay + 0.8 }}
                />
            </div>
        </section>
    );
};

Process.propTypes = {
    delay: PropTypes.number,
};

export default Process;
