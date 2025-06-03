export default function Skills() {
    return (
        <>
            <h1 className='text-2xl sm:text-3xl font-bold pb-6 mb-2 w-full border-b-2 border-gray-300'>Skills</h1>
            <div className='flex flex-wrap gap-6 justify-center items-center aspect-ratio-1/1 '>
                <img src="./img/react.png" alt="" className='w-20 h-20 object-contain rounded lg:grayscale hover:grayscale-0 transition-all duration-300' />
                <img src="./img/node.png" alt="" className='w-20 h-20 object-contain rounded lg:grayscale hover:grayscale-0 transition-all duration-300' />
                <img src="./img/java.png" alt="" className='w-20 h-20 object-contain rounded lg:grayscale hover:grayscale-0 transition-all duration-300' />
                <img src="./img/mongodb.png" alt="" className='w-20 h-20 object-contain rounded lg:grayscale hover:grayscale-0 transition-all duration-300' />
                <img src="./img/javascript.png" alt="" className='w-20 h-20 object-contain rounded lg:grayscale hover:grayscale-0 transition-all duration-300' />
                <img src="./img/git.png" alt="" className='w-20 h-20 object-contain rounded lg:grayscale hover:grayscale-0 transition-all duration-300' />
            </div>
        </>
    )
}