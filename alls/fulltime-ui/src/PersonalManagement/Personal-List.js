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

class PersonalList extends Component {
    state = {
        data: null
    };


    componentDidMount() {
        this.getpersonalsList();
    }

    getpersonalsList = () => {
        let token = localStorage.getItem('token');
        fetch("http://localhost:3000/api/personal", {
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
                    <Column title="Personel Adı" dataIndex="personalName" key="personalName"/>
                    <Column title="Personel Doğum Tarihi" key="personalAge" render={(text, record)=> (
                        <Moment format="DD/MM/YYYY">{record.personalAge}</Moment>
                    )} />
                    <Column title="Personel Adresi" dataIndex="personalAddress" key="personalAddress"/>
                    <Column title="Personel Telefonu" dataIndex="personalPhone" key="personalPhone"/>

                    <Column
                        title="Aksiyon"
                        key="personal_id"
                        render={(text, record) => (
                            <span key={record.personal_id}>
                                <Link to={'/personal-detail/' + record.personal_id}>Detay</Link>
                            </span>
                        )}
                    />
                </Table>
            </div>
        );
    }
}

export default PersonalList;
