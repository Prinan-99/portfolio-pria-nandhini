"use client";

import { motion } from 'motion/react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        {
            name: 'GitHub',
            url: 'https://github.com/Prinan-99',
            icon: (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
            )
        },
        {
            name: 'LinkedIn',
            url: 'https://linkedin.com/in/prianandhinii',
            icon: (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.249-.129.597-.129.946v5.441h-3.554s.05-8.824 0-9.737h3.554v1.378c.43-.664 1.202-1.61 2.923-1.61 2.136 0 3.735 1.395 3.735 4.393v5.576zM5.337 8.855c-1.144 0-1.915-.758-1.915-1.71 0-.956.77-1.71 1.963-1.71 1.193 0 1.917.754 1.917 1.71 0 .952-.771 1.71-1.965 1.71zm1.946 11.597H3.392V9.615h3.891v10.837zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
                </svg>
            )
        },
        {
            name: 'Email',
            url: 'mailto:priunandhu2705@gmail.com',
            icon: (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
            )
        }
    ];

    return (
        <footer className="bg-neutral-950 border-t border-neutral-800">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-6 text-sm"
            >
                {/* Left - Connect */}
                <div className="flex items-center gap-3">
                    <span className="themed-text opacity-60">Connect:</span>
                    <div className="flex gap-3">
                        {socialLinks.map((social) => (
                            <motion.a
                                key={social.name}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.95 }}
                                className="themed-text opacity-60 hover:themed-accent transition-colors duration-300"
                                title={social.name}
                            >
                                {social.icon}
                            </motion.a>
                        ))}
                    </div>
                </div>

                {/* Center - Title */}
                <div className="themed-text opacity-60 text-center">
                    Designed and Built by <span className="themed-text font-semibold">Pria Nandhini</span>
                </div>

                {/* Right - Copyright */}
                <div className="themed-text opacity-60">
                    &copy; {currentYear} All Rights Reserved.
                </div>
            </motion.div>
        </footer>
    );
}
