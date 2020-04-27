import React, {Component} from 'react';
import Login from "./Login";
import {Row, Col} from 'antd';
import banner from "../banner5.jpg";
import LogoLogin from './../logo.png';

class Auth extends Component {
    render() {
        return (
            <div>
                <Row>
                    <Col span={16} push={8}>
                        <img src={banner} className={"login-img"} alt="logo"/>
                    </Col>
                    <Col span={8} pull={16}>
                        <div className={"auth-frame"}>
                            <img src={LogoLogin} alt={LogoLogin} style={{marginBottom: '30px'}}/>
                            <Login/>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Auth;
