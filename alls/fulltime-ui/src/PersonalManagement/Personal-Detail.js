import React, {Component} from 'react';
import {Descriptions, Button, Table, Input, Modal, message} from 'antd';
import Moment from "react-moment";

const {Column, ColumnGroup} = Table;

class PersonalDetail extends Component {
    state = {
        data: null,
        visible: false,
        fieldModal: "",
        dataModal: ""
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

    handleOk = e => {
        this.state.data[this.state.fieldModal] = this.state.dataModal;
        this.updatePaymentService();
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    componentDidMount() {
        const {id} = this.props.match.params

        let token = localStorage.getItem('token');
        fetch("http://localhost:3000/api/personal/" + id, {
            headers: {
                'Content-Type': 'application/json',
                'token': token
            }
        })
            .then(response => response.json())
            .then(data => this.setState({data: data[0]}));
    }


    pay = (item) => {
        this.state.data.planingInstallment.map(data => {
            if (data.id == item) {
                data.isItPaid = true;
            }
        });
        this.updatePaymentService();
    };

    passivepersonal = () => {
        this.state.data.status = false;
        this.updatePaymentService();
    };

    updatePaymentService = () => {
        let token = localStorage.getItem('token');

        fetch("http://localhost:3000/api/personal/" + this.state.data._id, {
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
                        window.location = "/personals-list"
                    );

            }).catch(function (err) {
            console.log(err)
        })
    };

    render() {
        const user = this.state.data;
        return (
            <div>
                <div style={{textAlign: 'right'}}>
                    <Button type="danger" onClick={this.passivepersonal}>Personel Kaydını Sil</Button>
                </div>
                {user ?
                    <Descriptions title="Personel Bilgileri">
                        <Descriptions.Item label="Personel Adı ve Soyadı"><a
                            onClick={this.showModal.bind(this, user.personalName, 'personalName')}> {user.personalName}</a></Descriptions.Item>
                        <Descriptions.Item label="Personel E-Posta"><a
                            onClick={this.showModal.bind(this, user.personalEmail, 'personalEmail')}>{user.personalEmail}</a></Descriptions.Item>
                        <Descriptions.Item label="Personel Telefon">
                            <a
                                onClick={this.showModal.bind(this, user.personalPhone, 'personalPhone')}>
                                {user.personalPhone}</a></Descriptions.Item>
                        <Descriptions.Item label="Personel Adres"><a
                            onClick={this.showModal.bind(this, user.personalAddress, 'personalAddress')}>{user.personalAddress}</a></Descriptions.Item>
                        <Descriptions.Item label="Personel Doğum Tarihi">
                            <Moment format="DD/MM/YYYY">{user.personalAge}</Moment>
                        </Descriptions.Item>
                        {user.class ?
                            <Descriptions.Item label="Sınıf">{user.class[0].className}</Descriptions.Item>
                            : null}
                        {user.personalSalary ?
                            <Descriptions.Item label="Maaş">{user.personalSalary} ₺</Descriptions.Item> :
                            <div></div>}

                        {user.personalClass ?
                            <Descriptions.Item>
                                <strong>Sınıflar: </strong>
                                {
                                    user.personalClass.map(item => (
                                        <div><br></br><strong>Sınıf:</strong> <span>{item.name}</span><br></br></div>
                                    ))
                                }
                            </Descriptions.Item> :
                            <div></div>}

                        {user.personalTitle ? <Descriptions.Item
                                label="Pozisyon">{user.personalTitle}</Descriptions.Item> :
                            <div></div>}
                        <Descriptions.Item label="İşe Başlama Tarihi">
                            <Moment format="DD/MM/YYYY">{user.personalStartDate}</Moment>
                        </Descriptions.Item>
                    </Descriptions>
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
            </div>
        );
    }
}

export default PersonalDetail;
