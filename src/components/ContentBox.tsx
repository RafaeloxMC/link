"use client"
import { ReactNode } from 'react';
import { motion } from 'framer-motion';

export function ContentBox({ children, className, variants }: { children: ReactNode; className?: string, variants?: any }) {
    const classes = `relative z-20 flex flex-col items-center bg-white bg-opacity-10 backdrop-blur-3xl backdrop-filter rounded-3xl p-8 w-full max-w-md ${className}`;
    return (
        <motion.div className={classes} initial="hidden" animate="visible" variants={variants}>
            <div className="flex flex-col justify-center items-center w-full">
                {children}
            </div>
        </motion.div>
    );
}