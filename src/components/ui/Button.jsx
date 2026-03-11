import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, variant = 'primary', size = 'md', onClick, className = '', ...props }) => {
    const baseStyles = "rounded-md font-semibold tracking-wide transition-all duration-300 inline-flex items-center justify-center gap-2 active:scale-95";

    const sizes = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg",
    };

    const variants = {
        primary: "bg-gradient-to-r from-accent-blue to-accent-purple text-white shadow-neon-blue hover:shadow-neon-purple hover:scale-[1.02]",
        secondary: "bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:border-white",
        outline: "bg-transparent border border-accent-blue text-accent-blue hover:bg-accent-blue/10 hover:shadow-neon-blue"
    };

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`${baseStyles} ${sizes[size]} ${variants[variant]} ${className}`}
            onClick={onClick}
            {...props}
        >
            {children}
        </motion.button>
    );
};

export default Button;
