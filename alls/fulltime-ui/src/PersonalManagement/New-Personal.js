import React from 'react';
import ReactDOM from 'react-dom';
import {
    Form,
    Input,
    DatePicker,
    Select,
    Button, message,
} from 'antd';

const {Option} = Select;

class personalForm extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };



    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
            let token = localStorage.getItem('token');

            Object.assign(values, {personalClass: null, status: true});
debugger
            fetch("http://localhost:3000/api/personal", {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'token': token
                },
                // eslint-disable-next-line no-undef
                body: JSON.stringify(values)
            }).then(function (res) {
                return res, res.json()
            })
                .then(function (data) {
                    message
                        .success('Kayıt Başarılı', 1.0)
                        .then(() =>
                            window.location = "/personal-list"
                        );

                }).catch(function (err) {
                console.log(err)
            })

        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: {span: 12},
                sm: {span: 8},
                md: {span: 5}
            },
            wrapperCol: {
                xs: {span: 12},
                sm: {span: 16},
                md: {span: 10}
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 12,
                    offset: 0,
                },
                sm: {
                    span: 12,
                    offset: 8,
                },
            },
        };
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '90',
        })(
            <Select style={{width: 70}}>
                <Option value="90">+90</Option>
            </Select>,
        );


        return (
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                <Form.Item
                    label={
                        <span>
                            Adı ve Soyadı
                        </span>
                    }>
                    {getFieldDecorator('personalName')(<Input/>)}
                </Form.Item>
                <Form.Item label="E-Posta">
                    {getFieldDecorator('personalEmail')(<Input/>)}
                </Form.Item>

                <Form.Item label="Telefon">
                    {getFieldDecorator('personalPhone')(<Input addonBefore={prefixSelector} style={{width: '100%'}}/>)}
                </Form.Item>

                <Form.Item
                    label={
                        <span>
                            Adres
                        </span>
                    }
                >
                    {getFieldDecorator('personalAddress')(<Input/>)}
                </Form.Item>

                <Form.Item
                    label={
                        <span>
                           Doğum Tarihi
                        </span>
                    }
                >
                    {getFieldDecorator('personalAge')(<DatePicker placeholder="Seçiniz" style={{width: '100%'}}/>
                    )}
                </Form.Item>

                <Form.Item
                    label={
                        <span>
                            Pozisyon
                        </span>
                    }
                >
                    {getFieldDecorator('personalTitle')(<Input/>)}
                </Form.Item>


                <Form.Item
                    label={
                        <span>
                           İşe Başlama Tarihi
                        </span>
                    }
                >
                    {getFieldDecorator('personalStartDate')(<DatePicker placeholder="Seçiniz" style={{width: '100%'}}/>
                    )}
                </Form.Item>

                <Form.Item label="Maaş">
                    {getFieldDecorator('personalSalary')(<Input style={{width: '100%'}}/>)}
                </Form.Item>


                <Form.Item {...tailFormItemLayout} style={{
                    textAlign: 'center'
                }}>
                    <Button type="primary" htmlType="submit">
                        Kaydet
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

const WrappedRegistrationForm = Form.create({name: 'personalAdd'})(personalForm);

ReactDOM.render(<WrappedRegistrationForm/>, document.getElementById('root'));


export default WrappedRegistrationForm
