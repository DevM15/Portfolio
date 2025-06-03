export default function Footer() {
    return (
        <>
            <div className="text-center mb-[8%] py-4 border-t-2 border-gray-300 text-gray-500 flex gap-4 items-center justify-between max-w-2xl md:max-w-4xl lg:max-w-7xl w-full m-auto">
                <div>
                    <p className="text-sm">Made with ❤️ by Dev Mistry</p>
                    <p className="text-sm">© 2025 All rights reserved.</p>
                </div>
                <div>
                    <p className="text-sm">Built with React, Tailwind CSS, and FontAwesome</p>
                </div>
                <div>
                    <p className="text-sm">Inspired by the amazing work of <a href="https://www.prasen.dev/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Prasen</a></p>
                    <p className="text-sm">Check out the source code on <a href="https://github.com/DevM15/Portfolio" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">GitHub</a></p>
                </div>
            </div>
        </>
    )
}