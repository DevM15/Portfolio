import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faGlobe, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const projectsData = [
    {
        id: 1,
        title: "Arcade",
        description: "Developed a fully responsive website using HTML, CSS, and JavaScript to showcase architectural designs, projects, and professional profile.",
        image: "./img/project1.png",
        tags: ["HTML", "CSS", "JavaScript"],
        liveUrl: "https://devm15.github.io/Arcade/",
        githubUrl: "https://github.com/DevM15/Arcade",
        gradient: "from-purple-500 to-pink-500"
    },
    {
        id: 2,
        title: "PDF Decoder",
        description: "Developed a responsive web application using JavaScript that allows users to merge, split, and convert JPG images to PDF.",
        image: "./img/project2.png",
        tags: ["HTML", "CSS", "JavaScript"],
        liveUrl: "https://devm15.github.io/PDFdecoder/",
        githubUrl: "https://github.com/DevM15/PDFdecoder",
        gradient: "from-blue-500 to-cyan-500"
    },
    {
        id: 3,
        title: "Futuredesks",
        description: "Developed a website using Bootstrap.",
        image: "./img/project3.png",
        tags: ["HTML", "CSS", "JavaScript", "Bootstrap"],
        liveUrl: "https://devm15.github.io/Futuredesks/",
        githubUrl: "https://github.com/DevM15/Futuredesks",
        gradient: "from-orange-500 to-red-500"
    }
];

function ProjectCard({ project }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Image container with overlay */}
            <div className="relative h-56 overflow-hidden">
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-80 transition-opacity duration-500`} />

                {/* Quick action buttons on hover */}
                <div className={`absolute inset-0 flex items-center justify-center gap-4 transition-all duration-500 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-white text-gray-900 rounded-full hover:scale-110 transform transition-transform duration-300 shadow-lg"
                    >
                        <FontAwesomeIcon icon={faGlobe} className="text-xl" />
                    </a>
                    <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-white text-gray-900 rounded-full hover:scale-110 transform transition-transform duration-300 shadow-lg"
                    >
                        <FontAwesomeIcon icon={faGithub} className="text-xl" />
                    </a>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-orange-500 group-hover:to-pink-500 transition-all duration-300">
                    {project.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-3">
                    {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, index) => (
                        <span
                            key={index}
                            className="px-3 py-1 text-xs font-semibold bg-gradient-to-r from-orange-100 to-pink-100 dark:from-orange-900/30 dark:to-pink-900/30 text-orange-700 dark:text-orange-300 rounded-full"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Action buttons */}
                <div className="flex gap-3 pt-2">
                    <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transform transition-all duration-300"
                    >
                        <FontAwesomeIcon icon={faGlobe} />
                        <span>Live Demo</span>
                    </a>
                    <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:border-gray-900 dark:hover:border-gray-400 hover:scale-105 transform transition-all duration-300"
                    >
                        <FontAwesomeIcon icon={faGithub} />
                    </a>
                </div>
            </div>

            {/* Corner accent */}
            <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${project.gradient} opacity-20 blur-2xl group-hover:opacity-40 transition-opacity duration-500`} />
        </div>
    );
}

export default function Projects() {
    return (
        <section className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-20" id="Projects">
            {/* Section header */}
            <div className="text-center mb-16 space-y-4">
                <div className="inline-block">
                    <span className="px-4 py-2 bg-gradient-to-r from-orange-100 to-pink-100 dark:from-orange-900/30 dark:to-pink-900/30 text-orange-600 dark:text-orange-400 text-sm font-semibold rounded-full">
                        Portfolio
                    </span>
                </div>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white">
                    Featured <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">Projects</span>
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
                    Explore my latest work showcasing creative solutions and technical expertise
                </p>
            </div>

            {/* Projects grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projectsData.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>

            {/* View more section */}
            <div className="text-center mt-16">
                <a
                    href="https://github.com/DevM15"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold rounded-full hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                    View All Projects
                    <FontAwesomeIcon icon={faArrowRight} className="transition-transform group-hover:translate-x-1" />
                </a>
            </div>
        </section>
    );
}