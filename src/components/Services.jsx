import { motion } from 'framer-motion';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Zap, Rocket, Sparkles, Check } from 'lucide-react';

const ServiceCard = ({ title, price, features, icon: Icon, delay = 0, tier }) => {
    const [isHovered, setIsHovered] = useState(false);

    const tierColors = {
        basic: 'from-blue-500/20 to-cyan-500/20',
        pro: 'from-purple-500/20 to-pink-500/20',
        premium: 'from-matrix-green/20 to-emerald-500/20'
    };

    const tierBorders = {
        basic: 'border-blue-500/30 hover:border-blue-500/60',
        pro: 'border-purple-500/30 hover:border-purple-500/60',
        premium: 'border-matrix-green/30 hover:border-matrix-green/60'
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{
                duration: 0.6,
                delay,
                ease: [0.25, 0.46, 0.45, 0.94]
            }}
            whileHover={{
                y: -8,
                transition: { duration: 0.3 }
            }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className={`relative p-6 border-2 ${tierBorders[tier]} rounded-lg
                  bg-cyber-black/60 backdrop-blur-sm transition-all duration-300
                  overflow-hidden group`}
            style={{
                boxShadow: isHovered
                    ? '0 0 40px hsla(var(--hue), 100%, 50%, 0.3), inset 0 0 40px hsla(var(--hue), 100%, 50%, 0.05)'
                    : '0 0 20px rgba(0,0,0,0.5)'
            }}
        >
            {/* Animated gradient background */}
            <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${tierColors[tier]} opacity-0 group-hover:opacity-100`}
                transition={{ duration: 0.3 }}
            />

            {/* Scan line effect */}
            {isHovered && (
                <motion.div
                    className="absolute left-0 right-0 h-[2px] bg-matrix-green/40"
                    animate={{ top: ['0%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                />
            )}

            <div className="relative z-10">
                {/* Icon */}
                <motion.div
                    animate={isHovered ? {
                        rotate: [0, -5, 5, -5, 0],
                        scale: [1, 1.1, 1]
                    } : {}}
                    transition={{ duration: 0.5 }}
                    className="mb-4"
                >
                    <Icon
                        size={32}
                        className="text-matrix-green"
                        style={{ filter: 'drop-shadow(0 0 8px hsla(var(--hue), 100%, 50%, 0.6))' }}
                    />
                </motion.div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-2 font-mono">
                    {title}
                </h3>

                {/* Price */}
                <div className="mb-6">
                    <motion.span
                        className="text-4xl font-bold text-matrix-green font-mono"
                        style={{ textShadow: '0 0 20px hsla(var(--hue), 100%, 50%, 0.5)' }}
                        animate={isHovered ? { scale: [1, 1.05, 1] } : {}}
                        transition={{ duration: 0.3 }}
                    >
                        ${price}
                    </motion.span>
                </div>

                {/* Features */}
                <ul className="space-y-3">
                    {features.map((feature, index) => (
                        <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: delay + 0.1 + (index * 0.05) }}
                            className="flex items-start gap-2 text-sm text-gray-300"
                        >
                            <Check
                                size={16}
                                className="text-matrix-green mt-0.5 flex-shrink-0"
                                style={{ filter: 'drop-shadow(0 0 4px hsla(var(--hue), 100%, 50%, 0.6))' }}
                            />
                            <span>{feature}</span>
                        </motion.li>
                    ))}
                </ul>

                {/* CTA Button */}
                <a href={`mailto:kaadipranav@gmail.com?subject=Let's Build: ${title}&body=Hi! I'm interested in the ${title} package. Let's discuss my project.`}>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full mt-6 py-3 px-6 bg-matrix-green/10 border border-matrix-green/30
                       hover:bg-matrix-green/20 hover:border-matrix-green/60
                       text-matrix-green font-semibold rounded-lg transition-all duration-300
                       font-mono text-sm cursor-pointer"
                        style={{
                            textShadow: '0 0 10px hsla(var(--hue), 100%, 50%, 0.5)'
                        }}
                    >
                        GET STARTED →
                    </motion.button>
                </a>
            </div>

            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-matrix-green/40" />
            <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-matrix-green/40" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-matrix-green/40" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-matrix-green/40" />
        </motion.div>
    );
};

ServiceCard.propTypes = {
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    features: PropTypes.arrayOf(PropTypes.string).isRequired,
    icon: PropTypes.elementType.isRequired,
    delay: PropTypes.number,
    tier: PropTypes.oneOf(['basic', 'pro', 'premium']).isRequired,
};

const Services = ({ delay = 0 }) => {
    const services = [
        {
            title: "24-Hour Landing Page",
            price: 199,
            tier: 'basic',
            icon: Zap,
            features: [
                "Fully responsive landing page",
                "Modern UI with animations",
                "Contact forms + email integration",
                "SEO optimized",
                "Deployed to Vercel/Netlify",
                "Source code included"
            ]
        },
        {
            title: "48-Hour MVP Build",
            price: 349,
            tier: 'pro',
            icon: Rocket,
            features: [
                "Full-stack web app with auth",
                "Database setup (Supabase/Firebase)",
                "User dashboard + admin panel",
                "Payment integration (Stripe)",
                "API endpoints",
                "Deployed + documented"
            ]
        },
        {
            title: "72-Hour Full Mini-SaaS",
            price: 699,
            tier: 'premium',
            icon: Sparkles,
            features: [
                "Complete SaaS architecture",
                "User authentication + roles",
                "AI integration (OpenAI, Claude, etc.)",
                "Analytics dashboard",
                "Subscription billing",
                "Email notifications",
                "Production-ready deployment"
            ]
        }
    ];

    return (
        <section id="services" className="py-12 sm:py-20 px-4 relative scroll-mt-20">
            <div className="max-w-6xl mx-auto">
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
                        MY SERVICES
                        <span className="text-matrix-green">/&gt;</span>
                    </motion.h2>
                    <motion.p
                        className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: delay + 0.2 }}
                    >
                        Fast execution. Fixed pricing. Zero bureaucracy.
                    </motion.p>
                </motion.div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    {services.map((service, index) => (
                        <ServiceCard
                            key={service.title}
                            {...service}
                            delay={delay + 0.3 + (index * 0.15)}
                        />
                    ))}
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

Services.propTypes = {
    delay: PropTypes.number,
};

export default Services;
