import React from "react";
import { Table, Divider, Tag, Popconfirm, Col, Icon, message, Typography } from 'antd';
const { Column, ColumnGroup } = Table;
const { Title } = Typography;

class PageOnStar extends React.Component {
  state = {
    data1: [],
    data2: []
  };

  componentDidMount = () => {
    fetch('/api/getprograms/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify()
    }).then(res => res.json()).then(
      data => {
        if (data['Code'] === true) {
          console.log(data);
          this.setState({ data1: data['Message']['programs1'], data2: data['Message']['programs2'] });
        }
      }
    )
  };

  render() {
    return (
      <div>
        <Title level={2}>🛰️ 星上程序</Title>
        <Table
          dataSource={this.state.data1}
          title={() => '历史最佳'}>
          <Column
            title="程序名"
            dataIndex="title"
            key="title" render={(title, record) => {
              return (
                <a onClick={() => {
                  fetch('/' + record.src, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json; charset=utf-8' },
                    body: JSON.stringify({})
                  }).then(res => {
                    console.log(res);
                    res.blob().then(
                      blob => {
                        let blobUrl = window.URL.createObjectURL(blob);
                        const aElement = document.createElement('a');
                        document.body.appendChild(aElement);
                        let filename = record.title;
                        aElement.href = blobUrl;
                        aElement.download = filename;
                        aElement.click();
                        window.URL.revokeObjectURL(blobUrl);
                        document.body.removeChild(aElement);
                      }
                    );
                  }
                  );
                }}>{title}</a>
              );
            }}/>
          <Column
            title="作者"
            dataIndex="owner"
            key="owner" />
          <Column
            title="学校"
            dataIndex="school"
            key="school" />
          <Column
            title="下载人数"
            dataIndex="downloads"
            key="downloads" />
          <Column
            title="赞"
            dataIndex="likes"
            key="likes" />
          <Column
            title=' '
            key='likestatus'
            dataIndex="likestatus"
            render={(likestatus, record) => {
              if (likestatus === true) {
                return (
                  <Tag color='grey'>
                    已赞
                  </Tag>
                )
              }
              if (likestatus === false) {
                return (
                  <Tag
                    color='red'
                    onClick={() => {
                      console.log(record.id)
                      fetch('/api/like/', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json; charset=utf-8' },
                        body: JSON.stringify({ "id": record.id })
                      }).then(res => res.json()).then(
                        data => {
                          console.log(data);
                          if (data['Code'] === true) {
                            fetch('/api/getprograms/', {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json; charset=utf-8' },
                              body: JSON.stringify()
                            }).then(res => res.json()).then(
                              data => {
                                if (data['Code'] === true) {
                                  console.log(data);
                                  this.setState({ data1: data['Message']['programs1'], data2: data['Message']['programs2'] });
                                }
                              }
                            )
                          }
                        }
                      );
                    }}><Icon type='like' />赞</Tag>
                )
              }
            }} />
        </Table>
        <Table
          dataSource={this.state.data2}
          title={() => '最新'}>
          <Column
            title='序号'
            key='index'
            render={(text, record, index) => (
              <span>
                {index + 1}
              </span>)
            } />
          <Column
            title="程序名"
            dataIndex="title"
            key="title" render={(title, record) => {
              return (
                <a onClick={() => {
                  fetch('/' + record.src, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json; charset=utf-8' },
                    body: JSON.stringify({})
                  }).then(res => {
                    console.log(res);
                    res.blob().then(
                      blob => {
                        let blobUrl = window.URL.createObjectURL(blob);
                        const aElement = document.createElement('a');
                        document.body.appendChild(aElement);
                        let filename = record.title;
                        aElement.href = blobUrl;
                        aElement.download = filename;
                        aElement.click();
                        window.URL.revokeObjectURL(blobUrl);
                        document.body.removeChild(aElement);
                      }
                    );
                  }
                  );
                }}>{title}</a>
              );
            }} />
          <Column
            title="作者"
            dataIndex="owner"
            key="owner" />
          <Column
            title="学校"
            dataIndex="school"
            key="school" />
          <Column
            title="下载人数"
            dataIndex="downloads"
            key="downloads" />
          <Column
            title="赞"
            dataIndex="likes"
            key="likes" />
          <Column
            title="开始时间"
            dataIndex="time"
            key="time" />
          <Column
            title="结束时间"
            dataIndex="time2"
            key="time2" />
          <Column
            title=' '
            key='likestatus'
            dataIndex="likestatus"
            render={(likestatus, record) => {
              if (likestatus === true) {
                return (
                  <Tag color='grey'>
                    已赞
               </Tag>
                )
              }
              if (likestatus === false) {
                return (
                  <Tag
                    color='red'
                    onClick={() => {
                      console.log(record.id)
                      fetch('/api/like/', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json; charset=utf-8' },
                        body: JSON.stringify({ "id": record.id })
                      }).then(res => res.json()).then(
                        data => {
                          console.log(data);
                          if (data['Code'] === true) {
                            fetch('/api/getprograms/', {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json; charset=utf-8' },
                              body: JSON.stringify()
                            }).then(res => res.json()).then(
                              data => {
                                if (data['Code'] === true) {
                                  console.log(data);
                                  this.setState({ data1: data['Message']['programs1'], data2: data['Message']['programs2'] });
                                }
                              }
                            )
                          }
                        }
                      );
                    }}>赞<Icon type='like' /></Tag>
                )
              }
            }} />
        </Table>
      </div>
    );
  }
}

export default PageOnStar;