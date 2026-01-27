"use client";

import React, { useState } from 'react';
import Header from './reuseable-components/Header';
import { motion } from 'motion/react';
import emailjs from '@emailjs/browser';

export default function Contact(){
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
    const [isDark, setIsDark] = useState(true);

    React.useEffect(() => {
        const checkTheme = () => {
            setIsDark(document.documentElement.classList.contains('dark'));
        };
        checkTheme();
        const observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
        return () => observer.disconnect();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            // Replace these with your EmailJS credentials from https://emailjs.com
            const serviceId = 'service_8metefh';
            const templateId = 'template_bd732t7';
            const publicKey = 'XJtIt2c9ZqSSuJ334';

            const templateParams = {
                from_name: formData.name,
                from_email: formData.email,
                message: formData.message,
                to_email: 'priunandhu2705@gmail.com'
            };

            await emailjs.send(
                serviceId,
                templateId,
                templateParams,
                publicKey
            );

            setSubmitStatus('success');
            setFormData({ name: '', email: '', message: '' });
            setTimeout(() => setSubmitStatus('idle'), 3000);
        } catch (error) {
            console.error('Email sending failed:', error);
            setSubmitStatus('error');
            setTimeout(() => setSubmitStatus('idle'), 3000);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEmailClick = () => {
        window.location.href = `mailto:priunandhu2705@gmail.com`;
    };

    const socialIcons = [
        {
            id: 'github',
            label: 'GitHub',
            icon: (
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
            ),
            description: 'Check out my projects',
            bgGradient: 'from-gray-700 to-gray-900',
            hoverGradient: 'group-hover:from-indigo-600 group-hover:to-purple-600',
            hoverText: 'group-hover:text-indigo-400',
            url: 'https://github.com/Prinan-99',
            type: 'link'
        },
        {
            id: 'linkedin',
            label: 'LinkedIn',
            icon: (
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.249-.129.597-.129.946v5.441h-3.554s.05-8.824 0-9.737h3.554v1.378c.43-.664 1.202-1.61 2.923-1.61 2.136 0 3.735 1.395 3.735 4.393v5.576zM5.337 8.855c-1.144 0-1.915-.758-1.915-1.71 0-.956.77-1.71 1.963-1.71 1.193 0 1.917.754 1.917 1.71 0 .952-.771 1.71-1.965 1.71zm1.946 11.597H3.392V9.615h3.891v10.837zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
                </svg>
            ),
            description: 'Connect with me professionally',
            bgGradient: 'from-blue-600 to-blue-800',
            hoverGradient: 'group-hover:from-blue-500 group-hover:to-cyan-500',
            hoverText: 'group-hover:text-blue-400',
            url: 'https://linkedin.com/in/prianandhinii',
            type: 'link'
        },
        {
            id: 'email',
            label: 'Email',
            icon: (
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
            ),
            description: 'Send me an email',
            bgGradient: 'from-red-600 to-pink-600',
            hoverGradient: 'group-hover:from-red-500 group-hover:to-pink-500',
            hoverText: 'group-hover:text-red-400',
            url: null,
            type: 'email'
        }
    ];

    return(
        <section id="contact" className="py-16 sm:py-24 relative overflow-hidden">
            {/* Grid Background Pattern - white for light theme, dark gray for dark theme */}
            <div className="absolute inset-0 z-0"
                style={{
                    backgroundSize: '20px 20px',
                    backgroundImage: isDark 
                        ? 'linear-gradient(to right, #262626 1px, transparent 1px), linear-gradient(to bottom, #262626 1px, transparent 1px)'
                        : 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)'
                }}
            />

            {/* Radial gradient for the container to give a faded look */}
            <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center dark:mask-[radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>

            {/* Content */}
            <div className="relative z-10">
                <Header title="Contact Me"/>
            
            {/* Success Pop-up Modal */}
            {submitStatus === 'success' && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 flex items-center justify-center z-50 bg-black/50"
                >
                    <motion.div
                        initial={{ scale: 0.8, y: -50 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.8, y: -50 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        className="bg-linear-to-br from-green-900/80 to-green-800/80 backdrop-blur-md border border-green-500/50 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl"
                    >
                        <div className="flex flex-col items-center text-center gap-4">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center"
                            >
                                <svg className="w-8 h-8 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                                </svg>
                            </motion.div>
                            
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                                <p className="text-green-200 text-sm">
                                    Thank you for reaching out. I&apos;ll get back to you soon.
                                </p>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setSubmitStatus('idle')}
                                className="mt-4 px-6 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold transition-colors"
                            >
                                Close
                            </motion.button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
            
            <div className="grid md:grid-cols-2 gap-12 md:gap-16 mt-12">
                {/* Left Side - Social Icons with Hover Reveal */}
                <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center justify-center"
                >
                    {/* Message Section */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-10"
                    >
                        <h3 className={`text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>Let&apos;s Connect</h3>
                        <p className={`text-sm leading-relaxed max-w-xs mx-auto font-bold ${isDark ? 'text-neutral-300' : 'text-[#1a1a2e]'}`}>
                            Feel free to reach out to me.<br />
                            I&apos;m eager to collaborate and discuss<br />
                            new opportunities.
                        </p>
                    </motion.div>

                    <div className="flex flex-col gap-6 items-center justify-center w-full">
                        {socialIcons.map((social, index) => (
                            <motion.div
                                key={social.id}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                onMouseEnter={() => setHoveredIcon(social.id)}
                                onMouseLeave={() => setHoveredIcon(null)}
                                className="flex justify-center w-full"
                            >
                                {social.type === 'link' ? (
                                    <a
                                        href={social.url || '#'}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex justify-center"
                                    >
                                        <motion.div
                                            className={`rounded-xl flex items-center text-white cursor-pointer ${
                                                isDark 
                                                    ? 'shadow-lg hover:shadow-2xl'
                                                    : 'shadow-[0_4px_20px_rgba(0,0,0,0.25)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.35)] border-2 border-gray-800'
                                            } ${
                                                social.id === 'github' 
                                                    ? isDark 
                                                        ? 'bg-linear-to-br from-gray-700 to-gray-900 hover:from-indigo-600 hover:to-purple-600'
                                                        : 'bg-linear-to-br from-gray-700 to-gray-900 hover:from-indigo-600 hover:to-purple-600'
                                                    : isDark
                                                        ? 'bg-linear-to-br from-blue-600 to-blue-800 hover:from-blue-500 hover:to-cyan-500'
                                                        : 'bg-linear-to-br from-blue-600 to-blue-800 hover:from-blue-500 hover:to-cyan-500'
                                            }`}
                                            animate={{ 
                                                width: hoveredIcon === social.id ? '280px' : '64px',
                                            }}
                                            transition={{ 
                                                type: "spring",
                                                stiffness: 260,
                                                damping: 20
                                            }}
                                            style={{ height: '64px' }}
                                        >
                                            <div className="flex items-center justify-start gap-4 w-full px-4">
                                                <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                                                    {social.icon}
                                                </div>
                                                <motion.div
                                                    animate={{ 
                                                        opacity: hoveredIcon === social.id ? 1 : 0,
                                                        x: hoveredIcon === social.id ? 0 : -20
                                                    }}
                                                    transition={{ 
                                                        duration: 0.2,
                                                        delay: hoveredIcon === social.id ? 0.1 : 0
                                                    }}
                                                    className="overflow-hidden whitespace-nowrap"
                                                >
                                                    <h4 className="text-base font-bold text-white leading-tight">
                                                        {social.label}
                                                    </h4>
                                                    <p className="text-xs text-white/90 leading-tight mt-0.5">
                                                        {social.description}
                                                    </p>
                                                </motion.div>
                                            </div>
                                        </motion.div>
                                    </a>
                                ) : (
                                    <button
                                        onClick={handleEmailClick}
                                        className="border-none bg-transparent p-0 cursor-pointer flex justify-center"
                                    >
                                        <motion.div
                                            className={`rounded-xl flex items-center text-white ${
                                                isDark
                                                    ? 'shadow-lg hover:shadow-2xl bg-gradient-to-br from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500'
                                                    : 'shadow-[0_4px_20px_rgba(0,0,0,0.25)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.35)] border-2 border-gray-800 bg-gradient-to-br from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500'
                                            }`}
                                            animate={{ 
                                                width: hoveredIcon === social.id ? '280px' : '64px',
                                            }}
                                            transition={{ 
                                                type: "spring",
                                                stiffness: 260,
                                                damping: 20
                                            }}
                                            style={{ height: '64px' }}
                                        >
                                            <div className="flex items-center justify-start gap-4 w-full px-4">
                                                <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                                                    {social.icon}
                                                </div>
                                                <motion.div
                                                    animate={{ 
                                                        opacity: hoveredIcon === social.id ? 1 : 0,
                                                        x: hoveredIcon === social.id ? 0 : -20
                                                    }}
                                                    transition={{ 
                                                        duration: 0.2,
                                                        delay: hoveredIcon === social.id ? 0.1 : 0
                                                    }}
                                                    className="overflow-hidden whitespace-nowrap"
                                                >
                                                    <h4 className="text-base font-bold text-white leading-tight">
                                                        {social.label}
                                                    </h4>
                                                    <p className="text-xs text-white/90 leading-tight mt-0.5">
                                                        {social.description}
                                                    </p>
                                                </motion.div>
                                            </div>
                                        </motion.div>
                                    </button>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Right Side - Contact Form */}
                <motion.div 
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col justify-center"
                >
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name Input */}
                        <div>
                            <label htmlFor="name" className={`block text-sm font-bold mb-2 ${isDark ? 'text-neutral-300' : 'text-[#1a1a2e]'}`}>
                                Your Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="Your Name"
                                className={`w-full px-4 py-3 rounded-lg font-bold focus:outline-none focus:ring-2 transition-all duration-300 ${isDark ? 'bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 focus:border-indigo-500 focus:ring-indigo-500/20' : 'bg-white border-2 border-[#1a1a2e] text-[#1a1a2e] placeholder-gray-400 focus:border-[#4a90e2] focus:ring-[#4a90e2]/20'}`}
                            />
                        </div>

                        {/* Email Input */}
                        <div>
                            <label htmlFor="email" className={`block text-sm font-bold mb-2 ${isDark ? 'text-neutral-300' : 'text-[#1a1a2e]'}`}>
                                Your Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="your@email.com"
                                className={`w-full px-4 py-3 rounded-lg font-bold focus:outline-none focus:ring-2 transition-all duration-300 ${isDark ? 'bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 focus:border-indigo-500 focus:ring-indigo-500/20' : 'bg-white border-2 border-[#1a1a2e] text-[#1a1a2e] placeholder-gray-400 focus:border-[#4a90e2] focus:ring-[#4a90e2]/20'}`}
                            />
                        </div>

                        {/* Message Input */}
                        <div>
                            <label htmlFor="message" className={`block text-sm font-bold mb-2 ${isDark ? 'text-neutral-300' : 'text-[#1a1a2e]'}`}>
                                Your Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                placeholder="Let us Connect..."
                                rows={5}
                                className={`w-full px-4 py-3 rounded-lg font-bold focus:outline-none focus:ring-2 transition-all duration-300 resize-none ${isDark ? 'bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 focus:border-indigo-500 focus:ring-indigo-500/20' : 'bg-white border-2 border-[#1a1a2e] text-[#1a1a2e] placeholder-gray-400 focus:border-[#4a90e2] focus:ring-[#4a90e2]/20'}`}
                            />
                        </div>

                        {/* Status Messages */}
                        {submitStatus === 'success' && (
                            <motion.div 
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-4 rounded-lg bg-green-500/20 border border-green-500/50 text-green-400"
                            >
                                ✓ Message sent successfully! I&apos;ll get back to you soon.
                            </motion.div>
                        )}
                        
                        {submitStatus === 'error' && (
                            <motion.div 
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-4 rounded-lg bg-red-500/20 border border-red-500/50 text-red-400"
                            >
                                ✗ Something went wrong. Please try again.
                            </motion.div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full px-6 py-3 rounded-lg bg-green-500 text-white font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 hover:shadow-[0_0_25px_rgba(34,197,94,0.6)]"
                        >
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                        </button>
                    </form>
                </motion.div>
            </div>
            </div>
        </section>
    );
}