import React, { Component } from 'react';
import Form from './components/Form';
import logo from './images/logo.png';
import brandLogos from './images/brand-logos.png';

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="container-header-upper">
                    <div className="container-wrapper is-relative">
                        <div className="header-circle"></div>
                    </div>
                </div>

                <div className="container-header-lower">
                    <div className="container-wrapper container-flex-between">
                        <img src={logo} alt="" />
                        <div><a href="tel:08443913376" className="text-link is-white">08443 913 376</a></div>
                    </div>
                </div>

                <div className="container-mega">
                    <div className="container-wrapper">
                        <h1 className="text-mega">Register account</h1>
                    </div>
                </div>

                <div className="container-wrapper">
                    <div className="flex-grid is-padded-top">
                        <div className="flex-col-half">
                            <h2 className="text-header with-mb-18">Apply in just 10 minutes</h2>
                            <p className="text-body with-mb-18">It's quick and easy to apply for a business loan.  We just need a few details before we can make a loan decision.</p>
                        </div>
                        <div className="flex-col-half is-right-aligned"> 
                            <img src={brandLogos} alt="" />
                        </div>
                    </div>

                    <p className="text-body with-mb-18">To start the process we need you to first register to create a Customer Account. If you would like to know more about how we collect and use your data, please see our <a href="#" className="text-link">Privacy Policy</a>.
                    </p>

                    <Form />
                </div>
            </div>
        );
    }
}

export default App;
