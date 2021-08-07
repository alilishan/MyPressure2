import React from 'react';

import { version } from '../../../package.json';

const Footer = () => {

    return (
        <footer className="py-4">
            <div className="container text-center">
                <div className="border-top border-light">
                    <p className="m-0 p-0 pt-3">Developed with all the <i className="mdi mdi-heart text-danger"></i> in the world.</p>
                    <p className="m-0 p-0 py-2">
                        &copy; {new Date().getFullYear()} Lishan &bull; {version}
                    </p>
                </div>
            </div>
        </footer>
    );
}
 
export default Footer;