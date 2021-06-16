import React from 'react';
import './styles.scss'
import git from "./png/git.png"

const Footer = () => {
    return (
        <div className='footer'>
            <div><a href="https://github.com/mariavarvaroi/indulgeApp"
                title="GitHub repository" target="_blank" rel="noopener noreferrer">
                <img src={git} height='40px' alt='GitHub'/></a>
            </div>
            <div>
                <h6>Icons made by
                    <span> <a href="https://www.flaticon.com/authors/smashicons"
                        title="Smashicons">Smashicons</a> </span>
                    <span> from </span> <span><a href="https://www.flaticon.com/"
                        title="Flaticon">www.flaticon.com</a></span>
                </h6>
            </div>


        </div>
    )
}

export default Footer