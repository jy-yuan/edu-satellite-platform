import React from "react";
import PropTypes from "prop-types";
import { Layout, Dropdown, Menu, Icon, Avatar, Tooltip, Badge } from 'antd';
import { HashRouter as Router, Route, Link } from 'react-router-dom'
import 'antd/dist/antd.css';
import Menus from "./Menus";
import { ROUTES } from "../config/routes.config";
import _ from "lodash";
import logo from '../logo.svg';

const routes = _.clone(ROUTES);

class Layouts extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      current: "",
      username: "nouser",
      permission: 'SUPERUSER',
      imageUrl: "",
      group: "null",
      unread: 0,
    }
  }

  componentDidMount() {
    fetch('/api/get/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({})
    }).then(res => res.json()).then(
      data => {
        console.log(data);
        if (data['Code'] === true) {
          let msg = data['Message'];
          console.log(msg);
          this.setState({
            username: msg['username'],
            permission: msg['permission'],
            group: msg['group'],
            imageUrl: msg['avatar'] === "media/avatars/default.svg" ? "" : msg['avatar'],
            unread: msg.unread
          });
          console.log(this.state);
        }
      }
    );
  }

  updateActive = (key) => {
    let index = _.findIndex(routes, route => route.key === key);
    this.setState({ current: routes[index]['text'] });
  };

  logout() {
    fetch('/api/logout/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({})
    }).then(res => res.json()).then(
      () => {
      }
    )
  }

  render() {

    const { Header, Content, Footer } = Layout;
    const { imageUrl, username, permission, group } = this.state;
    const menuAdd = (
      <Menu>
        <Menu.Item key="0">
          <Link to="/mainpage/upload">上传程序</Link>
        </Menu.Item>
        <Menu.Item key="1">
          <Link to={permission === "USER" ? '/mainpage/groups' : '/mainpage/creategroup'}>{permission === "USER" ? "加入组" : "创建组"}</Link>
        </Menu.Item>
      </Menu>
    );
    const menuMe = (
      <Menu>
        <Menu.ItemGroup key="0" title={"当前用户为" + username} />
        <Menu.ItemGroup key="4" title={"所在组为" + group} />
        <Menu.Divider />
        <Menu.Item key="1">
          <Link to="/mainpage/myprogram">我的程序</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/mainpage/user">用户信息设置</Link>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="3" onClick={this.logout}>
          <Link to="/">登出</Link>
        </Menu.Item>
      </Menu>
    );

    return (

      <Layout className="layout" >
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>

          <img className="logo" src="/sat.png" style={{ width: 32, height: 32, textAlign: "center", backgroundColor: "rgba(0,0,0,0)" }} />

          <span style={{ float: 'right', paddingRight: '1%' }}>
            <Tooltip placement="bottomLeft" title='通知中心'>
              <Link to="/mainpage/notifications">
                <Badge dot={this.state.unread ? true : false}>
                  <Icon type="notification" theme="outlined" style={{ fontSize: '20px', color: '#fff', marginRight: '16px' }} />
                </Badge>
              </Link>
            </Tooltip>
            <Tooltip placement="bottomLeft" title='更多操作'>
              <Dropdown overlay={menuAdd} trigger={['click']} placement="bottomRight">
                <a className="ant-dropdown-link" href="#" style={{ marginRight: '16px' }}>
                  <Icon type="plus" theme="outlined" style={{ fontSize: '20px', color: '#fff' }} /> <Icon type="down" />
                </a>
              </Dropdown>
            </Tooltip>
            <Tooltip placement="bottomLeft" title='我的'>
              <Dropdown overlay={menuMe} trigger={['click']} placement="bottomRight">
                <a className="ant-dropdown-link" href="#">
                  <Avatar src={imageUrl ? imageUrl : logo} /> <Icon type="down" />
                </a>
              </Dropdown>
            </Tooltip>
          </span>
          <Menus
            updateActive={this.updateActive}
            permission={permission}
          />
        </Header>
        <Content style={{ padding: '0 50px', marginTop: 64 }}>
          <div style={{ background: '#fff', padding: 24, minHeight: 650 }}>
            {
              routes.map((route) =>
                <Route key={route.key} path={route.link} component={route.component} />)
            }
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>教育卫星平台 ©2019 Created by NewFormosa.</Footer>
      </Layout>

    );
  }

}

Layouts.contextTypes = {
  login: PropTypes.bool,
  userInfo: PropTypes.object,
  setLoginInfo: PropTypes.func
};

export default Layouts;