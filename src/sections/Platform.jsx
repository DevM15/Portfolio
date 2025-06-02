import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faLinkedin, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

export default function Platform() {
    return (
        <>
            <div className="max-w-2xl md:max-w-4xl lg:max-w-7xl m-full m-auto mb-10">
                <h1 className='text-4xl mb-3 font-bold'>Social Media</h1>
                <ul className='flex space-between text-lg transition-all duration-300 ease-in-out'>
                    <li className='px-7 py-3 m-2 bg-stone-100 hover:bg-stone-300 rounded-full'><FontAwesomeIcon icon={faGithub} size='lg' /></li>
                    <li className='px-7 py-3 m-2 bg-stone-100 hover:bg-stone-300 rounded-full'><FontAwesomeIcon icon={faXTwitter} size='lg' /></li>
                    <li className='px-7 py-3 m-2 bg-stone-100 hover:bg-stone-300 rounded-full'><FontAwesomeIcon icon={faLinkedin} size='lg' /></li>
                    <li className='px-7 py-3 m-2 bg-stone-100 hover:bg-stone-300 rounded-full'><FontAwesomeIcon icon={faEnvelope} size='lg' /></li>
                </ul>
            </div>
        </>
    )
}