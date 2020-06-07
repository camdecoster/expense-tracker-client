import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithubSquare } from "@fortawesome/free-brands-svg-icons";

import "./Footer.css";

class Footer extends Component {
    render() {
        return (
            <footer>
                <div className='container_flex'>
                    <p>Created by Cameron DeCoster</p>
                    <a
                        href='https://github.com/camdecoster/expense-tracker-client'
                        title='GitHub Repository'
                        target='_blank'
                        rel='noopener noreferrer'
                        aria-label='GitHub Repository'
                    >
                        <FontAwesomeIcon
                            className='faIcon'
                            icon={faGithubSquare}
                        />
                    </a>
                    <a
                        href='https://www.linkedin.com/in/camerondecoster/'
                        title='LinkedIn Profile'
                        target='_blank'
                        rel='noopener noreferrer'
                        aria-label='LinkedIn Profile'
                    >
                        <FontAwesomeIcon className='faIcon' icon={faLinkedin} />
                    </a>
                </div>
            </footer>
        );
    }
}

export default Footer;
