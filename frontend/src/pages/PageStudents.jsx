import React from "react";
import { Modal, Table, Divider, Tag, Typography, Row, Col, Button } from 'antd';
const { Column, ColumnGroup } = Table;
const { Title } = Typography;

let showing = 0;

class PageStudents extends React.Component {
  state = {
    'data2': [],
    visible: false,
  };

  showModal = (e) => {
    console.log(e);
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({ visible: false });
  };

  handleCancel = () => {
    this.setState({ visible: false });
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
          console.log(data);
          this.setState({ data2: data['Message']['groups'] });
        }
      }
    )
  };

  getTitles = () => {
    let titles = [];
    for (var i = 0; i < this.state.data2.length; i++) {
      console.log(i);
      let thisTitle = this.state.data2[i]['name'];
      const j = i;
      titles.push(
        <Row>
          <Col span={12}><a onClick={() => {
            this.setState({
              visible: true,
            }); showing = j;
          }}>{thisTitle}</a></Col>
          <Col span={12}>{this.state.data2[i].students.length}</Col>
        </Row>
      );
    }
    return titles;
  };

  render() {
    return (
      <div>
        <Title level={2}>👨‍🎓 我的学生</Title>
        {/* {this.getTitles()} */}
        <Table title={() => { return "您共管理 " + this.state.data2.length + " 个组" }} dataSource={this.state.data2}>
          {/* <Column title="组名" dataIndex="name" key="name" /> */}
          <Column title="组名" key="name" render={(text, record, index) => {
            return (<span>
              <a onClick={() => {
                this.setState({
                  visible: true,
                }); showing = index;
              }}>
                {record.name}
              </a>
            </span>);
          }} />
          <Column title="人数" key="number" render={(text, record) => {
            return (
              <span>
                {record.students.length}
              </span>
            );
          }} />
        </Table>
        {
          this.state.data2.length === 0 ? null : 
            <Modal
              visible={this.state.visible}
              title={this.state.data2[showing].name}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              footer={[
                <Button key="back" onClick={this.handleCancel}>
                  返回
            </Button>
              ]}
            >
              <Table title={() => { return "成员管理" }} dataSource={this.state.data2[showing]['students']}>
                <Column title="用户名" dataIndex="username" key="username" />
                <Column title="权限" dataIndex="permission" key="permission" />
                <Column
                  title='操作'
                  key='action'
                  render={(text, record) => {
                    return (
                      <span>
                        <a onClick={() => {
                          console.log(record.id);
                          fetch('/api/deleteuser/', {
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
                          Modal.success({ content: "删除成功" })
                        }}>删除</a>
                      </span>
                    )
                  }
                  }
                />
              </Table>
            </Modal>
        }
      </div>
    );
  }

}

export default PageStudents;