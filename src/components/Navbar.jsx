export default function Navbar() {
    return (
        <>
            <div className="w-full m-auto p-6 flex justify-center fixed bottom-0 z-50">
                <ul className="text-black flex gap-1 lg:gap-4 lg:hover:text-xl text-xs sm:text-sm lg:text-lg bg-orange-200 rounded-full px-5 py-2 lg:hover:px-10 lg:hover:py-5 shadow hover:shadow-lg transition-all delay-150 duration-500 ease-in-out">
                    <li className="transition delay-150 duration-500 ease-in-out"><a href="">Home</a></li>
                    <li className="transition delay-150 duration-500 ease-in-out">|</li>
                    <li className="transition delay-150 duration-500 ease-in-out"><a href="#About">About</a></li>
                    <li className="transition delay-150 duration-500 ease-in-out">|</li>
                    <li className="transition delay-150 duration-500 ease-in-out"><a href="#Projects">Projects</a></li>
                    <li className="transition delay-150 duration-500 ease-in-out">|</li>
                    <li className="transition delay-150 duration-500 ease-in-out"><a href="#Contact">Contact</a></li>
                </ul>
            </div>
        </>
    )
}