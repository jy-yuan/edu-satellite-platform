import React from "react";
import { Table, Modal, Divider, Tag, Button, Col } from 'antd';
const { Column, ColumnGroup } = Table;

class PageGroups extends React.Component {
  state = {
    groupid: "",
    data2: []
  };

  componentDidMount = () => {
    fetch('/api/getgroups/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify()
    }).then(res => res.json()).then(
      data => {
        if (data['Code'] === true) {
          console.log(data);
          this.setState({ data2: data['Message']['groups'], groupid: data['Message']['groupid'] });
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
        <Column title="组名" dataIndex="name" key="name" />
        <Column title="组长" dataIndex="leader" key="leader" />
        <Column
          title='操作'
          key='action'
          dataIndex="status"
          render={(text, record) => {
            if (record.name == "superuser") {
              return (
                <Tag color="red">不可加入</Tag>
              )
            } else if (record.id == this.state.groupid) {
              return (
                <Tag color="green">已在组中</Tag>
              )
            } else {
              return (
                <span>
                  <a onClick={() => {
                    console.log(record.id);
                    fetch('/api/appendgroup/', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json;charset=utf-8' },
                      body: JSON.stringify({ "id": record.id })
                    }).then(res => res.json()).then(
                      data => {
                        console.log(data)
                        if (data['Code'] == true) {
                          console.log(data.Message)
                        }
                      }
                    )
                    Modal.success({ content: "加入成功" })
                  }}>加入</a>
                </span>
              )
            }
          }
          } />
      </Table>
    );
  }

}

export default PageGroups;