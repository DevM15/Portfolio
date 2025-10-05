import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faBriefcase, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

export default function Navbar() {
    const [active, setActive] = useState('home');

    const navItems = [
        { id: 'home', icon: faHome, label: 'Home', href: '#' },
        { id: 'about', icon: faUser, label: 'About', href: '#About' },
        { id: 'projects', icon: faBriefcase, label: 'Projects', href: '#Projects' },
        { id: 'contact', icon: faEnvelope, label: 'Contact', href: '#Contact' }
    ];

    return (
        <div className="w-full flex justify-center fixed bottom-8 left-0 right-0 z-50 px-4">
            <nav className="backdrop-blur-md bg-white/80 dark:bg-gray-900/80 rounded-full shadow-2xl border border-orange-200/50 dark:border-orange-500/30 px-6 py-3 transition-all duration-300 hover:shadow-orange-200/50 hover:shadow-2xl">
                <ul className="flex items-center gap-2 md:gap-4">
                    {navItems.map((item, index) => (
                        <li key={item.id} className="flex items-center">
                            <a
                                href={item.href}
                                onClick={() => setActive(item.id)}
                                className={`group flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${active === item.id
                                        ? 'bg-gradient-to-r from-orange-400 to-orange-600 text-white shadow-lg scale-105'
                                        : 'text-gray-700 dark:text-gray-300 hover:bg-orange-100 dark:hover:bg-orange-900/30 hover:text-orange-600 dark:hover:text-orange-400'
                                    }`}
                            >
                                <FontAwesomeIcon
                                    icon={item.icon}
                                    className={`text-sm md:text-base transition-transform duration-300 ${active === item.id ? 'scale-110' : 'group-hover:scale-110'
                                        }`}
                                />
                                <span className="hidden sm:inline text-sm md:text-base font-medium whitespace-nowrap">
                                    {item.label}
                                </span>
                            </a>
                            {index < navItems.length - 1 && (
                                <div className="hidden md:block w-px h-6 bg-gradient-to-b from-transparent via-orange-300 to-transparent mx-2" />
                            )}
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}