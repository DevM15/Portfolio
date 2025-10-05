import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faXTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';
import { useState } from 'react';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [isFocused, setIsFocused] = useState({
        name: false,
        email: false,
        message: false
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = () => {
        const subject = encodeURIComponent(`Message from ${formData.name}`);
        const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
        window.location.href = `mailto:devmistry1501@gmail.com?subject=${subject}&body=${body}`;
    };

    const contactMethods = [
        {
            icon: faEnvelope,
            label: 'Email me at',
            value: 'devmistry1501@gmail.com',
            href: 'mailto:devmistry1501@gmail.com',
            gradient: 'from-blue-500 to-cyan-500',
            bgGradient: 'from-blue-50 to-cyan-50',
            darkBgGradient: 'from-blue-900/20 to-cyan-900/20'
        },
        {
            icon: faPhone,
            label: 'Call me at',
            value: '+91 9819879467',
            href: 'tel:+919819879467',
            gradient: 'from-purple-500 to-pink-500',
            bgGradient: 'from-purple-50 to-pink-50',
            darkBgGradient: 'from-purple-900/20 to-pink-900/20'
        }
    ];

    const socialLinks = [
        {
            name: 'LinkedIn',
            icon: faLinkedin,
            url: 'https://www.linkedin.com/in/dev-mistry-828586298',
            color: 'hover:text-blue-600'
        },
        {
            name: 'Twitter',
            icon: faXTwitter,
            url: 'https://x.com/devmistry1501',
            color: 'hover:text-gray-900 dark:hover:text-white'
        },
        {
            name: 'GitHub',
            icon: faGithub,
            url: 'https://github.com/DevM15',
            color: 'hover:text-gray-900 dark:hover:text-white'
        }
    ];

    return (
        <section className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-20" id="Contact">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
                {/* Left column - Info */}
                <div className="space-y-8">
                    {/* Header */}
                    <div className="space-y-4">
                        <div className="inline-block">
                            <span className="px-4 py-2 bg-gradient-to-r from-orange-100 to-pink-100 dark:from-orange-900/30 dark:to-pink-900/30 text-orange-600 dark:text-orange-400 text-sm font-semibold rounded-full">
                                Get In Touch
                            </span>
                        </div>
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white">
                            Let's <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">Connect</span>
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                            Always open to discussing new projects, creative ideas, or opportunities to be part of your visions. Feel free to reach out!
                        </p>
                    </div>

                    {/* Contact methods */}
                    <div className="space-y-4">
                        {contactMethods.map((method, index) => (
                            <a
                                key={index}
                                href={method.href}
                                className={`group flex items-center gap-4 p-6 bg-gradient-to-r ${method.bgGradient} dark:${method.darkBgGradient} rounded-2xl hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300`}
                            >
                                <div className={`p-4 bg-gradient-to-br ${method.gradient} rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                    <FontAwesomeIcon icon={method.icon} className="text-white text-xl" />
                                </div>
                                <div>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">{method.label}</p>
                                    <p className="text-gray-900 dark:text-white font-semibold text-lg">{method.value}</p>
                                </div>
                            </a>
                        ))}
                    </div>

                    {/* Social links */}
                    <div className="pt-4">
                        <p className="text-gray-600 dark:text-gray-400 mb-4 text-center lg:text-left">Connect with me on social media</p>
                        <div className="flex gap-4 justify-center lg:justify-start">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`p-4 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-400 ${social.color} transform hover:scale-110 transition-all duration-300 shadow-md hover:shadow-lg`}
                                >
                                    <FontAwesomeIcon icon={social.icon} className="text-xl" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right column - Contact form */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send me a message</h3>
                    <div className="space-y-6">
                        {/* Name field */}
                        <div className="relative">
                            <label className={`absolute left-4 transition-all duration-300 pointer-events-none ${isFocused.name || formData.name
                                    ? 'text-xs -top-2 bg-white dark:bg-gray-800 px-2 text-orange-500'
                                    : 'top-4 text-gray-500 dark:text-gray-400'
                                }`}>
                                Your Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                onFocus={() => setIsFocused({ ...isFocused, name: true })}
                                onBlur={() => setIsFocused({ ...isFocused, name: false })}
                                className="w-full px-4 py-4 bg-transparent border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:border-orange-500 focus:outline-none transition-colors duration-300 text-gray-900 dark:text-white"
                            />
                        </div>

                        {/* Email field */}
                        <div className="relative">
                            <label className={`absolute left-4 transition-all duration-300 pointer-events-none ${isFocused.email || formData.email
                                    ? 'text-xs -top-2 bg-white dark:bg-gray-800 px-2 text-orange-500'
                                    : 'top-4 text-gray-500 dark:text-gray-400'
                                }`}>
                                Your Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                onFocus={() => setIsFocused({ ...isFocused, email: true })}
                                onBlur={() => setIsFocused({ ...isFocused, email: false })}
                                className="w-full px-4 py-4 bg-transparent border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:border-orange-500 focus:outline-none transition-colors duration-300 text-gray-900 dark:text-white"
                            />
                        </div>

                        {/* Message field */}
                        <div className="relative">
                            <label className={`absolute left-4 transition-all duration-300 pointer-events-none ${isFocused.message || formData.message
                                    ? 'text-xs -top-2 bg-white dark:bg-gray-800 px-2 text-orange-500'
                                    : 'top-4 text-gray-500 dark:text-gray-400'
                                }`}>
                                Your Message
                            </label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                onFocus={() => setIsFocused({ ...isFocused, message: true })}
                                onBlur={() => setIsFocused({ ...isFocused, message: false })}
                                rows={5}
                                className="w-full px-4 py-4 bg-transparent border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:border-orange-500 focus:outline-none transition-colors duration-300 resize-none text-gray-900 dark:text-white"
                            />
                        </div>

                        {/* Submit button */}
                        <button
                            onClick={handleSubmit}
                            className="group w-full flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold rounded-xl hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                        >
                            <span>Send Message</span>
                            <FontAwesomeIcon icon={faPaperPlane} className="transform group-hover:translate-x-1 transition-transform duration-300" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}