import React, { Component } from 'react';
import { Player, ControlBar } from 'video-react';
// import { FormGroup, Label, Input } from 'reactstrap';
import 'video-react/dist/video-react.css';
import { Collapse, Button, Form, Input, Icon, Typography } from 'antd';
import UploadPanel from '../components/uploadPanel';

const { Search } = Input;
const { Title } = Typography;
const { Panel } = Collapse;

class PageVideo extends React.Component {

  description = '';

  state = {
    data2: [{description: "示例教程",
    header: "卫星.mp4",
    id: "8",
    likes: "0",
    owner: "administrator",
    src: "https://satellite-redoces.app.secoder.net/media/administrator/videos/%E5%8D%AB%E6%98%9F.mp4",
    time: "2019-11-22 12:48:33",
    time2: "2019-11-22 12:48:33",
    views: "0"}],
    permission: 'USER',
    descriptioninput: '',
    searchinput: '',
  };

  componentDidMount = () => {
    fetch('/api/getvideos/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify()
    }).then(res => res.json()).then(
      data => {
        if (data['Code'] === true) {
          console.log(data);
          this.setState({ data2: data["Message"] });
        }
      }
    )
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
          this.setState({
            permission: msg['permission']
          });
          console.log(this.state);
        }
      }
    )
  };

  submitSearch = (value) => {
    console.log('Received values of form: ', value);
    fetch('/api/searchvideo/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ 'search': value })
    }).then(res => res.json()).then(
      data => {
        if (data['Code'] === true) {
          console.log(data);
          this.setState({ data2: data['Message'] });
        }
      }
    );
  }

  onChange = ({ target: { value } }) => {
    this.setState({ value });
  };

  handleValueChange = (e) => {
    this.setState({ descriptioninput: e.target.value });
  }

  setVideo = () => {
    const { permission } = this.state;
    const { data2 } = this.state;
    var Videos = [];
    for (var i = 0; i < this.state.data2.length; i++) {
      const j = i;
      Videos.push(

        <Panel header={this.state.data2[i]["header"]} key={i}>
          <div>
            <b>{this.state.data2[i]["description"]}</b>
          </div>
          <br />
          <Player
            src={this.state.data2[i]["src"]}
            fluid={false}>
            <ControlBar autoHide={false} className="my-class" />
          </Player>
          <br />
          {(permission === 'SUPERUSER' || permission === 'ADMIN') ?
            <Form>
              <Form.Item>
                <Input
                  name="changedescription"
                  id="changedescription"
                  onChange={this.handleValueChange}
                  placeholder={this.state.data2[i]["description"]}
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" onClick={() => {
                  fetch('/api/changedescription/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json;  charset=utf-8' },
                    body: JSON.stringify({ "id": this.state.data2[j].id, "description": this.state.descriptioninput })
                  }).then(res => res.json()).then(
                    data => {
                      if (data['Code'] === true) {
                        console.log(data);
                        this.setState({ data2: data['Message'] });
                      }
                    }
                  );
                }}>
                  修改视频简介
                </Button>
                <br />
                <Button type="danger" onClick={() => {
                  fetch('/api/deletevideo/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json; charset=utf-8' },
                    body: JSON.stringify({ "id": this.state.data2[j].id })
                  }).then(res => res.json()).then(
                    data => {
                      if (data['Code'] === true) {
                        console.log(data);
                        this.setState({ data2: data['Message'] });
                      }
                    }
                  );
                }}>
                  删除该视频
              </Button>
              </Form.Item>
            </Form>
            : <div />}
        </Panel>

      );
    }
    return Videos;
  };

  render() {
    const { permission } = this.state;
    const { value } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Title level={2}>📺 视频教程</Title>
        <br />
        <div>
          <h3>查找视频教程：</h3>
        </div>
        <Search
          prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder="请输入查找内容"
          onSearch={value => this.submitSearch(value)}
          enterButton />
        {(permission === 'SUPERUSER' || permission === 'ADMIN') ? <div><br /><UploadPanel api='postvideo' /></div> : <div />}
        <br />
        <div>
          <h3>视频教程：</h3>
        </div>
        <Collapse effect="fade">
          {this.setVideo()}
        </Collapse>
      </div>
    );
  }
}

const WrappedPageVideo = Form.create({ name: 'videocenter' })(PageVideo);

export default WrappedPageVideo;


