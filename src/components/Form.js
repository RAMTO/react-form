import React, { Component } from 'react';

class Form extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showErrors: false,
            fields: {
                email: {
                    value: '',
                    error: false,
                },
                password: {
                    value: '',
                    error: false,
                    type: "password"
                },
                passwordConfirm: {
                    value: '',
                    error: false,
                    type: "password"
                },
                mobileNumber: {
                    value: '',
                    error: false,
                },
                checkbox: {
                    checked: false,
                    error: false,
                }
            }
        };
    }

    componentDidMount() {
        this.validateForm();
    }

    updateField(field, e) {
        this.setState({
            fields: {
                ...this.state.fields,
                [field]: {
                    ...this.state.fields[field],
                    value: e.target.value,
                }
            }
        });

        this.validateForm();
    }

    updateCheckbox(e) {
        this.setState({
            fields: {
                ...this.state.fields,
                checkbox: {
                    ...this.state.fields.checkbox,
                    checked: e.target.checked,
                }
            }
        });

        this.validateForm();
    }

    validateEmail(value) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(value);
    }

    validatePassword(value) {
        const re = /^(?=.*?[a-z])(?=.*?[0-9]).{4,}$/;
        return re.test(value);
    }

    showFieldType(field, e) {
        e.preventDefault();
        this.setState(prevState => ({
            fields: {
                ...prevState.fields,
                [field]: {
                    ...prevState.fields[field],
                    type: 'text'
                }
            }
        }));
    }

    hideFieldType(field, e) {
        e.preventDefault();
        this.setState(prevState => ({
            fields: {
                ...prevState.fields,
                [field]: {
                    ...prevState.fields[field],
                    type: 'password'
                }
            }
        }));
    }

    validateForm() {
        Object.keys(this.state.fields).forEach((key, index) => {
            switch(key) {
                case 'email':
                    this.setState(prevState => ({
                        fields: {
                            ...prevState.fields,
                            email: {
                                ...prevState.fields.email,
                                error: !this.validateEmail(prevState.fields[key].value),
                            }
                        }
                    }));
                    break;
                case 'password':
                    this.setState(prevState => ({
                        fields: {
                            ...prevState.fields,
                            password: {
                                ...prevState.fields.password,
                                error: !this.validatePassword(prevState.fields[key].value),
                            }
                        }
                    }));
                    break;
                case 'passwordConfirm':
                    this.setState(prevState => ({
                        fields: {
                            ...prevState.fields,
                            passwordConfirm: {
                                ...prevState.fields.passwordConfirm,
                                error: prevState.fields[key].value != prevState.fields.password.value,
                            }
                        }
                    }));
                    break;
                case 'checkbox':
                    this.setState(prevState => ({
                        fields: {
                            ...prevState.fields,
                            checkbox: {
                                ...prevState.fields.checkbox,
                                error: !prevState.fields.checkbox.checked,
                            }
                        }
                    }));
                    break;
            }
        });
    }

    submitForm(e) {
        e.preventDefault();
        this.validateForm();
        
        this.setState({
            showErrors: true
        }); 

        let formSuccess = true;

        Object.keys(this.state.fields).forEach((key, index) => {
            if(this.state.fields[key].error) {
                formSuccess = false;
            }
        });

        console.log(`Form is ${formSuccess ? 'valid' : 'not valid'}`);
    }

    render() {
        const { showErrors, fields: { email, password, passwordConfirm, mobileNumber, checkbox } } = this.state;

        return (
            <div className="with-bg-light">
                <h2 className="text-header with-mb-18">Your details</h2>
                <form action="">
                    <div>
                        
                        <div className="flex-grid with-mb-24">
                            <div className="flex-col-small is-right-aligned">
                                <label className="text-body is-label is-marged-bottom-device">Email address</label>
                            </div>
                            <div className="flex-col-large">
                                <input onChange={this.updateField.bind(this, 'email')} className={email.error && showErrors ? 'has-error input-base' : 'input-base'} value={email.value} type="text" />
                            </div>
                        </div>

                        <div className="flex-grid with-mb-24">
                            <div className="flex-col-small is-right-aligned">
                                <label className="text-body is-label is-marged-bottom-device">Password</label>
                            </div>
                            <div className="flex-col-large is-relative">
                                <input onChange={this.updateField.bind(this, 'password')} className={password.error && showErrors ? 'has-error input-base' : 'input-base'} value={password.value} type={password.type} />
                                {
                                    password.type === 'password' ? 
                                    <a href="#" className="button-toggle" onClick={this.showFieldType.bind(this, 'password')}>Show</a> : 
                                    <a href="#" className="button-toggle" onClick={this.hideFieldType.bind(this, 'password')}>Hide</a>
                                }
                            </div>
                        </div>

                        <div className="flex-grid with-mb-24">
                            <div className="flex-col-small is-right-aligned">
                                <label className="text-body is-label is-marged-bottom-device">Confirm password</label>
                            </div>
                            <div className="flex-col-large is-relative">
                                <input onChange={this.updateField.bind(this, 'passwordConfirm')} className={passwordConfirm.error && showErrors ? 'has-error input-base' : 'input-base'} value={passwordConfirm.value} type={passwordConfirm.type} />
                                {
                                    passwordConfirm.type === 'password' ? 
                                    <a href="#" className="button-toggle" onClick={this.showFieldType.bind(this, 'passwordConfirm')}>Show</a> : 
                                    <a href="#" className="button-toggle" onClick={this.hideFieldType.bind(this, 'passwordConfirm')}>Hide</a>}
                            </div>
                        </div>

                        <div className="flex-grid with-mb-24">
                            <div className="flex-col-small is-right-aligned">
                                <label className="text-body is-label is-marged-bottom-device">Mobile number</label>
                            </div>
                            <div className="flex-col-large flex-grid">
                                <div className="flex-col-half">
                                    <input onChange={this.updateField.bind(this, 'mobileNumber')} className="input-base" value={mobileNumber.value} type="text" />
                                </div>
                                <div className="flex-col-half">
                                    <button className="button-secondary is-marged-top-device">Send authentication code</button>
                                </div>
                            </div>
                        </div>

                        <div className="flex-grid with-mb-24">
                            <div className="flex-col-small is-right-aligned"></div>
                            <div className="flex-col-large">
                                <label className={checkbox.error && showErrors ? 'is-secondary text-body checkbox-wrapper' : 'text-body checkbox-wrapper'}>
                                    <input type="checkbox" className={checkbox.error && showErrors ? 'custom-checkbox has-error' : 'custom-checkbox'} onChange={this.updateCheckbox.bind(this)} checked={checkbox.checked} />
                                    <span>Your business has an annual turnover of <span className="is-bold">at least £100,000.</span></span>
                                </label>
                            </div>
                        </div>

                        <div className="flex-grid with-mb-24">
                            <div className="flex-col-small is-right-aligned"></div>
                            <div className="flex-col-large flex-grid">
                                <div className="flex-col-half"></div>
                                <div className="flex-col-half">
                                    <button className="button-primary" onClick={this.submitForm.bind(this)}>Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default Form;