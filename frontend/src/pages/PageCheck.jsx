import React from "react";
import { Table, Divider, Tag, Button, Col, Modal, Typography } from 'antd';
const { Column, ColumnGroup } = Table;
const { Title } = Typography;

let showing = 0;

class PageCheck extends React.Component {
  state = {
    permission: "",
    data2: []
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
    fetch('/api/getgroupprograms/', {
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
    );
    fetch('/api/get/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({})
    }).then(res => res.json()).then(
      data => {
        if (data['Code'] === true) {
          console.log(data);
          this.setState({ permission: data['Message']['permission'] });
        }
      }
    );
  };

  passCheck = (i) => {
    // console.log(i);
    //alert(i);
  };

  getTables = () => {
    var tables = [];
    console.log(this.state.data2);
    for (var i = 0; i < this.state.data2.length; i++) {
      console.log(i);
      let thisTitle = this.state.data2[i]['name'];
      tables.push(
        <Table title={() => { return thisTitle }} dataSource={this.state.data2[i]['programs']}>
          <Column
            title='序号'
            key='index'
            render={(text, record, index) => (
              <span>
                {index + 1}
              </span>)
            } />
          <Column
            title='程序名'
            key='title'
            dataIndex='title'
            render={(title, record) => (
              <span>
                <a onClick={() => {
                  fetch('/api/checking/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json; charset=utf-8' },
                    body: JSON.stringify({ "id": record.id })
                  }).then(res => res.json()).then(
                    data => {
                      console.log(data);
                    }
                  );
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
                        const data2 = this.state.data2.slice(); // copy
                        for (let i = 0; i < data2.length; i++) {
                          for (let j = 0; j < data2[i].programs.length; j++) {
                            if (data2[i].programs[j].id === record.id) {
                              data2[i].programs[j].status = "CHECKING";
                            }
                          }
                        }
                        this.setState({ data2: data2 });
                      }
                    );
                  }
                  );
                }
                }
                >{title}</a>
              </span>)
            } />
          <Column title="作者" dataIndex="owner" key="owner" />
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
            } />
          <Column
            title='操作'
            key='action'
            dataIndex="status"
            render={(status, record) => {
              if (status === 'PYFAILED') {
                return (
                  <Tag color='red'>
                    语法检查失败
                  </Tag>
                )
              }
              if (status === 'TOCHECK') {
                return (
                  <Tag color='blue'>
                    请下载程序进行审核
                  </Tag>
                )
              }
              if (status === 'CHECKING') {
                return (
                  <span>
                    <a onClick={() => {
                      console.log(record.id)
                      fetch('/api/checksuccess/', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json; charset=utf-8' },
                        body: JSON.stringify({ "id": record.id })
                      }).then(res => res.json()).then(
                        data => {
                          console.log(data);
                          if (data['Code'] === true) {
                            console.log(data);
                            const data2 = this.state.data2.slice(); // copy
                            for (let i = 0; i < data2.length; i++) {
                              for (let j = 0; j < data2[i].programs.length; j++) {
                                if (data2[i].programs[j].id === record.id) {
                                  data2[i].programs[j].status = "CHECKSUCCESS";
                                }
                              }
                            }
                            this.setState({ data2: data2 });
                          }
                        }
                      );
                    }}>通过</a>
                    <Divider type="vertical" />
                    <a onClick={() => {
                      console.log(record.id)
                      fetch('/api/checkfailed/', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json; charset=utf-8' },
                        body: JSON.stringify({ "id": record.id })
                      }).then(res => res.json()).then(
                        data => {
                          console.log(data);
                          if (data['Code'] === true) {
                            console.log(data);
                            const data2 = this.state.data2.slice(); // copy
                            for (let i = 0; i < data2.length; i++) {
                              for (let j = 0; j < data2[i].programs.length; j++) {
                                if (data2[i].programs[j].id === record.id) {
                                  data2[i].programs[j].status = "CHECKFAILED";
                                }
                              }
                            }
                            this.setState({ data2: data2 });
                          }
                        }
                      )
                    }}>不通过</a>
                  </span>)
              }
              if (status === 'CHECKSUCCESS') {
                return (
                  <span>
                    <a onClick={() => {
                      console.log(record.id)
                      fetch('/api/submit/', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json; charset=utf-8' },
                        body: JSON.stringify({ "id": record.id })
                      }).then(res => res.json()).then(
                        data => {
                          console.log(data);
                          if (data['Code'] === true) {
                            console.log(data);
                          }
                        }
                      )
                    }}>上传</a>
                  </span>
                )
              }
              if (status === 'CHECKFAILED') {
                return (
                  <Tag color='red'>
                    检查失败
                  </Tag>
                )
              }
              if (status === 'TOSEND') {
                if (this.state.permission === 'SUPERUSER') {
                  return (
                    <Tag color='blue'>
                      已提交上传申请
                    </Tag>
                  )
                } else {
                  return (
                    <Tag color='blue' onClick={() => {
                      fetch('/api/send/', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json; charset=utf-8' },
                        body: JSON.stringify({ "id": record.id })
                      }).then(res => res.json()).then(
                        data => {
                          if (data['Code'] === true) {
                            console.log(data);
                            const data2 = this.state.data2.slice(); // copy
                            for (let i = 0; i < data2.length; i++) {
                              for (let j = 0; j < data2[i].programs.length; j++) {
                                if (data2[i].programs[j].id === record.id) {
                                  data2[i].programs[j].status = "SENT";
                                }
                              }
                            }
                            this.setState({ data2: data2 });
                          }
                        }
                      );
                    }}>
                      已提交上传申请
                    </Tag>
                  )
                }
              }
              if (status === 'SENT') {
                return (
                  <Tag color='green'>
                    已上传
                  </Tag>
                )
              }
            }
            } />
        </Table>
      );
    }
    return tables;
  };



  render() {
    return (
      <div>
        <Title level={2}>☑️ 审核程序</Title>
        {/* {this.getTables()} */}
        <Table title={() => { return "您共管理 " + this.state.data2.length + " 个组" }} dataSource={this.state.data2}>
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
          <Column title="程序数" key="number" render={(text, record) => {
            return (
              <span>
                {record.programs.length}
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
              width="800"
              footer={[
                <Button key="back" onClick={this.handleCancel}>
                  返回
            </Button>
              ]}
            >
              <Table title={() => { return "审核程序" }} dataSource={this.state.data2[showing].programs}>
                <Column
                  title='序号'
                  key='index'
                  render={(text, record, index) => (
                    <span>
                      {index + 1}
                    </span>)
                  } />
                <Column
                  title='程序名'
                  key='title'
                  dataIndex='title'
                  render={(title, record) => (
                    <span>
                      <a onClick={() => {
                        fetch('/api/checking/', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json; charset=utf-8' },
                          body: JSON.stringify({ "id": record.id })
                        }).then(res => res.json()).then(
                          data => {
                            console.log(data);
                          }
                        );
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
                              // const data2 = this.state.data2.slice(); // copy
                              // for (let i = 0; i < data2.length; i++) {
                              //   for (let j = 0; j < data2[i].programs.length; j++) {
                              //     if (data2[i].programs[j].id === record.id) {
                              //       data2[i].programs[j].status = "CHECKING";
                              //     }
                              //   }
                              // }
                              // this.setState({ data2: data2 });
                              fetch('/api/getgroupprograms/', {
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
                              );
                            }
                          );
                        }
                        );
                      }
                      }
                      >{title}</a>
                    </span>)
                  } />
                <Column title="作者" dataIndex="owner" key="owner" />
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
                  } />
                <Column
                  title='操作'
                  key='action'
                  dataIndex="status"
                  render={(status, record) => {
                    if (status === 'PYFAILED') {
                      return (
                        <Tag color='red'>
                          语法检查失败
                  </Tag>
                      )
                    }
                    if (status === 'TOCHECK') {
                      return (
                        <Tag color='blue'>
                          请下载程序进行审核
                  </Tag>
                      )
                    }
                    if (status === 'CHECKING') {
                      return (
                        <span>
                          <a onClick={() => {
                            console.log(record.id)
                            fetch('/api/checksuccess/', {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json; charset=utf-8' },
                              body: JSON.stringify({ "id": record.id })
                            }).then(res => res.json()).then(
                              data => {
                                console.log(data);
                                if (data['Code'] === true) {
                                  console.log(data);
                                  // const data2 = this.state.data2.slice(); // copy
                                  // for (let i = 0; i < data2.length; i++) {
                                  //   for (let j = 0; j < data2[i].programs.length; j++) {
                                  //     if (data2[i].programs[j].id === record.id) {
                                  //       data2[i].programs[j].status = "CHECKSUCCESS";
                                  //     }
                                  //   }
                                  // }
                                  // this.setState({ data2: data2 });
                                  fetch('/api/getgroupprograms/', {
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
                                  );
                                }
                              }
                            );
                          }}>通过</a>
                          <Divider type="vertical" />
                          <a onClick={() => {
                            console.log(record.id)
                            fetch('/api/checkfailed/', {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json; charset=utf-8' },
                              body: JSON.stringify({ "id": record.id })
                            }).then(res => res.json()).then(
                              data => {
                                console.log(data);
                                // if (data['Code'] === true) {
                                //   console.log(data);
                                //   const data2 = this.state.data2.slice(); // copy
                                //   for (let i = 0; i < data2.length; i++) {
                                //     for (let j = 0; j < data2[i].programs.length; j++) {
                                //       if (data2[i].programs[j].id === record.id) {
                                //         data2[i].programs[j].status = "CHECKFAILED";
                                //       }
                                //     }
                                //   }
                                //   this.setState({ data2: data2 });
                                // }
                                fetch('/api/getgroupprograms/', {
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
                                );
                              }
                            )
                          }}>不通过</a>
                        </span>)
                    }
                    if (status === 'CHECKSUCCESS') {
                      return (
                        <span>
                          <a onClick={() => {
                            console.log(record.id)
                            fetch('/api/submit/', {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json; charset=utf-8' },
                              body: JSON.stringify({ "id": record.id })
                            }).then(res => res.json()).then(
                              data => {
                                console.log(data);
                                if (data['Code'] === true) {
                                  console.log(data);
                                  fetch('/api/getgroupprograms/', {
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
                                  );
                                }
                              }
                            )
                          }}>上传</a>
                        </span>
                      )
                    }
                    if (status === 'CHECKFAILED') {
                      return (
                        <Tag color='red'>
                          检查失败
                  </Tag>
                      )
                    }
                    if (status === 'TOSEND') {
                      if (this.state.permission === 'SUPERUSER') {
                        return (
                          <Tag color='blue'>
                            已提交上传申请
                    </Tag>
                        )
                      } else {
                        return (
                          <a color='blue' onClick={() => {
                            fetch('/api/send/', {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json; charset=utf-8' },
                              body: JSON.stringify({ "id": record.id })
                            }).then(res => res.json()).then(
                              data => {
                                if (data['Code'] === true) {
                                  console.log(data);
                                  // const data2 = this.state.data2.slice(); // copy
                                  // for (let i = 0; i < data2.length; i++) {
                                  //   for (let j = 0; j < data2[i].programs.length; j++) {
                                  //     if (data2[i].programs[j].id === record.id) {
                                  //       data2[i].programs[j].status = "SENT";
                                  //     }
                                  //   }
                                  // }
                                  // this.setState({ data2: data2 });
                                  fetch('/api/getgroupprograms/', {
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
                                  );
                                }
                              }
                            );
                          }}>
                            上传
                    </a>
                        )
                      }
                    }
                    if (status === 'SENT') {
                      return (
                        <a color='green' onClick={() => {
                          fetch('/api/done/', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json; charset=utf-8' },
                            body: JSON.stringify({ "id": record.id })
                          }).then(res => res.json()).then(
                            data => {
                              if (data['Code'] === true) {
                                console.log(data);
                                // const data2 = this.state.data2.slice(); // copy
                                // for (let i = 0; i < data2.length; i++) {
                                //   for (let j = 0; j < data2[i].programs.length; j++) {
                                //     if (data2[i].programs[j].id === record.id) {
                                //       data2[i].programs[j].status = "SENT";
                                //     }
                                //   }
                                // }
                                // this.setState({ data2: data2 });
                                fetch('/api/getgroupprograms/', {
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
                                );
                              }
                            }
                          );
                        }}>
                          下星
                        </a>
                      )
                    }
                  }
                  } />
              </Table>
            </Modal>
        }
      </div>
    );
  }

}

export default PageCheck;