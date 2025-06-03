export default function Navbar() {
    return (
        <>
            <div className=" w-full m-auto pb-6 flex justify-center fixed bottom-0 z-50">
                <ul className="text-black flex space-between text-sm hover:text-lg bg-orange-200 rounded-full px-10 py-5 shadow hover:shadow-lg transition-all delay-150 duration-500 ease-in-out">
                    <li className="pr-5 hover:text-white transition delay-150 duration-500 ease-in-out"><a href="">Home</a></li>
                    <li className="pr-5 transition delay-150 duration-500 ease-in-out">|</li>
                    <li className="pr-5 hover:text-white transition delay-150 duration-500 ease-in-out"><a href="#About">About</a></li>
                    <li className="pr-5 transition delay-150 duration-500 ease-in-out">|</li>
                    <li className="pr-5 hover:text-white transition delay-150 duration-500 ease-in-out"><a href="#Projects">Projects</a></li>
                    <li className="pr-5 transition delay-150 duration-500 ease-in-out">|</li>
                    <li className="hover:text-white transition delay-150 duration-500 ease-in-out"><a href="#Contact">Contact</a></li>
                </ul>
            </div>
        </>
    )
}