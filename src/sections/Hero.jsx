import { useState, useEffect } from 'react';

export default function Hero() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const roles = ['Website Developer', 'UI/UX Designer', 'Creative Coder'];
    const [currentRole, setCurrentRole] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentRole((prev) => (prev + 1) % roles.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden">
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-900/10 to-blue-900/20 pointer-events-none" />

            {/* Floating particles effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-orange-200/30 rounded-full animate-pulse"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${2 + Math.random() * 3}s`
                        }}
                    />
                ))}
            </div>

            <div className={`max-w-5xl w-full text-center space-y-8 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}>
                {/* Greeting badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-orange-200/30 rounded-full text-orange-100 text-sm font-medium animate-bounce">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    Available for work
                </div>

                {/* Main heading with gradient text */}
                <div className="space-y-4">
                    <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold">
                        <span className="inline-block animate-pulse">👋</span>
                        <span className="block mt-2 bg-gradient-to-r from-orange-200 via-orange-100 to-white bg-clip-text text-transparent drop-shadow-lg">
                            Hi, I'm Dev
                        </span>
                    </h1>

                    {/* Animated role text */}
                    <div className="h-12 flex items-center justify-center">
                        <p className="text-xl sm:text-2xl lg:text-3xl text-orange-100/90 font-light">
                            A <span className="font-semibold text-white transition-all duration-500 inline-block transform hover:scale-110">
                                {roles[currentRole]}
                            </span>
                        </p>
                    </div>

                    <p className="text-base sm:text-lg lg:text-xl text-orange-100/80 max-w-2xl mx-auto leading-relaxed">
                        from India 🇮🇳
                    </p>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
                    <a
                        href="#Contact"
                        className="group relative px-8 py-4 bg-gradient-to-r from-orange-400 to-orange-600 text-white text-lg font-semibold rounded-full shadow-2xl hover:shadow-orange-500/50 transform hover:scale-105 transition-all duration-300 overflow-hidden"
                    >
                        <span className="relative z-10">Let's Connect</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                    </a>

                    <a
                        href="#Projects"
                        className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-orange-200/50 text-orange-100 text-lg font-semibold rounded-full hover:bg-white/20 hover:border-orange-200 transform hover:scale-105 transition-all duration-300 shadow-lg"
                    >
                        View My Work
                    </a>
                </div>

                {/* Scroll indicator */}
                <div className="pt-12 animate-bounce">
                    <div className="w-6 h-10 border-2 border-orange-200/50 rounded-full mx-auto flex justify-center">
                        <div className="w-1 h-3 bg-orange-200 rounded-full mt-2 animate-pulse" />
                    </div>
                    <p className="text-orange-200/70 text-sm mt-2">Scroll to explore</p>
                </div>
            </div>
        </div>
    );
}