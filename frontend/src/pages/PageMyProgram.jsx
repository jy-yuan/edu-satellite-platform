import React from "react";
import { Table, Divider, Tag } from 'antd';
const { Column, ColumnGroup } = Table;

class PageMyProgram extends React.Component {
  state = {
    data2: []
  };

  componentDidMount = () => {
    fetch('/api/get/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify()
    }).then(res => res.json()).then(
      data => {
        if (data['Code'] === true) {
          console.log(data);
          this.setState({ data2: data['Message']['programs'] });
        }
      }
    )
  };

  render() {
    return (
      <Table dataSource={this.state.data2}>
        <Column title="程序名" dataIndex="title" key="title" />
        <Column title="提交时间" dataIndex="time" key="time" />
        <Column title="上传时间" dataIndex="time2" key="time2" />
        <Column
          title="审核状态"
          dataIndex="status"
          key="status"
          render={status => {
            let color = 'blue';
            if (status === 'PYFAILED' || status === 'CHECKFAILED') {
              color = 'red'
            }
            if (status === 'CHECKSUCESS' || status === 'SENT' || status === 'DONE') {
              color = 'green'
            }
            return (<span>
              <Tag color={color} key={status}>
                {status}
              </Tag>
            </span>)
          }
          } />      </Table>
    );
  }

}

export default PageMyProgram;