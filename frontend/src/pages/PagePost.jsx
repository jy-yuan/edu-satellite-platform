import React from 'react'
import 'antd/dist/antd.css';
import { Link } from 'react-router-dom'
import { Form, Icon, Input, Button, Checkbox, List, Avatar, message, Typography } from 'antd';

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

const { Search } = Input;
const { Title } = Typography;
const { TextArea } = Input;

class PagePost extends React.Component {
  state = {
    data1: [],
    permission: '',
    usr: '',
    value: '',
  };

  componentDidMount = () => {
    fetch('/api/getarticles/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify()
    }).then(res => res.json()).then(
      data => {
        if (data['Code'] === true) {
          console.log(data);
          this.setState({ data1: data['Message'] });
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
            permission: msg['permission'],
            usr: msg['username'],
          });
          console.log(this.state);
        }
      }
    )
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        fetch('/api/postarticle/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          body: JSON.stringify(values)
        }).then(res => res.json()).then(
          data => {
            console.log(data)
            if (data['Code'] === true) {
              this.componentDidMount();
              message.success("发帖成功");
            }
          }
        )
      }
    });
  };

  onChange = ({ target: { value } }) => {
    this.setState({ value });
  };

  submitSearch = (value) => {
    console.log('Received values of form: ', value);
    fetch('/api/searchpost/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ 'search': value })
    }).then(res => res.json()).then(
      data => {
        if (data['Code'] === true) {
          console.log(data);
          this.setState({ data1: data['Message'] });
        }
      }
    );
  }

  render() {
    const { permission } = this.state;
    const { value } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Title level={2}>💬 讨论中心</Title>
        <br />
        <div>
          <h3>查找帖子：</h3>
        </div>
        <Search
          prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder="请输入查找内容"
          onSearch={value => this.submitSearch(value)}
          enterButton />
        <List
          itemLayout="horizontal"
          size="large"
          pagination={{
            onChange: page => {
              console.log(page);
            },
            pageSize: 10,
          }}
          dataSource={this.state.data1}
          header={
            <div>
              <h3>全部帖子：</h3>
            </div>
          }
          renderItem={item => (
            <List.Item
              actions={(permission === 'SUPERUSER' || permission === 'ADMIN' || item.author.username === this.state.usr)
                ? [<b type="danger" onClick={() => {
                  fetch('/api/deletepost/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json; charset=utf-8' },
                    body: JSON.stringify({ "id": item.id })
                  }).then(res => res.json()).then(
                    data => {
                      if (data['Code'] === true) {
                        console.log(data);
                        this.setState({ data1: data['Message'] });
                      }
                    }
                  );
                }}>删帖</b>]
                : []}
              key={item.title}
            >
              <List.Item.Meta
                avatar={<Avatar src={item.author.avatar} />}
                title={item.title}
                description={'作者：' + item.author.username}
              />
              {item.text}
            </List.Item>
          )}
        />
        <div>
          <h3>发布帖子：</h3>
        </div>
        <Form
          onSubmit={this.handleSubmit}
          className="post-form">
          <Form.Item>
            {getFieldDecorator('title', {
              initialValue: this.props.location === undefined || this.props.location.state === undefined ? '' : this.props.location.state['title'],
              rules: [{ required: true, message: '请输入标题' }],
            })(
              <Input
                prefix={<Icon type="form" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="标题"
                allowClear
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('text', {
              initialValue: this.props.location === undefined || this.props.location.state === undefined ? '' : this.props.location.state['text'],
              rules: [{ required: true, message: '请输入正文' }],
            })(
              <TextArea
                value={value}
                onChange={this.onChange}
                rows={4}
                autoSize={{ minRows: 4, maxRows: 7 }}
                allowClear
                placeholder="正文"
              />,
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="submit-button">
              发布
          </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const WrappedPagePost = Form.create({ name: 'postcenter' })(PagePost);

export default WrappedPagePost