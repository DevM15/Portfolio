import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';

export default function Contact() {
    return (
        <>
            <div className=' max-w-2xl md:max-w-4xl lg:max-w-7xl w-full m-auto mb-10 flex justify-between gap-20 py-10' id='Contact'>
                <div>
                    <h1 className='text-4xl font-bold mb-6'>Contact</h1>
                    <p className='text-gray-300 mb-6'>Always open to discussing new projects, creative ideas, or opportunities to be part of your visions. Feel free to reach out!</p>
                </div>
                <div className='w-3/4'>
                    <div className='flex gap-4 items-center rounded-lg'>
                        <div className='flex gap-4 mb-6 items-center bg-blue-100 p-4 rounded-lg w-1/2'>
                            <FontAwesomeIcon icon={faEnvelope} size='lg' className='bg-blue-200 text-blue-500 rounded p-2' />
                            <div>
                                <p className='text-stone-500'>Email me at</p>
                                <p className='text-stone-700'>devmistry1501@gmail.com</p>
                            </div>
                        </div>
                        <div className='flex gap-4 mb-6 items-center bg-blue-100 p-4 rounded-lg w-1/2'>
                            <FontAwesomeIcon icon={faPhone} size='lg' className='bg-blue-200 text-blue-500 rounded p-2' />
                            <div>
                                <p className='text-stone-500'>Call me at</p>
                                <p className='text-stone-700'>+91 9819879467</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center justify-between'>
                        <p className='text-stone-300'>Connect with me on social media</p>
                        <div className='flex gap-4 '>
                            <a href="https://www.linkedin.com/in/dev-mistry-828586298" target="_blank" rel="noopener noreferrer" className='text-blue-600 hover:underline'>LinkedIn</a>
                            <a href="https://x.com/devmistry1501" target="_blank" rel="noopener noreferrer" className='text-blue-600 hover:underline'>Twitter</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}