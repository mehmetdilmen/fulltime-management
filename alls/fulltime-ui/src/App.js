import React, {Component} from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
} from "react-router-dom";


import logoWhite from "./logo-q.png"
import Home from "./Home/Home"
import StudentForm from "./StudentManagement/New-Student"
import StudentsList from "./StudentManagement/Students-List"
import StudentDetail from "./StudentManagement/Student-Detail"

import ClassesDetail from "./ClassManagement/Classes-Detail"
import NewClasses from "./ClassManagement/New-Classes"
import ClassesList from "./ClassManagement/Classes-List"

import PersonalDetail from "./PersonalManagement/Personal-Detail"
import NewPersonal from "./PersonalManagement/New-Personal"
import PersonalList from "./PersonalManagement/Personal-List"



import Login from "./Auth/Login";
import {Icon, Layout, Menu} from "antd";
import Auth from "./Auth/Auth";
import Redirect from "react-router/lib/Redirect";

const {Header, Sider, Content} = Layout;
const {SubMenu} = Menu;


export default class App extends Component {
    state = {
        collapsed: false,
        loggedIn: false
    };


    logOut = () => {
        localStorage.clear();
        window.location = '/login';
    };

    componentDidMount() {
        this.checkToken();
    }

    checkToken = () => {
        const token = localStorage.getItem('token');
        if (token !== null) {
            this.setState({
                loggedIn: true
            })
        }
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {
        return (
            <div className="App">
                {this.state.loggedIn ?
                    <Layout>
                        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                                <img src={logoWhite} style={{width: '150px', marginBottom: '20px', marginTop: '10px'}}/>
                                <Menu.Item key="1">
                                    <Link to={'/home'}>
                                        <Icon type="snippets"/>
                                        <span>Ana Ekran</span>
                                    </Link>
                                </Menu.Item>
                                <SubMenu
                                    key="sub2"
                                    title={
                                        <span>
                                    <Icon type="user"/>
                                    <span>Öğrenci Yönetimi</span>
                                  </span>}>
                                    <Menu.Item key="5"><Link to={'/students-list'}>Öğrenciler</Link></Menu.Item>
                                    <Menu.Item key="6"><Link to={'/new-student'}>Yeni Kayıt</Link></Menu.Item>
                                </SubMenu>
                                <SubMenu
                                    key="sub4"
                                    title={
                                        <span>
                                    <Icon type="import"/>
                                    <span>Kurum Yönetimi</span>
                                  </span>}>
                                    <Menu.Item key="9"><Link to={'/class-list'}>Sınıflar</Link></Menu.Item>
                                    <Menu.Item key="10"><Link to={'/new-class'}>Sınıf Ekle</Link></Menu.Item>
                                </SubMenu>
                                <SubMenu
                                    key="sub5"
                                    title={
                                        <span>
                                    <Icon type="user"/>
                                    <span>Personel Yönetimi</span>
                                  </span>}>
                                    <Menu.Item key="19"><Link to={'/personal-list'}>Personeller</Link></Menu.Item>
                                    <Menu.Item key="18"><Link to={'/new-personal'}>Personel Ekle</Link></Menu.Item>
                                </SubMenu>
                                <Menu.Item key="11" onClick={this.logOut}>
                                    <Icon type="logout"/>
                                    <span>Çıkış</span>
                                </Menu.Item>
                            </Menu>
                        </Sider>
                        <Layout>
                            <Header style={{background: '#fff', padding: 0, zIndex: 1}}>
                                <Icon
                                    className="trigger"
                                    type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                    onClick={this.toggle}
                                />
                            </Header>
                            <Content
                                style={{
                                    margin: '24px 16px',
                                    padding: 24,
                                    background: '#fff',
                                    minHeight: "auto",
                                }}
                            >

                                <Switch>
                                    <Route exact path="/" component={Home}/>
                                    <Route exact path="/home" component={Home}/>
                                    <Route exact path="/login" component={Login}/>
                                    <Route exact path="/students-list" component={StudentsList}/>
                                    <Route exact path="/student-detail/:id" component={StudentDetail}/>
                                    <Route path="/new-student" exact strict
                                           render={() => (
                                               this.state.loggedIn ? (<StudentForm/>) : (<Redirect to="/"/>)
                                           )}/>


                                    <Route exact path="/class-list" component={ClassesList}/>
                                    <Route exact path="/class-detail/:id" component={ClassesDetail}/>
                                    <Route path="/new-class" exact strict component={NewClasses}/>

                                    <Route exact path="/personal-list" component={PersonalList}/>
                                    <Route exact path="/personal-detail/:id" component={PersonalDetail} />
                                    <Route path="/new-personal" exact strict component={NewPersonal}/>
                                </Switch>
                            </Content>
                        </Layout>
                    </Layout>
                    : <Auth></Auth>
                }

            </div>
        );
    }
}
