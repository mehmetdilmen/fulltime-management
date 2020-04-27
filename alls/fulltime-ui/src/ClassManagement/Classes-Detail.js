import React, {Component} from 'react';
import {Descriptions, Button, Table, Input, Modal, message} from 'antd';
import Moment from "react-moment";

const {Column, ColumnGroup} = Table;

class ClassesDetail extends Component {
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
        this.updateService();
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
        fetch("http://localhost:3000/api/classes/" + id, {
            headers: {
                'Content-Type': 'application/json',
                'token': token
            }
        })
            .then(response => response.json())
            .then(data => this.setState({data: data[0]}));
    }




    studentUpdateService = (id, data) => {
        let token = localStorage.getItem('token');

        fetch("http://localhost:3000/api/student/installmentPay/" + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            },
            // eslint-disable-next-line no-undef
            body: JSON.stringify(data)
        }).then(function (res) {
            return res, res.json()
        })
            .then(function (data) {
                message
                    .success('Güncelleme Başarılı', 1.0)
                    .then(() =>
                        window.location = "/class-list"
                    );
            }).catch(function (err) {
            console.log(err)
        })
    };


    updateService = (data) => {
        let token = localStorage.getItem('token');

        fetch("http://localhost:3000/api/classes/" + this.state.data._id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            },
            // eslint-disable-next-line no-undef
            body: JSON.stringify(data)
        }).then(function (res) {
            return res, res.json()
        })
            .then(function (data) {
                message
                    .success('Güncelleme Başarılı', 1.0)
                    .then(() =>
                        window.location = "/class-list"
                    );
            }).catch(function (err) {
            console.log(err)
        })
    };


    studentDelete = (id) => {
        debugger
        const classMembersItemNew = this.state.data.classMembers.filter(i => i.id !== id);
        this.studentUpdateService(id, {class: null});
        this.updateService({classMembers: classMembersItemNew});
    }


    passiveClass = () => {
        this.state.data.status = false;
        this.updateService(this.state.data);
    };


    render() {
        const user = this.state.data;
        return (
            <div>
                <div style={{textAlign: 'right'}}>
                    <Button type="danger" onClick={this.passiveClass}>Sınıf Kaydını Sil</Button>
                </div>
                {user ?
                    <Descriptions title="Sınıf Bilgileri">
                        <Descriptions.Item label="Sınıf Adı"><a
                            onClick={this.showModal.bind(this, user.className, 'className')}> {user.className}</a></Descriptions.Item>

                        <Descriptions.Item label="Öğretmen"><a
                            onClick={this.showModal.bind(this, user.classTeacher.name, 'classTeacher')}> {user.classTeacher.name}</a></Descriptions.Item>
                        <Descriptions.Item label="Dönem"><a
                            onClick={this.showModal.bind(this, user.classDate, 'classDate')}>{user.classDate}</a></Descriptions.Item>
                    </Descriptions>
                    : <div>Yükleniyor..</div>}


                {user ?
                    <Table dataSource={user.classMembers}>
                        <Column title="Adı ve Soyadı" dataIndex="name" key="name"/>
                        <Column title="Durum" dataIndex="isItPaid" key="isItPaid"
                                render={(text, record) => (
                                    <span>
                                        {
                                            record.isItPaid ? 'Ödendi' :
                                                <Button type="danger"
                                                        onClick={this.studentDelete.bind(this, record.id)}>Sil</Button>
                                        }
                                    </span>
                                )}
                        />
                    </Table>
                    : <div>Yükleniyor..</div>}

                {user ?
                    <Table dataSource={user.classLessonPlaning}>
                        <Column title="Gün" dataIndex="name" key="name"
                                render={(text, record) => (
                                    <span>
                                        {
                                            record.name === "monday" ? <span>Pazartesi</span> :
                                                <span></span>
                                        }
                                        {
                                            record.name === "tuesday" ? <span>Salı</span> :
                                                <span></span>
                                        }
                                        {
                                            record.name === "wednesday" ? <span>Çarşamba</span> :
                                                <span></span>
                                        }
                                        {
                                            record.name === "thursday" ? <span>Perşembe</span> :
                                                <span></span>
                                        }
                                        {
                                            record.name === "friday" ? <span>Cuma</span> :
                                                <span></span>
                                        }
                                        {
                                            record.name === "saturday" ? <span>Cumartesi</span> :
                                                <span></span>
                                        }
                                        {
                                            record.name === "sunday" ? <span>Pazar</span> :
                                                <span></span>
                                        }
                                    </span>
                                )}
                        />
                        <Column title="Başlama" key="start" render={(text, record) => (
                            <Moment format="DD/MM/YYYY">{record.start}</Moment>
                        )}/>

                        <Column title="Bitiş" key="finish" render={(text, record) => (
                            <Moment format="DD/MM/YYYY">{record.finish}</Moment>
                        )}/>
                    </Table>
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

export default ClassesDetail;
