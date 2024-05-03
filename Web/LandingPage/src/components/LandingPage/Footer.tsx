import React from 'react';
function Footer() {

    return (

        <footer className="bg-dark text-white pt-5" id="contact">
            <div className="container py-4">
                <div className="row">
                    <div className="col-md-4 mb-3 mb-md-0">
                        <h5>About Us</h5>
                        <p>We strive to build the most easy to use software known to the 21st centurty.</p>
                    </div>
                    <div className="col-md-4 mb-3 mb-md-0">
                        <h5>Contact Info</h5>
                        <ul className="list-unstyled">
                            <li>Email: info@cobalt.social</li>
                            <li>Sales: c.stjacques@cobalt.social</li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <h5>Follow Us</h5>
                        <a href="www.linkedin.com/in/corey-st-jacques-55003577" className="text-white"><i className="bi bi-linkedin"></i> LinkedIn</a>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-12 text-center">
                        <p>© 2024 Name Sorter. All Rights Reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
