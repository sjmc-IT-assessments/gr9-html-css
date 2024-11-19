import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const LandingPage = ({ onAccessGranted }) => {
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const checkPassword = async (e) => {
        e.preventDefault();
        if (password === 'DigitalCitizen2024') {
            setLoading(true);
            await new Promise(r => setTimeout(r, 1500)); // Loading effect
            onAccessGranted();
        } else {
            alert('Incorrect password');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 relative overflow-hidden flex flex-col items-center justify-center">
            {/* Floating bubbles background */}
            <div className="absolute inset-0 w-full h-full">
                {[...Array(40)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute animate-[float_3s_ease-in-out_infinite]"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 2}s`,
                            width: `${Math.random() * 25 + 5}px`,
                            height: `${Math.random() * 25 + 5}px`,
                            background: 'rgba(255,255,255,0.3)',
                            borderRadius: '50%'
                        }}
                    />
                ))}
            </div>

            {/* Content */}
            <div className="relative z-10 mb-8">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                    <svg className="w-16 h-16 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    </svg>
                </div>
            </div>

            <form onSubmit={checkPassword} className="relative z-10 bg-white/80 backdrop-blur p-8 rounded-xl shadow-xl w-96 space-y-6">
                <h1 className="text-3xl font-bold text-center text-gray-800">Digital Citizenship Assessment</h1>
                <p className="text-center text-gray-600">Grade 9 HTML/CSS</p>

                <div className="relative">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border p-3 pr-10 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-center"
                        placeholder="Enter password"
                        disabled={loading}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg transition-all hover:scale-105 disabled:opacity-50"
                    disabled={loading}
                >
                    {loading ? (
                        <div className="flex items-center justify-center">
                            <div className="animate-spin h-6 w-6 border-4 border-white border-t-transparent rounded-full" />
                            <span className="ml-2">Loading...</span>
                        </div>
                    ) : (
                        'Start Assessment'
                    )}
                </button>
            </form>

            <div className="absolute bottom-4 text-white/70 text-sm italic z-10">
                Designed and developed with ❤️ for Digital Technology
            </div>
        </div>
    );
};

export default LandingPage;