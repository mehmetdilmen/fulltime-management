import React from 'react';
import ReactDOM from 'react-dom';
import {
    Form,
    Input,
    Button,
    TimePicker,
    Transfer,
    Checkbox, Row, Col, message, Select
} from 'antd';

const {Option} = Select;

const format = 'HH:mm';

class NewClasses extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
        installment: false,
        cash: false,
        installmentAndCash: false,
        mockData: [],
        targetKeys: [],
        students: [],
        personal: []
    };


    getStudentList() {
        let token = localStorage.getItem('token');
        fetch("http://localhost:3000/api/student", {
            headers: {
                'Content-Type': 'application/json',
                'token': token
            }
        })
            .then(response => response.json())
            .then(data => {
                    if (data.status === false) {
                        localStorage.clear();
                        /*
                                                window.location = "/login"
                        */
                    } else {
                        this.getMock(data.filter(i => i.status === true));
                    }
                }
            )
    }


    getPersonal() {
        let token = localStorage.getItem('token');
        fetch("http://localhost:3000/api/personal", {
            headers: {
                'Content-Type': 'application/json',
                'token': token
            }
        })
            .then(response => response.json())
            .then(data => {
                    if (data.status === false) {
                        localStorage.clear();
                    } else {
                        this.setState({personal: data.filter(i => i.status === true)});
                    }
                }
            )
    }


    personalUpdateServices(updateData, personalID) {
        let token = localStorage.getItem('token');
        debugger
        fetch("http://localhost:3000/api/personal/" + personalID, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            },
            // eslint-disable-next-line no-undef
            body: JSON.stringify({personalClass: updateData})
        }).then(function (res) {
            return res, res.json()
        })
            .then(function (data) {

            }).catch(function (err) {
            console.log(err)
        })
    }


    studentUpdateServices(student, studentID) {
        let token = localStorage.getItem('token');

        fetch("http://localhost:3000/api/student/installmentPay/" + studentID, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            },
            // eslint-disable-next-line no-undef
            body: JSON.stringify(student)
        }).then(function (res) {
            return res, res.json()
        })
            .then(function (data) {

            }).catch(function (err) {
            console.log(err)
        })
    }


    classAddServices(CLASS) {
        let token = localStorage.getItem('token');
        console.log(CLASS)
        fetch("http://localhost:3000/api/classes", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            },
            // eslint-disable-next-line no-undef
            body: JSON.stringify(CLASS[0])
        }).then(function (res) {
            return res, res.json()
        })
            .then(function (data) {
                message
                    .success('Kayıt Başarılı', 1.0)
                    .then(() =>
                        console.log(data)
                    );
            }).catch(function (err) {
            console.log(err)
        })
    }


    componentDidMount() {
        this.getStudentList();
        this.getPersonal();
    }

    handleChange = targetKeys => {
        this.setState({targetKeys});
    };

    getMock = (students) => {
        const targetKeys = [];
        const mockData = [];

        this.setState({students: students});
        debugger
        for (let i = 0; i < students.length; i++) {
            const data = {
                key: i.toString(),
                title: students[i].studentName,
                chosen: false,
            };
            mockData.push(data);
        }
        console.log(mockData);

        this.setState({mockData, targetKeys});
    };

    //ToDo: Burada gereksiz student verisi gönderilmekte kaldırılacak.
    createMembers = (values, data) => {
        let classData = [];
        debugger
        for (let i in this.state.targetKeys) {
            //Burada sınıflar içine kayıt edilen kişinin bilgileri ekleniyor
            data[0].classMembers.push(
                {
                    name: this.state.students[i].studentName,
                    id: this.state.students[i]._id
                });
            //Burada kişi bilgileri içine eklenmek için sınıf bilgileri üretiyor
            classData.push(
                {
                    className: values.className,
                    classDate: values.classDate
                }
            );
            // eslint-disable-next-line react/no-direct-mutation-state
            this.state.students[i].class = classData;
            this.studentUpdateServices({class: classData}, this.state.students[i]._id);
        }

    };

    createCalender = (values, data) => {
        values = [values];
        // eslint-disable-next-line array-callback-return
        values.map(item => {
            let idCount = 0;
            for (let prototype in values[0]) {
                if (item[prototype] == true) {
                    data[0].classLessonPlaning.push({
                        id: idCount++,
                        name: prototype,
                        start: item[prototype + 'StartTime'],
                        finish: item[prototype + 'FinishTime']
                    })
                }
            }
        });
        return data;
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
            const data = [
                {
                    className: values.className,
                    classDate: values.classDate,
                    status: true,
                    classLessonPlaning: [],
                    classMembers: [],
                    classTeacher: values.classTeacher
                }
            ];
            if (values.classTeacher.personalClass === undefined) {
                this.personalUpdateServices([{name: data[0].className}], values.classTeacher.id);
            } else {
                this.personalUpdateServices([...values.classTeacher.personalClass, {name: data[0].className}], values.classTeacher.id);
            }
            this.createCalender(values, data);
            this.createMembers(values, data);
            this.classAddServices(data);
            console.log(data)
        });
    };


    render() {
        const {getFieldDecorator} = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 8},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16},
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };

        return (
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                <Row>
                    <Col span={24} style={{textAlign: "left", marginBottom: "20px", marginTop: "10px"}}>
                        <strong>Sınıf Adı:</strong>
                        <Form.Item>
                            {getFieldDecorator('className')(<Input placeholder="Sınıf Adı"/>)}
                        </Form.Item>
                    </Col>
                </Row>

                <Row>
                    <Col span={24} style={{textAlign: "left", marginBottom: "20px", marginTop: "10px"}}>
                        <strong>Dönem:</strong>
                        <Form.Item>
                            {getFieldDecorator('classDate')(<Input placeholder="Dönem"/>
                            )}
                        </Form.Item>
                    </Col>
                </Row>

                <Row>
                    <Col span={24} style={{textAlign: "left", marginBottom: "20px", marginTop: "10px"}}>
                        <strong>Öğretmen Seç:</strong>
                        <Form.Item>
                            {getFieldDecorator('classTeacher')(
                                <Select
                                    showSearch
                                    placeholder="Öğretmen"
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    {
                                        this.state.personal.map(item => (
                                            <Option id={item.id} key={item.id} value={{
                                                name: item.personalName,
                                                id: item._id,
                                                personalClass: item.personalClass
                                            }}>{item.personalName}</Option>
                                        ))
                                    }
                                </Select>
                            )}
                        </Form.Item>
                    </Col>
                </Row>


                <Row>
                    <Col span={24} style={{textAlign: "left", marginBottom: "20px", marginTop: "10px"}}>
                        <strong>Öğrenci Ekle:</strong>
                        <Form.Item>
                            <Transfer
                                dataSource={this.state.mockData}
                                listStyle={{
                                    width: 250,
                                    height: 300,
                                }}
                                operations={['Sınıfa Ekle', 'Sınıftan Çıkar']}
                                targetKeys={this.state.targetKeys}
                                onChange={this.handleChange}
                                render={item => `${item.title}`}
                            />
                        </Form.Item>
                    </Col>
                </Row>


                <Row>

                    <Col span={24} style={{textAlign: "left", marginBottom: "20px", marginTop: "10px"}}>
                        <strong>Ders Planı:</strong>
                    </Col>
                    <Col span={3} style={{textAlign: "left"}}>
                        {getFieldDecorator('monday')(<Checkbox>PAZARTESİ</Checkbox>)}
                        <Form.Item>
                            {getFieldDecorator('mondayStartTime')(<TimePicker placeholder="Başlangıç"
                                                                              format={format}/>)}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('mondayFinishTime')(<TimePicker placeholder="Bitiş" format={format}/>)}
                        </Form.Item>
                    </Col>
                    <Col span={3} style={{textAlign: "left"}}>
                        {getFieldDecorator('tuesday')(<Checkbox>SALI</Checkbox>)}
                        <Form.Item>
                            {getFieldDecorator('tuesdayStartTime')(<TimePicker placeholder="Başlangıç"
                                                                               format={format}/>)}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('tuesdayFinishTime')(<TimePicker placeholder="Bitiş" format={format}/>)}
                        </Form.Item>
                    </Col>
                    <Col span={3} style={{textAlign: "left"}}>
                        {getFieldDecorator('wednesday')(<Checkbox>ÇARŞAMBA</Checkbox>)}
                        <Form.Item>
                            {getFieldDecorator('wednesdayStartTime')(<TimePicker placeholder="Başlangıç"
                                                                                 format={format}/>)}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('wednesdayFinishTime')(<TimePicker placeholder="Bitiş"
                                                                                  format={format}/>)}
                        </Form.Item>
                    </Col>
                    <Col span={3} style={{textAlign: "left"}}>
                        {getFieldDecorator('thursday')(<Checkbox>PERŞEMBE</Checkbox>)}
                        <Form.Item>
                            {getFieldDecorator('thursdayStartTime')(<TimePicker placeholder="Başlangıç"
                                                                                format={format}/>)}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('thursdayFinishTime')(<TimePicker placeholder="Bitiş" format={format}/>)}
                        </Form.Item>
                    </Col>
                    <Col span={3} style={{textAlign: "left"}}>
                        {getFieldDecorator('friday')(<Checkbox>CUMA</Checkbox>)}
                        <Form.Item>
                            {getFieldDecorator('fridayStartTime')(<TimePicker placeholder="Başlangıç"
                                                                              format={format}/>)}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('fridayFinishTime')(<TimePicker placeholder="Bitiş" format={format}/>)}
                        </Form.Item>
                    </Col>
                    <Col span={3} style={{textAlign: "left"}}>
                        {getFieldDecorator('saturday')(<Checkbox>CUMARTESİ</Checkbox>)}
                        <Form.Item>
                            {getFieldDecorator('saturdayStartTime')(<TimePicker placeholder="Başlangıç"
                                                                                format={format}/>)}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('saturdayFinishTime')(<TimePicker placeholder="Bitiş" format={format}/>)}
                        </Form.Item>
                    </Col>
                    <Col span={3} style={{textAlign: "left"}}>
                        {getFieldDecorator('sunday')(<Checkbox>PAZAR</Checkbox>)}
                        <Form.Item>
                            {getFieldDecorator('sundayStartTime')(<TimePicker placeholder="Başlangıç"
                                                                              format={format}/>)}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('sundayFinishTime')(<TimePicker placeholder="Bitiş" format={format}/>)}
                        </Form.Item>
                    </Col>
                </Row>


                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        Kaydet
                    </Button>
                </Form.Item>
            </Form>
        );
    }


}

const WrappedNewClassForm = Form.create({name: 'class'})(NewClasses);

ReactDOM.render(<WrappedNewClassForm/>, document.getElementById('root'));


export default WrappedNewClassForm
