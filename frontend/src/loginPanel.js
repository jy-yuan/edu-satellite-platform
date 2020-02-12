import React from 'react'
import './loginPanel.css';
import 'antd/dist/antd.css';
import { Link } from 'react-router-dom'
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';

class NormalLoginForm extends React.Component {

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        fetch('/api/login/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          body: JSON.stringify(values)
        }).then(res => res.json()).then(
          data => {
            console.log(data)
            if (data['Code'] === true) {
              this.props.history.push('/mainpage/onstar');
            } else {
              if (data.Message === "password error") {
                message.warning("登录失败：用户名或密码错误");
              } else {
                message.warning("登录失败：未知错误");
              }
            }
          }
        )
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('username', {
            initialValue: this.props.location === undefined || this.props.location.state === undefined ? '' : this.props.location.state['username'],
            rules: [{ required: true, message: '请输入用户名/手机号/电子邮箱' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="用户名/手机号/电子邮箱"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            initialValue: this.props.location === undefined || this.props.location.state === undefined ? '' : this.props.location.state['password'],
            rules: [{ required: true, message: '请输入密码' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="密码"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox className="remember">记住我</Checkbox>)}
          <a className="login-form-forgot" href="">
            忘记密码
          </a>
          <Button type="primary" htmlType="submit" className="login-form-button">
            登录
          </Button>
          没有账户？现在<Link to='/registerpage'>注册</Link>！
        </Form.Item>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

// ReactDOM.render(<WrappedNormalLoginForm />, mountNode);
export default WrappedNormalLoginForm