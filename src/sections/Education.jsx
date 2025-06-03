export default function Education() {
    return (
        <>
            <div className="max-w-2xl md:max-w-4xl lg:max-w-7xl m-full m-auto mb-10">
                <h1 className='text-2xl sm:text-3xl font-bold mb-6 pb-6 border-b-2 border-gray-300'>Education</h1>
                <div className='mb-4 flex gap-4'>
                    <img src="./img/sfit.png" alt="" className="w-10 h-10 lg:w-16 lg:h-16 object-cover rounded" />
                    <div className="flex gap-4 items-center">
                        <div>
                            <h2 className='text-base lg:text-lg'>St.Francis Institute of Technology</h2>
                            <p className='text-xs text-gray-300 mb-2 lg:text-sm'>B.E. in Electronics and Telecommunication</p>
                            <p className='text-gray-300 w-32 text-sm lg:text-base'>2023 - present</p>
                        </div>
                    </div>
                </div>
                <div className='mb-4 flex gap-4 items-center'>
                    <img src="./img/navjeevan.png" alt="" className="w-10 h-10 lg:w-16 lg:h-16 object-cover rounded" />
                    <div className="flex gap-4 items-center">
                        <div>
                            <h2 className='text-base lg:text-lg'>Navjeevan College of Science</h2>
                            <p className='text-xs text-gray-300 mb-2 lg:text-sm'>Higher Secondary</p>
                            <p className='text-gray-300 w-32 text-sm lg:text-base'>2021 - 2023</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}