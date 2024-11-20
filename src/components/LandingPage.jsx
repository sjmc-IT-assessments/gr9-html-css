import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, ChevronRight, Lock } from 'lucide-react';

const PremiumLanding = ({ onAccessGranted }) => {
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [currentParticleCount, setCurrentParticleCount] = useState(0);

    // Increased number of particles
    const particles = Array.from({ length: 2000 }); // Doubled the particles

    const checkPassword = async (e) => {
        e.preventDefault();
        if (password === 'PeppermintButler') {
            setLoading(true);
            setCurrentParticleCount(800); // Increased explosion particles
            await new Promise(r => setTimeout(r, 2000));
            onAccessGranted();
        } else {
            document.querySelector('.form-container').classList.add('shake');
            setTimeout(() => {
                document.querySelector('.form-container').classList.remove('shake');
            }, 500);
        }
    };

    return (
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-30 animate-gradient" />

            {/* Floating particles with better distribution */}
            <div className="absolute inset-0">
                {particles.map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-white rounded-full"
                        animate={{
                            x: [
                                Math.random() * window.innerWidth,
                                Math.random() * window.innerWidth + Math.random() * 100 - 50
                            ],
                            y: [
                                Math.random() * window.innerHeight,
                                Math.random() * window.innerHeight + Math.random() * 100 - 50
                            ],
                            scale: [
                                Math.random() * 0.5 + 0.5,
                                Math.random() * 0.5 + 0.5
                            ],
                            opacity: [0.2, 0.5, 0.2],
                        }}
                        transition={{
                            duration: Math.random() * 10 + 10, // More varied durations
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut",
                        }}
                        style={{
                            // Better initial distribution across the screen
                            left: `${(i % 10) * 10}%`,
                            top: `${Math.floor(i / 10) * 10}%`,
                        }}
                    />
                ))}
            </div>

            {/* Rest of your component stays the same */}
            <div className="relative z-10 flex items-center justify-center min-h-screen perspective-1000">
                <motion.div
                    className="form-container relative bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl w-[480px]"
                    initial={{ rotateX: -30, scale: 0.9, opacity: 0 }}
                    animate={{ rotateX: 0, scale: 1, opacity: 1 }}
                    transition={{ duration: 1, type: "spring" }}
                >
                    {/* Glowing borders */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-border-glow" />

                    {/* Content */}
                    <div className="relative z-10 space-y-6">
                        {/* School Logo */}
                        <motion.div
                            className="w-32 h-32 rounded-full bg-white/90 p-2 shadow-lg flex items-center justify-center">
                            {/* Try loading the logo first */}
                            <img
                                src="logo.png"
                                alt="School Logo"
                                className="w-full h-full object-contain object-center mx-auto"
                                onLoad={(e) => e.target.classList.remove('hidden')}
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    document.getElementById('backup-text').style.display = 'block';
                                }}
                            />
                            {/* Backup text that shows if image fails */}
                            <div
                                id="backup-text"
                                className="text-4xl font-bold text-blue-600 hidden"
                            >
                                SJMC
                            </div>
                        </motion.div>

                        <motion.h1
                            className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-pink-200"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            Digital Technology Assessment
                        </motion.h1>

                        <motion.p
                            className="text-center text-white/80"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            Grade 9 HTML & CSS
                        </motion.p>

                        <form onSubmit={checkPassword} className="space-y-4">
                            <motion.div
                                className="relative"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                            >
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 backdrop-blur-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                    placeholder="Enter access key"
                                    disabled={loading}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white/80 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </motion.div>

                            <motion.button
                                type="submit"
                                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 rounded-lg font-medium shadow-lg transition-all hover:shadow-xl hover:scale-[1.02] focus:scale-[0.98] flex items-center justify-center gap-2"
                                disabled={loading}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {loading ? (
                                    <>
                                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        <span>Authenticating...</span>
                                    </>
                                ) : (
                                    <>
                                        <Lock className="w-5 h-5" />
                                        <span>Begin Assessment</span>
                                        <ChevronRight className="w-5 h-5" />
                                    </>
                                )}
                            </motion.button>
                        </form>
                    </div>
                </motion.div>
            </div >

            {/* Success particles explosion */}
            < AnimatePresence >
                {
                    Array.from({ length: currentParticleCount }).map((_, i) => (
                        <motion.div
                            key={`success-particle-${i}`}
                            className="absolute w-2 h-2 bg-white rounded-full"
                            initial={{
                                x: window.innerWidth / 2,
                                y: window.innerHeight / 2,
                                scale: 0
                            }}
                            animate={{
                                x: Math.random() * window.innerWidth,
                                y: Math.random() * window.innerHeight,
                                scale: Math.random() * 2,
                                opacity: 0
                            }}
                            exit={{ opacity: 0 }}
                            transition={{
                                duration: 2,
                                ease: "easeOut"
                            }}
                        />
                    ))
                }
            </AnimatePresence >

            <div className="absolute bottom-4 w-full text-center text-white/70 text-sm italic z-10">
                Designed, Set and Developed with love❤️  Mr Coetzee
            </div>
            <style jsx>{`
        @keyframes border-glow {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 1; }
        }
        .animate-border-glow {
            animation: border-glow 3s ease-in-out infinite;
        }
        .animate-gradient {
            background-size: 400% 400%;
            animation: gradient 15s ease infinite;
        }
        @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; } 
            100% { background-position: 0% 50%; }
        }
        .perspective-1000 {
            perspective: 1000px;
        }
        .shake {
            animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }   
        @keyframes shake {
            10%, 90% { transform: translate3d(-1px, 0, 0); }
            20%, 80% { transform: translate3d(2px, 0, 0); }
            30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
            40%, 60% { transform: translate3d(4px, 0, 0); }
        }
        `}</style>

        </div >
    );
};

export default PremiumLanding;
