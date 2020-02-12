import React from "react";
import { Table, Divider, Tag, Typography } from 'antd';
const { Column, ColumnGroup } = Table;

const { Title } = Typography;

class PagePending extends React.Component {
  state = {
    data2: []
  };

  componentDidMount = () => {
    fetch('/api/getpending/', {
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
      <div>
        <Title level={2}>🔜 即将上传</Title>
      <Table
        dataSource={this.state.data2}
        expandedRowRender={
          record =>
            <div>
              <p style={{ margin: 0 }}>
                作者: {record.owner}
              </p>
              <p style={{ margin: 0 }}>
                赞数: {record.likes}
              </p>
              <p style={{ margin: 0 }}>
                下载数: {record.downloads}
              </p>
            </div>
        }>
        <Column title="程序名" dataIndex="title" key="title" />
        <Column title="上传时间" dataIndex="time" key="time" />
        <Column title="程序说明" dataIndex="description" key="description" />
      </Table>
      </div>
    );
  }
}

export default PagePending;