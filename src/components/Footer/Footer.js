import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faDesktop } from '@fortawesome/free-solid-svg-icons'
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

import styles from './Footer.module.scss'

export default function Footer() {
    return (
        <footer className={styles.footer_container}>
            <div className={styles.footer_api_description}>
                <p>Powered by <a href="https://opentdb.com/" target="_blank" rel="noreferrer">Open Trivia Database API</a></p>
            </div>
            <div className={styles.footer_text_container}>
                <div className={styles.footer_text}>
                    <p>Copyright © 2022 Bruno Miguel</p>
                </div>
                <div className={styles.footer_icon_container}>
                    <a href="https://github.com/BMiguelDev/quizz-challenge" target="_blank" rel="noreferrer" aria-label="Check the app's code">
                        <FontAwesomeIcon icon={faCode} />
                    </a>
                    <a href="https://bmigueldev.github.io/brunomiguel" target="_blank" rel="noreferrer" aria-label="Bruno Miguel">
                        <FontAwesomeIcon icon={faDesktop} />
                    </a>
                    <a href="https://github.com/BMiguelDev" target="_blank" rel="noreferrer" aria-label="LinkedIn Profile">
                        <FontAwesomeIcon icon={faGithub} />
                    </a>
                    <a href="https://www.linkedin.com/in/miguel--bruno/" target="_blank" rel="noreferrer" aria-label="Github Profile">
                        <FontAwesomeIcon icon={faLinkedin} />
                    </a>
                </div>
            </div>
        </footer>
    );
}