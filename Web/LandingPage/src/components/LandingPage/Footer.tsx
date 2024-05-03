import React from 'react';
function Footer() {

    return (

        <footer className="bg-dark text-white pt-5" id="contact">
            <div className="container py-4">
                <div className="row">
                    <div className="col-md-4 mb-3 mb-md-0">
                        <h5>About Us</h5>
                        <p>Bridging Realities in the Cross-Platform Metaverse - Uniting Users Across Social Media Platforms for a Shared Virtual Experience.</p>
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
                        <a href="https://twitter.com/cobaltmetaverse" className="text-white me-2"><i className="bi bi-twitter"></i>Twitter</a>
                        <a href="https://www.youtube.com/channel/UCWVqOxPdgQigKMUgOpz_1zw" className="text-white me-2"><i className="bi bi-youtube"></i>YouTube</a>
                        <a href="https://www.instagram.com/cobaltmetaverse/" className="text-white me-2"><i className="bi bi-instagram"></i>Instagram</a>
                        <a href="https://www.linkedin.com/company/102576506/" className="text-white"><i className="bi bi-linkedin"></i> LinkedIn</a>
                        <a href="https://discord.gg/8zkvNpGW/" className="text-white"><i className="bi bi-discord"></i> Discord</a>
                        <a href="https://www.cobalt.social/circleup/cobaltmetaverse" className="text-white"><i className="bi bi-discord"></i> CircleUp</a>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-12 text-center">
                        <p>© 2024 Project Cobalt. All Rights Reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
