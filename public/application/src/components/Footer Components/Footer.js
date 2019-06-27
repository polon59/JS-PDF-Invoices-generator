import React from 'react';

const Footer = (props) =>{
    return(
        <footer>
            <div className="container-fluid text-center">
                <div className="row">
                <div className="col-sm-4">
                    <a className="navOpt" href="aboutUs.html"><p>O firmie</p></a>
                    <a className="navOpt" href="projects.html"><p>Realizacje</p></a>
                    <a className="navOpt" href="contact.html"><p>Kontakt</p></a>
                </div>
                <div className="col-sm-4">
                    <p>Mirosław Pawełczak</p>
                    <p>Podole 63</p>
                    <p>39-320 Przecław</p>
                </div>
                <div className="col-sm-4">
                    <p>Zakład Ślusarski</p>
                    <p>Tel: +48 696 399 748</p>
                    <p>e-mail: p@gmail.com</p>
                </div>
                </div> 
                <div className="row footer-text-bottom">   
                <p>
                    Designed and built by @polon59 for Ślusarstwo Pawełczak 
                    2019 <span className="glyphicon glyphicon-globe"></span>
                </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;