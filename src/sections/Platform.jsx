import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faLinkedin, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

export default function Platform() {
    return (
        <>
            <div className="">
                <h1 className='text-4xl my-6 pb-6 font-bold border-b-2 border-gray-300'>Social Media</h1>
                <ul className='flex space-between text-lg transition-all duration-300 ease-in-out'>
                    <li className='px-7 py-3 m-2 bg-stone-100 hover:bg-stone-300 rounded-full flex gap-2 items-center'><a href="https://github.com/DevM15/Portfolio"><FontAwesomeIcon icon={faGithub} size='lg' /> Github</a></li>
                    <li className='px-7 py-3 m-2 bg-stone-100 hover:bg-stone-300 rounded-full flex gap-2 items-center'><a href="https://twitter.com/DevM15"><FontAwesomeIcon icon={faXTwitter} size='lg' /> Twitter</a></li>
                    <li className='px-7 py-3 m-2 bg-stone-100 hover:bg-stone-300 rounded-full flex gap-2 items-center'><a href="https://www.linkedin.com/in/devm15/"><FontAwesomeIcon icon={faLinkedin} size='lg' /> LinkedIn</a></li>
                    <li className='px-7 py-3 m-2 bg-stone-100 hover:bg-stone-300 rounded-full flex gap-2 items-center'><a href="mailto:devmistry1501@gmail.com"><FontAwesomeIcon icon={faEnvelope} size='lg' /> Email</a></li>
                </ul>
            </div>
        </>
    )
}