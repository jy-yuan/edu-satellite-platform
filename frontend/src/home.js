import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import 'antd/dist/antd.css';
import './home.css';
import { Row, Col } from 'antd';
import WrappedNormalLoginForm from './loginPanel';
import RegisterPanel from './registerPanel';
import { HashRouter as Router, Route } from 'react-router-dom';

const { Header, Content, Footer } = Layout;


class Home extends Component {
  componentDidMount = () => {
    // this.props.history.push('/h');
  };

  render() {
    return (
      <Layout className="layout">
        <Header style={{backgroundColor:"rgb(0,0,32)"}}>
        </Header>
        <Content style={{ padding: '0 ' }}>
          <div style={{ background: '#fff', padding: 0, height:"620px"}}>
            <div>
              <Row className="bodyrow">
              <Col span={15}></Col>
              <Col span={7}>
                <Route exact path="/" component={WrappedNormalLoginForm} style={{background: "#fff"}}/>
                <Route path="/registerpage" component={RegisterPanel} style={{background: "#fff"}}/>
                {/* <LoginPanel /> */}
              </Col>
              <Col span={2}></Col>
              </Row>
            </div>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' ,backgroundColor:"rgb(0,1,32)",color:"white" }}>教育卫星平台 ©2019 Created by NewFormosa</Footer>
      </Layout>
    );
  }
}

export default Home;