import React from "react";
import { Table, Modal, Divider, Tag, Button, Col, Input } from 'antd';
const { Column, ColumnGroup } = Table;

class PageCreateGroup extends React.Component {
  state = {
    groupname: "",
    visible: true,
    data2: [
    ]
  };

  componentDidMount = () => {
    fetch('/api/getgroups/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({})
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
      <Modal
        visible={this.state.visible}
        title="创建分组"
        onOk={() => {
          if (this.state.groupname == "") {
            Modal.info({
              content: "请输入组名",
            });
          }
          else {
            fetch('/api/creategroup/', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json; charset=utf-8' },
              body: JSON.stringify({"name":this.state.groupname})
            }).then(res => res.json()).then(
              data => {
                console.log(data);
                if (data['Code'] === true) {
                  this.setState({ data2: data['Message'] });
                  Modal.info({
                    content: (this.state.groupname + '创建成功'),
                  });
                  this.setState({ visible: false });
                  this.props.history.push('/mainpage/students');
                }
                else{
                  Modal.warning({
                    content: (this.state.groupname + '创建失败'),
                  });
                  this.setState({ visible: false });
                  this.props.history.push('/mainpage/students');
                }
              }
            )
          }
        }}
        onCancel={()=>{
          this.setState({ visible: false });
          this.props.history.push('/mainpage');
        }}
      >
        <Input addonBefore="输入组名" id="name" onChange={(e) => {
          console.log(e.target.value)
          this.setState({ groupname: e.target.value });
        }}
        />
      </Modal>
    );
  }
}

export default PageCreateGroup;