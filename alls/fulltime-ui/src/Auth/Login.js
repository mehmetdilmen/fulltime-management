import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import {Form, Icon, Input, Button, message} from 'antd';
import {browserHistory} from "react-router";

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class Login extends React.Component {
    state = {
        size: 'large',
        loginStatus: '',
        token: ''
    };


    componentDidMount() {
        // To disable submit button at the beginning.
        this.props.form.validateFields();
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.loginRequest(values);
                browserHistory.push("/home");
            }
        });
    };

    loginRequest = (dataValues) => {
        fetch("http://localhost:3000/authenticate", {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(dataValues)
        }).then(function (res) {
            return res, res.json()
        })
            .then(function (data) {

                if (data.status) {
                    message
                        .loading('Lütfen bekleyin...', 1.0)
                        .then(() =>
                        message.success('Giriş başarılı', 2.5)
                    );
                    localStorage.setItem('token', data.token);
                    window.location = '/home';
                } else {
                    message.loading('Lütfen bekleyin...', 1.0)
                        .then(() =>
                        message.error('E-Posta veya Şifre hatalı.', 2.5)
                    )
                }
            }).catch(function (err) {
            console.log(err)
        })
    };

    render() {
        const {size} = this.state;
        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;

        // Only show error after a field is touched.
        const usernameError = isFieldTouched('email') && getFieldError('email');
        const passwordError = isFieldTouched('password') && getFieldError('password');
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Item validateStatus={usernameError ? 'error' : ''} help={usernameError || ''}>
                    {getFieldDecorator('email', {
                        rules: [{required: true, message: 'Lütfen E-Posta adresinizi giriniz!'}],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                            placeholder="E-Posta"
                        />,
                    )}
                </Form.Item>
                <Form.Item validateStatus={passwordError ? 'error' : ''} help={passwordError || ''}>
                    {getFieldDecorator('password', {
                        rules: [{required: true, message: 'Lütfen Şifrenizi giriniz!'}],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                            type="password"
                            placeholder="Şifre"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" icon="login" size={size} htmlType="submit"
                            disabled={hasErrors(getFieldsError())}>
                        Giriş
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

const LoginConst = Form.create({name: 'horizontal_login'})(Login);

ReactDOM.render(<LoginConst/>, document.getElementById('root'));


export default LoginConst
