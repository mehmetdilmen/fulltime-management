import React, {Component} from 'react';
import {Row, Col} from 'antd';

import {PDFDownloadLink} from "@react-pdf/renderer";
import {PdfDocument} from "./Contract";
import {PaymentInfoPDF} from "./PaymentInfoPDF";


import {Descriptions, Button, Table, Input, Modal, message, Form, Select, DatePicker} from 'antd';
import Moment from "react-moment";

const {Option} = Select;
const {Column, ColumnGroup} = Table;

class StudentDetail extends Component {

    constructor(props) {
        super(props)
    }

    state = {
        data: null,
        visible: false,
        visibleNewPeriod: false,
        fieldModal: "",
        dataModal: ""
    };


    addDays = (date, mounth) => {
        let result = new Date(date);
        result.setMonth(result.getDate() + mounth);
        return result;
    };

    createInstallmentData = (installmentCOUNT, installmentPAYMENT, installmentDATE) => {
        const data = [];
        for (let i = 0; i < installmentCOUNT; i++) {
            data.push({
                id: this.state.data.all_periods[0] !== undefined && this.state.data.all_periods[0].payment !== "cash" ? this.state.data.all_periods[0].planingInstallment.length + i + 1 : i + 1,
                installNumber: i + 1,
                installmentDate: this.addDays(installmentDATE, i + 1),
                installPay: installmentPAYMENT / installmentCOUNT,
                isItPaid: false
            })
        }
        return data;
    };

    updateInputValue = (evt) => {
        this.setState({
            dataModal: evt.target.value
        });
    };

    showModal = (field, value) => {
        this.setState({
            visible: true,
        });
        this.setState({fieldModal: value});
        this.setState({dataModal: field});
    };

    showModalPeriod = () => {
        this.setState({
            visibleNewPeriod: true,
        });
    };

    handleOk = e => {
        this.state.data[this.state.fieldModal] = this.state.dataModal;
        this.updatePaymentService();
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };


    handleCancelNewPeriod = e => {
        this.setState({
            visibleNewPeriod: false,
        });
    };

    componentDidMount() {
        const {id} = this.props.match.params;
        let token = localStorage.getItem('token');
        fetch("http://localhost:3000/api/student/" + id, {
            headers: {
                'Content-Type': 'application/json',
                'token': token
            }
        })
            .then(response => response.json())
            .then(data => this.setState({data: data[0]}));
    }

    pay = (id, item) => {
        debugger
            this.state.data.all_periods[id - 1].planingInstallment.map(installItem => {
                if (installItem.id == item) {
                    installItem.isItPaid = true;
                    this.state.data.all_periods[id - 1].totalPaid += installItem.installPay;
                    Object.assign(installItem, {payDate: Date()})
                }
            })
        debugger
        this.updatePaymentService();
    };

    passiveStudent = () => {
        this.state.data.status = false;
        this.updatePaymentService();
    };

    updatePaymentService = () => {
        let token = localStorage.getItem('token');
        fetch("http://localhost:3000/api/student/installmentPay/" + this.state.data._id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            },
            // eslint-disable-next-line no-undef
            body: JSON.stringify(this.state.data)
        }).then(function (res) {
            return res, res.json()
        })
            .then(function (data) {
                message
                    .success('Güncelleme Başarılı', 1.0)
                    .then(() =>
                        window.location = "/students-list"
                    );

            }).catch(function (err) {
            console.log(err)
        })
    };

    handleSubmit = e => {
        e.preventDefault();
        let periods = [];
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
            debugger
            periods.push({
                id: this.state.data.all_periods.length + 1,
                class: null,
                status: true,
                year: values.createdPeriod,
                payment: values.payment
            })


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

            this.state.data.all_periods.push(periods[0]);
            this.updatePaymentService();
        });
    };

    onChangePayment = (value) => {
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
        const user = this.state.data;
        const periods = this.state.data;
        debugger

        const formItemLayout = {
            labelCol: {
                xs: {span: 12},
                sm: {span: 8},
                md: {span: 8}
            },
            wrapperCol: {
                xs: {span: 12},
                sm: {span: 16},
                md: {span: 10}
            },
        };


        return (
            <div>
                <Row gutter={[16, 16]}>
                    <Col span={8}>
                        <Button type="primary" onClick={this.showModalPeriod}>Yeni Dönem Ekle</Button>
                    </Col>
                    <Col span={8}>
                        {
                            user !== null ?
                                <PDFDownloadLink
                                    document={<PdfDocument data={user}/>}
                                    fileName="sozlesme.pdf"
                                    className={"pdf-btn"}
                                > Öğrenci Sözleşmesi</PDFDownloadLink>

                                : null
                        }
                    </Col>
                    <Col span={8}>
                        <Button type="danger" onClick={this.passiveStudent}>Öğrenci Kaydını Sil</Button>
                    </Col>
                </Row>


                {user ?
                    <Descriptions title="Öğrenci Bilgileri">
                        <Descriptions.Item label="Öğrenci Adı ve Soyadı">
                            <a onClick={this.showModal.bind(this, user.studentName, 'studentName')}> {user.studentName}</a></Descriptions.Item>

                        {user.studentEmail ?
                            <Descriptions.Item label="Öğrenci E-Posta">
                                <a onClick={this.showModal.bind(this, user.studentEmail, 'studentEmail')}>{user.studentEmail}</a></Descriptions.Item>
                            : null}
                        {user.studentPhone ?
                            <Descriptions.Item label="Öğrenci Telefon">
                                <a onClick={this.showModal.bind(this, user.studentPhone, 'studentPhone')}>
                                    {user.studentPhone}</a></Descriptions.Item>
                            : null}
                        {user.studentAddress ?
                            <Descriptions.Item label="Öğrenci Adres"><a
                                onClick={this.showModal.bind(this, user.studentAddress, 'studentAddress')}>{user.studentAddress}</a></Descriptions.Item>
                            : null}
                        {user.studentAge ?
                            <Descriptions.Item label="Öğrenci Doğum Tarihi">
                                <Moment format="DD/MM/YYYY">{user.studentAge}</Moment>
                            </Descriptions.Item>
                            : null}
                        {user.parentName ?
                            <Descriptions.Item label="Veli Adı ve Soyadı"><a
                                onClick={this.showModal.bind(this, user.parentName, 'parentName')}>{user.parentName}</a></Descriptions.Item>
                            : null}
                        {user.parentEmail ?
                            <Descriptions.Item label="Veli E-Posta"><a
                                onClick={this.showModal.bind(this, user.parentEmail, 'parentEmail')}>{user.parentEmail}</a></Descriptions.Item>
                            : null}
                        {user.parentPhone ?
                            <Descriptions.Item label="Veli Telefon"><a
                                onClick={this.showModal.bind(this, user.parentPhone, 'parentPhone')}>{user.parentPhone}</a></Descriptions.Item>
                            : null}

                        {user.studentCreatedDate ?
                            <Descriptions.Item label="Kayıt Tarihi">
                                <Moment format="DD/MM/YYYY">{user.studentCreatedDate}</Moment>
                            </Descriptions.Item> : null}
                    </Descriptions>
                    : null}


                {periods ?
                    <div>
                        {
                            periods.all_periods.map(p => (
                                <div>
                                    <p>Dönem: {p.year}</p>

                                    {p.class ?
                                        <Descriptions.Item label="Sınıf">{p.class[0].className}</Descriptions.Item>
                                        : null}

                                    {p.class ?
                                        <Descriptions.Item label="Dönem">{p.class[0].classDate}</Descriptions.Item>
                                        : null}


                                    {p.payment === "cash" ?
                                        <Descriptions.Item label="Ödeme Türü">Nakit</Descriptions.Item>
                                        : null
                                    }

                                    {p.payment === "cashandinstallment" ?
                                        <Descriptions.Item label="Ödeme Türü">Ön Ödeme ve Taksit</Descriptions.Item>
                                        : null
                                    }

                                    {p.payment === "installment" ?
                                        <p>Ödeme Türü: Taksit</p>
                                        : null}

                                    {p.intallmentPayment ?
                                        <Descriptions.Item
                                            label="Taksit Ödemesi">{p.installmentPayment}</Descriptions.Item>
                                        : null
                                    }
                                    {p.totalPayment ?
                                        <Descriptions.Item
                                            label="İlk Nakit Ödenen Tutar">{p.totalPayment}</Descriptions.Item>
                                        : null
                                    }

                                    {p.totalPaid ?
                                        <p>Toplam Ödenen Tutar: {p.totalPaid.toFixed()}</p>
                                        : null
                                    }

                                    {p.payment === "installment" && p.totalPaid < p.installmentPayment ?
                                        <Descriptions.Item
                                            label="Kalan Ödeme Tutarı">{p.installmentPayment - p.totalPaid}</Descriptions.Item>
                                        : null
                                    }

                                    {p.payment === "cashandinstallment" && p.totalPaid < p.installmentPayment ?
                                        <Descriptions.Item
                                            label="Kalan Ödeme Tutarı">{(p.installmentPayment + p.totalPayment) - p.totalPaid}</Descriptions.Item>
                                        : null
                                    }

                                    {p.installmentCount ?
                                        <Descriptions.Item
                                            label="Taksit Sayısı">{p.installmentCount}</Descriptions.Item> : null
                                    }

                                    {p.intallmentPaymentDate ?
                                        <Descriptions.Item
                                            label="Taksit Ödemesi Başlangıç">{p.installmentPaymentDate}</Descriptions.Item> : null
                                    }


                                    <div style={{marginBottom: "30px"}}>
                                        <PDFDownloadLink
                                            document={<PaymentInfoPDF data={p}/>}
                                            fileName="odemeplani.pdf"
                                            className={"pdf-btn"}
                                        >Dönem Ödeme Bilgisi PDF</PDFDownloadLink>
                                    </div>

                                    {p.payment !== "cash" ?
                                        <Table dataSource={p.planingInstallment}>
                                            <ColumnGroup title="Taksit">
                                                <Column title="Sayı" dataIndex="installNumber" key="installNumber"/>
                                                <Column title="Tutar" key="installPay"
                                                        render={(text, record) => (
                                                            <span>{record.installPay.toFixed()}</span>
                                                        )}
                                                />

                                            </ColumnGroup>
                                            <Column title="Son Ödeme Tarihi" key="installmentDate"
                                                    render={(text, record) => (
                                                        <Moment
                                                            format="DD/MM/YYYY">{record.installmentDate}</Moment>
                                                    )}
                                            />


                                            <Column title="Ödeme Tarihi" key="installmentDate"
                                                    render={(text, record) => (
                                                        <div>
                                                            {
                                                                record.payDate !== null ?
                                                                    <Moment
                                                                        format="DD/MM/YYYY">{record.payDate}</Moment>
                                                                    : <div>-</div>
                                                            }
                                                        </div>
                                                    )}
                                            />

                                            <Column title="Durum" dataIndex="isItPaid" key="isItPaid"
                                                    render={(text, record) => (
                                                        <span>
                                        {
                                            record.isItPaid ? <div><span>Ödendi</span></div> :
                                                <Button type="primary"
                                                        onClick={this.pay.bind(this, p.id, record.id)}>Öde</Button>
                                        }
                                    </span>
                                                    )}
                                            />
                                        </Table>
                                        : null}
                                </div>
                            ))
                        }
                    </div>
                    : <div>Yükleniyor..</div>}


                <Modal
                    title="Düzenle"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Input placeholder={this.state.fieldModal} value={this.state.dataModal}
                           onChange={this.updateInputValue}/>

                </Modal>


                <Modal
                    title="Yeni Dönem Ekle"
                    visible={this.state.visibleNewPeriod}
                    onOk={this.handleSubmit}
                    onCancel={this.handleCancelNewPeriod}
                >
                    <Form {...formItemLayout} onSubmit={this.handleSubmit}>

                        <Form.Item
                            label={
                                <span>
                            Kayıt Dönemi
                        </span>
                            }>
                            {getFieldDecorator('createdPeriod')(<Input/>)}
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

                    </Form>

                </Modal>
            </div>
        );
    }
}

export default Form.create()(StudentDetail)

