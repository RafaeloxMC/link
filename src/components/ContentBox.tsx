import { ReactNode } from 'react';

export function ContentBox({ children, className }: { children: ReactNode; className?: string }) {
    const classes = `relative z-20 flex flex-col items-center bg-white bg-opacity-10 backdrop-blur-3xl backdrop-filter rounded-3xl p-8 w-full max-w-md ${className}`;
    return (
        <div className={classes}>
            <div className="flex flex-col justify-center items-center w-full">
                {children}
            </div>
        </div>
    );
}