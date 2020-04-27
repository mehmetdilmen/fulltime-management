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

class StudentForm extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
        installment: false,
        cash: false,
        installmentAndCash: false
    };

    addDays = (date, mounth) => {
        let result = new Date(date);
        result.setMonth(result.getDate() + mounth);
        return result;
    }

    createInstallmentData = (installmentCOUNT, installmentPAYMENT, installmentDATE) => {
        const data = [];
        for (let i = 0; i < installmentCOUNT; i++) {
            data.push({
                id: i + 1,
                installNumber: i + 1,
                installmentDate: this.addDays(installmentDATE, i + 1),
                installPay: installmentPAYMENT / installmentCOUNT,
                isItPaid: false
            })
        }
        return data;
    };


    handleSubmit = e => {
        e.preventDefault();
        let periods = [];
        let token = localStorage.getItem('token');

        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }

            periods.push({class: null, status: true, year: values.createdPeriod, payment: values.payment})


            if (values.payment === "installment" || values.payment === "cashandinstallment") {
                let planInstalment = this.createInstallmentData(values.installmentCount, values.installmentPayment, values.installmentPaymentDate);
                Object.assign(periods[0], {planingInstallment: planInstalment, status: true})
            }

            if (values.payment === "cashandinstallment") {
                Object.assign(periods[0], {totalPaid: parseFloat(values.totalPayment)})
            }

            if (values.payment === "installment") {
                Object.assign(periods[0], {totalPaid: 0})
            }

            if (values.payment === "cash") {
                Object.assign(periods[0], {totalPaid: parseFloat(values.totalPayment)})
            }

            Object.assign(values, {status: true, all_periods: periods});


            fetch("http://localhost:3000/api/student", {
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
                            window.location = "/students-list"
                        );

                }).catch(function (err) {
                console.log(err)
            })

        });
    };


    onChangePayment = (value) => {
        console.log(`selected ${value}`);
        if (value === "cash") {
            this.setState({installment: false, cash: true})
        } else if (value === "installment") {
            this.setState({installment: true, cash: false})
        } else {
            this.setState({installment: true, cash: true})
        }
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
                            Öğrenci Adı ve Soyadı
                        </span>
                    }>
                    {getFieldDecorator('studentName')(<Input/>)}
                </Form.Item>

                <Form.Item
                    label={
                        <span>
                            Kayıt Dönemi
                        </span>
                    }>
                    {getFieldDecorator('createdPeriod')(<Input/>)}
                </Form.Item>

                <Form.Item label="E-Posta">
                    {getFieldDecorator('studentEmail')(<Input/>)}
                </Form.Item>

                <Form.Item label="Öğrenci Telefonu">
                    {getFieldDecorator('studentPhone')(<Input addonBefore={prefixSelector} style={{width: '100%'}}/>)}
                </Form.Item>

                <Form.Item
                    label={
                        <span>
                            Adres
                        </span>
                    }
                >
                    {getFieldDecorator('studentAddress')(<Input/>)}
                </Form.Item>

                <Form.Item
                    label={
                        <span>
                           Öğrenci Doğum Tarihi
                        </span>
                    }
                >
                    {getFieldDecorator('studentAge')(<DatePicker placeholder="Seçiniz" style={{width: '100%'}}/>
                    )}
                </Form.Item>

                <Form.Item
                    label={
                        <span>
                            Ö. Yakını Adı ve Soyadı
                        </span>
                    }
                >
                    {getFieldDecorator('parentName')(<Input/>)}
                </Form.Item>

                <Form.Item label="Ö. Yakını E-Posta">
                    {getFieldDecorator('parentEmail')(<Input/>)}
                </Form.Item>

                <Form.Item label="Ö. Yakını Telefonu">
                    {getFieldDecorator('parentPhone')(<Input addonBefore={prefixSelector} style={{width: '100%'}}/>)}
                </Form.Item>


                <Form.Item label="Ödeme türü Seç">
                    {getFieldDecorator('payment')(
                        <Select
                            showSearch
                            placeholder="Ödeme Yöntemi"
                            optionFilterProp="children"
                            onChange={this.onChangePayment}
                            filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            <Option value="cash">Peşin</Option>
                            <Option value="installment">Taksit</Option>
                            <Option value="cashandinstallment">Ön Ödeme ve Taksit</Option>
                        </Select>
                    )}
                </Form.Item>

                {this.state.cash ?
                    <Form.Item
                        label={
                            <span>
                           Ödenen Tutar
                        </span>
                        }
                    >
                        {getFieldDecorator('totalPayment')(<Input/>)}
                    </Form.Item>
                    : false
                }
                {this.state.installment ?
                    <Form.Item
                        label={
                            <span>
                           Taksitli Ödenecek Tutar
                        </span>
                        }
                    >
                        {getFieldDecorator('installmentPayment')(<Input/>)}
                    </Form.Item> : false
                }

                {this.state.installment ?
                    <Form.Item
                        label={
                            <span>
                           Taksit Tarihi
                        </span>
                        }
                    >
                        {getFieldDecorator('installmentPaymentDate')(<DatePicker placeholder="Seçiniz"
                                                                                 style={{width: '100%'}}/>)}
                    </Form.Item>
                    : false
                }
                {this.state.installment ?
                    <Form.Item
                        label={
                            <span>
                           Taksit Sayısı
                        </span>
                        }
                    >
                        {getFieldDecorator('installmentCount')(<Input/>)}
                    </Form.Item>


                    : false
                }

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

const WrappedRegistrationForm = Form.create({name: 'register'})(StudentForm);

ReactDOM.render(<WrappedRegistrationForm/>, document.getElementById('root'));


export default WrappedRegistrationForm
