import React from "react";
import PropTypes from "prop-types";
import { withRouter } from 'react-router-dom';
import { Menu, Icon } from "antd";
import { Link } from 'react-router-dom';
import { ROUTES } from "../config/routes.config";
import _ from "lodash";

const routes = _.clone(ROUTES);

class Menus extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activeKey: 'OnStar'
    };
  }

  componentDidMount = () => {
    console.log("Menus.jsx@componentDidMount");
    // this.props.history.push({ pathname: '/mainpage/onstar' });
  };

  handleClick = (e) => {
    this.setState({ activeKey: e.key });
  };

  render() {

    return (
      <Menu
        theme="dark"
        mode="horizontal"
        style={{ lineHeight: '64px', }}
        selectable={false}
      >
        <Menu.Item key="OnStar">
          <Link to='/mainpage/onstar'><Icon type='star' /><b>星上程序</b></Link>
        </Menu.Item>
        <Menu.Item key="Pending">
          <Link to='/mainpage/pending'><Icon type='to-top' /><b>即将上传</b></Link>
        </Menu.Item>
        <Menu.Item key="Video">
          <Link to='/mainpage/video'><Icon type='video-camera' /><b>视频教程</b></Link>
        </Menu.Item>
        <Menu.Item key="Post">
          <Link to='/mainpage/post'><Icon type='reddit' /><b>讨论中心</b></Link>
        </Menu.Item>
        {
          (this.props.permission === 'SUPERUSER') ?
            <Menu.Item key="Students">
              <Link to='/mainpage/students'><Icon type='team' /><b>我的学生</b></Link>
            </Menu.Item>
            : null
        }
        {
          (this.props.permission === 'SUPERUSER' || this.props.permission === 'ADMIN') ?
            <Menu.Item key="Check">
              <Link to='/mainpage/check'><Icon type='eye' /><b>审核程序</b></Link>
            </Menu.Item>
            : null
        }
        {
          (this.props.permission === 'ADMIN') ?
            <Menu.Item key="Users">
              <Link to='/mainpage/users'><Icon type='team' /><b>用户管理</b></Link>
            </Menu.Item>
            : null
        }
        <Menu.Item key="Satellite">
          <Link to='/mainpage/showsatellite'><Icon type='shake' /><b>卫星地图</b></Link>
        </Menu.Item>
      </Menu>

    );
  }
}

Menus.contextTypes = {
  router: PropTypes.object
};

export default withRouter(Menus);