import React, {Component} from 'react';
import {Card, Col, Icon, Row, Table} from "antd";
import Moment from 'react-moment';

const {Column, ColumnGroup} = Table;

class Home extends Component {
    state = {
        data: null,
        table: null,
        total_paid: null,
        next_payments: null,
        lateDates: null,
        comeDates: null
    };


    componentDidMount() {
        this.getClassesList();
        this.getStudents();
    }

    getStudents = () => {
        let token = localStorage.getItem('token');
        fetch("http://localhost:3000/api/student", {
            headers: {
                'Content-Type': 'application/json',
                'token': token
            }
        })
            .then(response => response.json())
            .then(data => {
                    let total = 0;
                    let remaining = 0;
                    const lateDate = [];
                    const comeDate = [];
                    this.setState({data: data.filter(i => i.status === true)});

                    this.state.data.map(item => {

                        item.all_periods.map(period => {


                        total += period.totalPaid;
                        if (period.payment === "installment" || period.payment === "cashandinstallment") {
                            period.planingInstallment.filter(install => {
                                debugger
                                if (install.isItPaid === false) {
                                    remaining += install.installPay;
                                }
                            })
                        }
                        this.setState({total_paid: total.toFixed(), next_payments: remaining.toFixed()});


                        if (period.payment !== "cash") {
                            for (let i = 0; i < period.planingInstallment.length; i++) {

                                let isItPaidControl = period.planingInstallment[i].isItPaid;
                                let today = new Date();
                                let payday = period.planingInstallment[i].installmentDate;
                                payday = new Date(payday);

                                if (isItPaidControl === false) {
                                    if (today > payday) {
                                        lateDate.push({
                                            time: payday,
                                            studentName: period.studentName,
                                            pay: parseFloat(period.planingInstallment[i].installPay)
                                        });
                                        console.log(payday)
                                    } else {
                                        comeDate.push({
                                            time: payday,
                                            studentName: period.studentName,
                                            pay: parseFloat(period.planingInstallment[i].installPay)
                                        })
                                    }
                                }
                            }
                            this.setState({lateDates: lateDate});
                            this.setState({comeDates: comeDate});
                        }

                    });

                    });



                console.log(comeDate)

                }
            )
    };

    getClassesList = () => {
        let token = localStorage.getItem('token');
        fetch("http://localhost:3000/api/classes", {
            headers: {
                'Content-Type': 'application/json',
                'token': token
            }
        })
            .then(response => response.json())
            .then(data => {
                    this.setState({data: data.filter(i => i.status === true)});
                    const planing =
                        {
                            monday: [],
                            tuesday: [],
                            wednesday: [],
                            thursday: [],
                            friday: [],
                            saturday: [],
                            sunday: []
                        }
                    ;
                    this.state.data.map(item => {

                        for (let plan of item.classLessonPlaning) {
                            switch (plan.name) {
                                case 'monday':
                                    planing.monday.push({classNAME: item.className, start: plan.start, finish: plan.finish})
                                    break;
                                case 'tuesday':
                                    planing.tuesday.push({
                                        classNAME: item.className,
                                        start: plan.start,
                                        finish: plan.finish
                                    })
                                    break;
                                case 'wednesday':
                                    planing.wednesday.push({
                                        classNAME: item.className,
                                        start: plan.start,
                                        finish: plan.finish
                                    })
                                    break;
                                case 'thursday':
                                    planing.thursday.push({
                                        classNAME: item.className,
                                        start: plan.start,
                                        finish: plan.finish
                                    })
                                    break;
                                case 'friday':
                                    planing.friday.push({classNAME: item.className, start: plan.start, finish: plan.finish})
                                    break;
                                case 'saturday':
                                    planing.saturday.push({
                                        classNAME: item.className,
                                        start: plan.start,
                                        finish: plan.finish
                                    })
                                    break;
                                case 'sunday':
                                    planing.sunday.push({classNAME: item.className, start: plan.start, finish: plan.finish})
                                    break;
                            }
                            console.log(planing);
                        }
                        this.setState({table: planing})
                    })
                }
            )
    };

    render() {
        const table = this.state.table;

        return (
            <div>
                <div style={{display: "block", paddingBottom: "50px"}}>
                    <Card title="Toplam Gelen Ödemeler" className={'home-boxes'}
                          style={{width: 300, display: "inline-block"}}>
                        <p className={"total-money-number"}>{this.state.total_paid} ₺</p>
                    </Card>

                    <Card title="Toplam Gelecek Ödemeler" className={'home-boxes'}
                          style={{width: 300, display: "inline-block"}}>
                        <p className={"total-money-number"}>{this.state.next_payments} ₺</p>
                    </Card>


                    {this.state.comeDates ?
                        <Card title="Yaklaşan Ödemeler" className={'home-boxes'}
                              style={{width: 300, display: "inline-block"}}>
                            {
                                this.state.comeDates.map(l => (
                                        <div>
                                            <span className={"boxes-list"}>{l.studentName}</span>
                                            <span className={"boxes-list"}>{l.pay.toFixed()} ₺</span>
                                            <Moment format="DD/MM/YYYY">
                                                {l.time}
                                            </Moment>
                                        </div>
                                    )
                                )
                            }
                        </Card>
                        : null}


                    {this.state.lateDates ?
                        <Card title="Ödemesi Geçenler" className={'home-boxes'}
                              style={{width: 300, display: "inline-block"}}>
                            {
                                this.state.lateDates.map(l => (
                                        <div style={{color: "red"}}>
                                            <span className={"boxes-list"}>{l.studentName}</span>
                                            <span className={"boxes-list"}>{l.pay.toFixed()} ₺</span>
                                            <Moment format="DD/MM/YYYY">
                                                {l.time}
                                            </Moment>
                                        </div>
                                    )
                                )
                            }
                        </Card>
                        : null}
                </div>


                {table ?
                    <Row>
                        <Col lg={3}>
                            <Row>
                                <Col>
                                    <p className={'day-title'}>Pazartesi</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    {
                                        table.monday.map(item => (
                                            <div className={'box-one monday-color'}>
                                                <div>
                                                    <Icon type="number"/>
                                                    {item.classNAME}
                                                </div>
                                                <div>
                                                    <Icon type="clock-circle"/>
                                                    <Moment format="HH:mm">
                                                        {item.start}
                                                    </Moment>
                                                </div>
                                                <div>
                                                    <Icon type="clock-circle"/>
                                                    <Moment format="HH:mm">
                                                        {item.finish}
                                                    </Moment>
                                                </div>
                                            </div>

                                        ))
                                    }
                                </Col>
                            </Row>
                        </Col>
                        <Col lg={3}>
                            <Row>
                                <Col>
                                    <p className={'day-title'}>Salı</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    {
                                        table.tuesday.map(item => (
                                            <div className={'box-one tuesday-color'}>
                                                <div>
                                                    <Icon type="number"/>
                                                    {item.classNAME}
                                                </div>
                                                <div>
                                                    <Icon type="clock-circle"/>
                                                    <Moment format="HH:mm">
                                                        {item.start}
                                                    </Moment>
                                                </div>
                                                <div>
                                                    <Icon type="clock-circle"/>
                                                    <Moment format="HH:mm">
                                                        {item.finish}
                                                    </Moment>
                                                </div>
                                            </div>

                                        ))
                                    }
                                </Col>
                            </Row>
                        </Col>
                        <Col lg={3}>
                            <Row>
                                <Col>
                                    <p className={'day-title'}>Çarşamba</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    {
                                        table.wednesday.map(item => (
                                            <div className={'box-one wednesday-color'}>
                                                <div>
                                                    <Icon type="number"/>
                                                    {item.classNAME}
                                                </div>
                                                <div>
                                                    <Icon type="clock-circle"/>
                                                    <Moment format="HH:mm">
                                                        {item.start}
                                                    </Moment>
                                                </div>
                                                <div>
                                                    <Icon type="clock-circle"/>
                                                    <Moment format="HH:mm">
                                                        {item.finish}
                                                    </Moment>
                                                </div>
                                            </div>

                                        ))
                                    }
                                </Col>
                            </Row>
                        </Col>
                        <Col lg={3}>
                            <Row>
                                <Col>
                                    <p className={'day-title'}>Perşembe</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    {
                                        table.thursday.map(item => (
                                            <div className={'box-one thursday-color'}>
                                                <div>
                                                    <Icon type="number"/>
                                                    {item.classNAME}
                                                </div>
                                                <div>
                                                    <Icon type="clock-circle"/>
                                                    <Moment format="HH:mm">
                                                        {item.start}
                                                    </Moment>
                                                </div>
                                                <div>
                                                    <Icon type="clock-circle"/>
                                                    <Moment format="HH:mm">
                                                        {item.finish}
                                                    </Moment>
                                                </div>
                                            </div>

                                        ))
                                    }
                                </Col>
                            </Row>
                        </Col>
                        <Col lg={3}>
                            <Row>
                                <Col>
                                    <p className={'day-title'}>Cuma</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    {
                                        table.friday.map(item => (
                                            <div className={'box-one friday-color'}>
                                                <div>
                                                    <Icon type="number"/>
                                                    {item.classNAME}
                                                </div>
                                                <div>
                                                    <Icon type="clock-circle"/>
                                                    <Moment format="HH:mm">
                                                        {item.start}
                                                    </Moment>
                                                </div>
                                                <div>
                                                    <Icon type="clock-circle"/>
                                                    <Moment format="HH:mm">
                                                        {item.finish}
                                                    </Moment>
                                                </div>
                                            </div>

                                        ))
                                    }
                                </Col>
                            </Row>
                        </Col>
                        <Col lg={3}>
                            <Row>
                                <Col>
                                    <p className={'day-title'}>Cumartesi</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    {
                                        table.saturday.map(item => (
                                            <div className={'box-one saturday-color'}>
                                                <div>
                                                    <Icon type="number"/>
                                                    {item.classNAME}
                                                </div>
                                                <div>
                                                    <Icon type="clock-circle"/>
                                                    <Moment format="HH:mm">
                                                        {item.start}
                                                    </Moment>
                                                </div>
                                                <div>
                                                    <Icon type="clock-circle"/>
                                                    <Moment format="HH:mm">
                                                        {item.finish}
                                                    </Moment>
                                                </div>
                                            </div>

                                        ))
                                    }
                                </Col>
                            </Row>
                        </Col>
                        <Col lg={3}>
                            <Row>
                                <Col>
                                    <p className={'day-title'}>Pazar</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    {
                                        table.sunday.map(item => (
                                            <div className={'box-one sunday-color'}>
                                                <div>
                                                    <Icon type="number"/>
                                                    {item.classNAME}
                                                </div>
                                                <div>
                                                    <Icon type="clock-circle"/>
                                                    <Moment format="HH:mm">
                                                        {item.start}
                                                    </Moment>
                                                </div>
                                                <div>
                                                    <Icon type="clock-circle"/>
                                                    <Moment format="HH:mm">
                                                        {item.finish}
                                                    </Moment>
                                                </div>
                                            </div>

                                        ))
                                    }
                                </Col>
                            </Row>
                        </Col>

                    </Row>
                    : null}
            </div>

        );
    }
}

export default Home;
