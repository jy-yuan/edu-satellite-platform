import React from "react";
import { Upload, Icon, message, Typography, Tabs } from 'antd';
import axios from 'axios';
import { Form, Input, Button, Checkbox, List, Skeleton } from 'antd';
const { Title } = Typography;
const { TabPane } = Tabs;

class PageNotifications extends React.Component {
  notifications = [{ title: "llll", text: "dfsasfd", status: "UNREAD" }, { title: "llll", text: "dfsasfd", status: "UNREAD" }, { title: "llll", text: "dfsasfd", status: "READ" }];
  unread_num = 2;

  state = {
    notices: [],
    unreadNotices: [],
    readNotices: [],
    unread: 0,
  };

  componentDidMount = () => {
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
          // this.setState({
          //   notices: msg.notices,
          //   unread: msg.unread
          // });
          this.notifications = msg.notices;
          this.unread_num = msg.unread;
          // let unread = [];
          // let read = [];
          // for (let i = 0; i < msg.notices.length; i++) {
          //   if (msg.notices[i].status === "UNREAD") {
          //     unread.push(msg.notices[i]);
          //   } else {
          //     read.push(msg.notices[i]);
          //   }
          // }
          // this.setState({
          //   unreadNotices: unread,
          //   readNotices: read
          // });
          // console.log(this.state);
          this.getUnreadAndRead();
        }
      }
    );
    
  };

  getUnreadAndRead = () => {
    let unread = [];
    let read = [];
    let unread_cnt = 0;
    for (let i = 0; i < this.notifications.length; i++) {
      if (this.notifications[i].status === "UNREAD") {
        unread.push(this.notifications[i]);
        unread_cnt++;
      } else {
        read.push(this.notifications[i]);
      }
    }
    this.unread_num = unread_cnt;
    this.setState({
      notices: this.notifications,
      unreadNotices: unread,
      readNotices: read,
      unread: unread_cnt,
    });
  };

  render() {
    return (
      <div>
        <div>
          <Title level={2}>🔔 通知          
            <span style={{ float: 'right', paddingRight: '1%' }}>
              <Button type="primary" onClick={() => {
                fetch('/api/readnotice/', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json; charset=utf-8' },
                  body: JSON.stringify({})
                }).then(res => res.json()).then(
                  data => {
                    console.log(data);
                    if (data['Code'] === true) {
                      for (let i = 0; i < this.notifications.length; i++) {
                        if (this.notifications[i].status === 'UNREAD') {
                          this.notifications[i].status = 'READ';
                        }
                      }
                      this.getUnreadAndRead();
                    }
                  }
                );
              }}>全部标为已读</Button>
            </span>
          </Title>
        </div>
        <Tabs defaultActiveKey="1" tabPosition="left">
          <TabPane tab={"未读 (" + this.state.unread + ")"} key="1">
            <List
              itemLayout="horizontal"
              dataSource={this.state.unreadNotices}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    title={item.title}
                    description={item.text}
                  />
                </List.Item>
              )}
            />
          </TabPane>
          <TabPane tab="已读" key="2">
            <List
              itemLayout="horizontal"
              dataSource={this.state.readNotices}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    title={item.title}
                    description={item.text}
                  />
                </List.Item>
              )}
            />
          </TabPane>
          <TabPane tab="全部" key="3">
            <List
              itemLayout="horizontal"
              dataSource={this.state.notices}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    title={item.title}
                    description={item.text}
                  />
                </List.Item>
              )}
            />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default PageNotifications;