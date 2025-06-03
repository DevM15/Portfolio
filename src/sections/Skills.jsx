export default function Skills() {
    return (
        <>
            <h1 className='text-4xl font-bold mb-6 pb-6 w-full border-b-2 border-gray-300'>Skills</h1>
            <div className='flex flex-wrap gap-6 items-center aspect-ratio-1/1'>
                <img src="react.png" alt="" className='w-20 h-20 object-contain rounded grayscale hover:grayscale-0 transition-all duration-300' />
                <img src="node.png" alt="" className='w-20 h-20 object-contain rounded grayscale hover:grayscale-0 transition-all duration-300' />
                <img src="java.png" alt="" className='w-20 h-20 object-contain rounded grayscale hover:grayscale-0 transition-all duration-300' />
                <img src="mongodb.png" alt="" className='w-20 h-20 object-contain rounded grayscale hover:grayscale-0 transition-all duration-300' />
                <img src="javascript.png" alt="" className='w-20 h-20 object-contain rounded grayscale hover:grayscale-0 transition-all duration-300' />
                <img src="git.png" alt="" className='w-20 h-20 object-contain rounded grayscale hover:grayscale-0 transition-all duration-300' />
            </div>
        </>
    )
}