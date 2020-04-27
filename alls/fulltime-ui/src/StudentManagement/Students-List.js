import React, {Component} from 'react';
import {Table, Divider, Tag, Button} from 'antd';
import {Link} from 'react-router-dom';
import Moment from "react-moment";

const {Column, ColumnGroup} = Table;

const data = [
    {
        key: '1',
        firstName: 'John',
        lastName: 'Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    },
    {
        key: '2',
        firstName: 'Jim',
        lastName: 'Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
    },
    {
        key: '3',
        firstName: 'Joe',
        lastName: 'Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
];
const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
    }),
};

class StudentsList extends Component {
    state = {
        data: null
    };


    componentDidMount() {
        this.getStudentsList();
    }

    getStudentsList = () => {
        let token = localStorage.getItem('token');
        fetch("http://localhost:3000/api/student", {
            headers: {
                'Content-Type': 'application/json',
                'token': token
            }
        })
            .then(response => response.json())
            .then(data => this.setState({data: data.filter(i => i.status === true)}));
    };

    render() {
        return (
            <div>
                <Table dataSource={this.state.data}>
                    <Column title="Öğrenci Adı" dataIndex="studentName" key="studentName"/>
                    <Column title="Öğrenci Doğum Tarihi" key="studentAge" render={(text, record)=> (
                        <Moment format="DD/MM/YYYY">{record.studentAge}</Moment>
                    )} />
                    <Column title="Öğrenci Adresi" dataIndex="studentAddress" key="studentAddress"/>
                    <Column title="Öğrenci Telefonu" dataIndex="studentPhone" key="studentPhone"/>

                    <Column
                        title="Aksiyon"
                        key="student_id"
                        render={(text, record) => (
                            <span key={record.student_id}>
                                <Link to={'/student-detail/' + record.student_id}>Detay</Link>
                            </span>
                        )}
                    />
                </Table>
            </div>
        );
    }
}

export default StudentsList;
