import React from "react";
import { Table, Modal, Divider, Tag, Button, Col } from 'antd';
const { Column, ColumnGroup } = Table;

class PageUsers extends React.Component {
  state = {
    groupid: "",
    data2: [
    ]
  };

  componentDidMount = () => {
    fetch('/api/getusers/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify()
    }).then(res => res.json()).then(
      data => {
        if (data['Code'] === true) {
          console.log(data);
          this.setState({ data2: data['Message'] });
        }
      }
    )
  };

  render() {
    return (
      <Table dataSource={this.state.data2}>
        <Column
          title='序号'
          key='index'
          render={(text, record, index) => (
            <span>
              {index + 1}
            </span>)
          } />
        <Column title="用户名" dataIndex="username" key="username" />
        <Column title="所在组" dataIndex="group" key="group" />
        <Column title="学校" dataIndex="school" key="school"/>
        <Column title="权限" dataIndex="permisssion" key="permission" />
        <Column
          title='操作'
          key='action'
          dataIndex="status"
          render={(text, record) => {
            if (record.permission === "SUPERUSER") {
              return (
                <span>
                  <a onClick={() => {
                    console.log(record.id);
                    fetch('/api/changepermission/', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json;charset=utf-8' },
                      body: JSON.stringify({ "id": record.id })
                    }).then(res => res.json()).then(
                      data => {
                        console.log(data)
                        if (data['Code'] === true) {
                          console.log(data.Message)
                          Modal.success({ content: "降级成功" })
                        }
                      }
                    )
                  }}>降级</a>
                </span>
              )
            } else if (record.permission === "USER") {
              return (
                <span>
                <a onClick={() => {
                  console.log(record.id);
                  fetch('/api/changepermission/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json;charset=utf-8' },
                    body: JSON.stringify({ "id": record.id })
                  }).then(res => res.json()).then(
                    data => {
                      console.log(data)
                      if (data['Code'] === true) {
                        console.log(data.Message)
                        Modal.success({ content: "升级成功" })
                      }
                    }
                  )
                }}>升级</a>
              </span>
              )
            } else {
              return (
                <Tag color='green'>超级管理员不可改动</Tag>
              )
            }
          }
          } />
      </Table>
    );
  }

}

export default PageUsers;