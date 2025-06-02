export default function Navbar() {
    return (
        <>
            <div className="max-w-2xl md:max-w-4xl lg:max-w-7xl w-full m-auto pt-6 flex justify-center ">
                <ul className="flex space-between text-lg border-1 border-neutral-50 hover:border-stone-100 rounded-full px-10 py-5 shadow hover:shadow-lg transition delay-150 duration-500 ease-in-out">
                    <li className="pr-10 hover:text-stone-300 transition delay-150 duration-300 ease-in-out"><a href="#About">About</a></li>
                    <li className="pr-10">|</li>
                    <li className="pr-10 hover:text-stone-300 transition delay-150 duration-300 ease-in-out"><a href="#Projects">Projects</a></li>
                    <li className="pr-10">|</li>
                    <li className="hover:text-stone-300 transition delay-150 duration-300 ease-in-out"><a href="#Contact">Contact</a></li>
                </ul>
            </div>
        </>
    )
}