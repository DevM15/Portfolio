export default function Education() {
    return (
        <>
            <div className="max-w-2xl md:max-w-4xl lg:max-w-7xl m-full m-auto mb-10">
                <h1 className='text-4xl font-bold mb-6'>Education</h1>
                <div className='mb-4 flex gap-4 items-center justify-between'>
                    <div className="flex gap-4 items-center">
                        <img src="sfit.png" alt="" className="w-16 h-16 object-cover rounded" />
                        <div>
                            <h2 className='text-xl'>St.Francis Institute of Technology</h2>
                            <p className='text-gray-600'>B.E. in Electronics and Telecommunication</p>
                        </div>
                    </div>
                    <p className='text-gray-600 w-32'>2023 - present</p>
                </div>
                <div className='mb-4 flex gap-4 items-center justify-between'>
                    <div className="flex gap-4 items-center">
                        <img src="navjeevan.png" alt="" className="w-16 h-16 object-cover rounded" />
                        <div>
                            <h2 className='text-xl'>Navjeevan College of Science</h2>
                            <p className='text-gray-600'>Higher Secondary</p>
                        </div>
                    </div>
                    <p className='text-gray-600 w-32'>2021 - 2023</p>
                </div>
            </div>
        </>
    )
}