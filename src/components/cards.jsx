import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Cards() {
    return (
        <>
            <div className="border border-stone-300 rounded-lg shadow-lg mb-5">
                <img src="./img/project1.png" alt="" className="w-full rounded-t-lg h-1/3" />
                <div className="p-4 flex flex-col justify-between h-2/3">
                    <div className=''>
                        <h2 className="text-2xl font-semibold mb-6">Arcade</h2>
                        <p className=" text-gray-400 dark:text-gray-300 mb-6">Developed a fully responsive website using HTML, CSS, and
                            JavaScript to showcase architectural designs, projects, and
                            professional profile. </p>
                    </div>
                    <div className=''>
                        <ul className='flex flex-wrap space-between font-bold text-sm'>
                            <li className="bg-blue-700 rounded px-5 py-1 m-1">HTML</li>
                            <li className="bg-blue-700 rounded px-5 py-1 m-1">CSS</li>
                            <li className="bg-blue-700 rounded px-5 py-1 m-1">JavaScript</li>
                        </ul>
                        <ul className='flex space-between text-sm text-white font-bold mt-4'>
                            <a href='https://devm15.github.io/Arcade/' className='px-4 py-1 m-2 bg-stone-950 hover:bg-stone-600 rounded'><FontAwesomeIcon icon={faGlobe} /> Website</a>
                            <a href='https://github.com/DevM15/Arcade' className='px-4 py-1 m-2 bg-stone-950 hover:bg-stone-600 rounded'><FontAwesomeIcon icon={faGithub} /> Source</a>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="border border-stone-300 rounded-lg shadow-lg mb-5">
                <img src="./img/project2.png" alt="" className="w-full rounded-t-lg h-1/3" />
                <div className="p-4 flex flex-col justify-between h-2/3">
                    <div className=''>
                        <h2 className="text-2xl font-semibold mb-6">PDF Decoder</h2>
                        <p className=" text-gray-400 dark:text-gray-300 mb-6">Developed a responsive web application using JavaScript
                            that allows users to merge, split, and convert JPG images to
                            PDF. </p>
                    </div>
                    <div className=''>
                        <ul className='flex flex-wrap space-between font-bold text-sm'>
                            <li className="bg-blue-700 rounded px-5 py-1 m-1">HTML</li>
                            <li className="bg-blue-700 rounded px-5 py-1 m-1">CSS</li>
                            <li className="bg-blue-700 rounded px-5 py-1 m-1">JavaScript</li>
                        </ul>
                        <ul className='flex space-between text-sm text-white font-bold mt-4'>
                            <a href='https://devm15.github.io/PDFdecoder/' className='px-4 py-1 m-2 bg-stone-950 hover:bg-stone-600 rounded'><FontAwesomeIcon icon={faGlobe} /> Website</a>
                            <a href='https://github.com/DevM15/PDFdecoder' className='px-4 py-1 m-2 bg-stone-950 hover:bg-stone-600 rounded'><FontAwesomeIcon icon={faGithub} /> Source</a>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="border border-stone-300 rounded-lg shadow-lg mb-5">
                <img src="./img/project3.png" alt="" className="w-full rounded-t-lg h-1/3" />
                <div className="p-4 flex flex-col justify-between h-2/3">
                    <div className=''>
                        <h2 className="text-2xl font-semibold mb-6">Futuredesks</h2>
                        <p className=" text-gray-400 mb-6">Developed a website using Bootstrap.  </p>
                    </div>
                    <div className=''>
                        <ul className='flex flex-wrap space-between font-bold text-sm'>
                            <li className="bg-blue-700 rounded px-5 py-1 m-1">HTML</li>
                            <li className="bg-blue-700 rounded px-5 py-1 m-1">CSS</li>
                            <li className="bg-blue-700 rounded px-5 py-1 m-1">JavaScript</li>
                            <li className="bg-blue-700 rounded px-5 py-1 m-1">Bootstrap</li>
                        </ul>
                        <ul className='flex space-between text-sm text-white font-bold mt-4'>
                            <a href='https://devm15.github.io/Futuredesks/' className='px-4 py-1 m-2 bg-stone-950 hover:bg-stone-600 rounded'><FontAwesomeIcon icon={faGlobe} /> Website</a>
                            <a href='https://github.com/DevM15/Futuredesks' className='px-4 py-1 m-2 bg-stone-950 hover:bg-stone-600 rounded'><FontAwesomeIcon icon={faGithub} /> Source</a>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}