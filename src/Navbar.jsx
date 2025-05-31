export default function Navbar(){
    return(
        <>
            <div className="max-w-2xl md:max-w-4xl lg:max-w-7xl w-full m-auto pt-6 flex justify-between">
                <h1>Dev</h1>
                <ul className="flex space-between ">
                <li className="pr-10"><a>About</a></li>
                <li className="pr-10"><a>Projects</a></li>
                <li className="pr-10"><a>Contact</a></li>
                </ul>
            </div>
        </>
    )
}