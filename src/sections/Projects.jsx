export default function Projects() {
    return (
        <>
            <div className="max-w-2xl md:max-w-2xl lg:max-w-7xl w-full m-auto mb-10" id="Projects">
                <h1 className="text-2xl mb-5"></h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    <div className="border border-stone-300 rounded-lg shadow-lg mb-5">
                        <img src="./project1.png" alt="" className="w-full h-auto rounded-t-lg" />
                        <div className="p-4">
                            <h2 className="text-lg font-semibold mb-2">Arcade</h2>
                            <p className="text-sm mb-4">Developed a fully responsive website using HTML, CSS, and
                                JavaScript to showcase architectural designs, projects, and
                                professional profile. </p>
                            <ul className='flex flex-wrap space-between font-bold'>
                                <li className="bg-stone-300 rounded px-5 py-1 m-1 text-xs">React</li>
                                <li className="bg-stone-300 rounded px-5 py-1 m-1 text-xs">Node.js</li>
                                <li className="bg-stone-300 rounded px-5 py-1 m-1 text-xs">Java</li>
                                <li className="bg-stone-300 rounded px-5 py-1 m-1 text-xs">MongoDB</li>
                                <li className="bg-stone-300 rounded px-5 py-1 m-1 text-xs">JavaScript</li>
                                <li className="bg-stone-300 rounded px-5 py-1 m-1 text-xs">git</li>
                                <li className="bg-stone-300 rounded px-5 py-1 m-1 text-xs">RestAPI</li>
                            </ul>
                            <ul className='flex space-between text-xs font-bold mt-4'>
                                <li className='px-4 py-1 m-2 bg-stone-950 hover:bg-stone-600 rounded text-xs text-white'>Website</li>
                                <li className='px-4 py-1 m-2 bg-stone-950 hover:bg-stone-600 rounded text-xs text-white'>Source</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}