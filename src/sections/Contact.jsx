import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faLinkedin, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';

export default function Contact() {
    return (
        <>
            <h1>Contact</h1>
            <p>Always open to discussing new projects, creative ideas, or opportunities to be part of your visions. Feel free to reach out!</p>
            <div>
                <FontAwesomeIcon icon={faEnvelope} />
                <a href="mailto:your-email@example.com">your-email@example.com</a>
            </div>
            <div>
                <FontAwesomeIcon icon={faPhone} />
                <a href="tel:+1234567890">Connect on X</a>
            </div>
        </>
    )
}