import React from "react";
import { Form, Input, Button, Icon, Select } from 'antd';
import 'antd/dist/antd.css';

const { Option } = Select;

class ProfileForm extends React.Component {

  // state = {
  //   loading: false,
  //   username: '',
  //   email: '',
  //   mobile: '',
  //   permission: '',
  //   imageUrl: ''
  // };

  // componentDidMount() {
  //   fetch('/api/get/', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json; charset=utf-8' },
  //     body: JSON.stringify({})
  //   }).then(res => res.json()).then(
  //     data => {
  //       console.log(data);
  //       if (data['Code'] === true) {
  //         let msg = data['Message'];
  //         console.log(msg);
  //         this.setState({
  //           loading: false,
  //           username: msg['username'],
  //           email: msg['email'],
  //           mobile: msg['mobile'],
  //           permission: msg['permission'],
  //           imageUrl: msg['avatar'] === "media/avatars/default.svg" ? "" : msg['avatar']
  //         });
  //         console.log(this.state);
  //       }
  //     }
  //   )
  // }

  handleSubmit = e => {
    e.preventDefault();
  };


  render() {
    const { getFieldDecorator } = this.props.form;
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
      </Select>,
    );
    return (
      <Form onSubmit={this.handleSubmit} className="profile-form">
        <Form.Item>
          {getFieldDecorator('username', {
            initialValue: this.props.username,
            rules: [{ required: true, message: '请输入用户名' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="用户名"
            />,
          )}
        </Form.Item>
        {/* <Form.Item>
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: '请输入手机号' }],
            initialValue: this.props.mobile,
          })(<Input addonBefore={prefixSelector} style={{ width: '100%' }} onChange={this.handlePhoneChange} placeholder="手机号（必需）" />)}
        </Form.Item> */}
        {/* <Form.Item> */}
          {/* {this.props.email !== '' ? getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: '邮箱不合法',
              },
            ],
            initialValue: this.props.email,
          })(<Input placeholder="E-mail" />) : null} */}
          {/* {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: '邮箱不合法',
              },
            ],
            initialValue: this.props.email,
          })(<Input placeholder="E-mail" />)} */}
        {/* </Form.Item> */}
        <Form.Item>
          <Button type="primary" htmlType="submit" className="profile-form-button">
            更新信息
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedProfileForm = Form.create()(ProfileForm);
export default WrappedProfileForm