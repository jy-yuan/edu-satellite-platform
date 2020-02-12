import React from 'react';
import 'antd/dist/antd.css';
import { Link } from 'react-router-dom'
import {
  Modal,
  Form,
  Input,
  Button,
  Row,
  Col,
  message
} from 'antd';

class ChangePhoneOrEmailPanel extends React.Component {
  state = {

  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        let text = {
          mobile: this.props.type === 'phone' ? values.phone : '',
          code: values.captcha,
          email: this.props.type === 'email' ? values.email : ''
        };
        console.log(text);
        let send = JSON.stringify(text);
        // this.props.history.push({ pathname: "/", state: text });
        fetch('/api/change' + (this.props.type === 'phone' ? 'mobile' : 'email') + '/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          body: send
        }).then(res => res.json()).then(
          data => {
            console.log(data)
            console.log(data['Code'])
            if (data['Code'] === true) {
              // this.props.history.push({ pathname: "/", state: text });
              this.props.onConfirm(true);
            } else {
              this.props.onConfirm(false);
            }
          }
        )
      }
    });
  };

  sendVerificationCode = () => {
    const { form } = this.props;
    if (this.props.type === 'phone') {
      console.log(1);
      form.validateFields(['phone', { force: true }]);
      let phone = form.getFieldValue('phone');
      let text = {
        mobile: phone
      };
      console.log(text);
      let send = JSON.stringify(text);
      fetch('/api/sendmsg/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: send
      }).then(res => res.json()).then(
        data => {
          console.log(data)
        }
      );
    } else {
      console.log(2);
      form.validateFields(['email', { force: true }]);
      let email = form.getFieldValue('email');
      let text = {
        email: email
      };
      console.log(text);
      let send = JSON.stringify(text);
      fetch('/api/sendmail/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: send
      }).then(res => res.json()).then(
        data => {
          console.log(data)
        }
      );
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item>
          {this.props.type === 'email' ? getFieldDecorator('email', {
            rules: [{ type: 'email', message: '请输入合法的邮箱地址' }, { required: true, message: '请输入电子邮箱' }],
          })(<Input style={{ width: '100%' }} placeholder="电子邮箱" />) : getFieldDecorator('phone', {
            rules: [{ required: true, message: '请输入手机号' }],
          })(<Input style={{ width: '100%' }} placeholder="手机号" />)}
        </Form.Item>
        <Form.Item>
          <Row gutter={12}>
            <Col span={16}>
              {getFieldDecorator('captcha', {
                rules: [{ required: true, message: '请输入验证码' }],
              })(<Input placeholder="验证码（必需）" />)}
            </Col>
            <Col span={8}>
              <Button onClick={this.sendVerificationCode}>获取验证码</Button>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            确认
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedChangePhoneOrEmailPanel = Form.create({ name: 'register' })(ChangePhoneOrEmailPanel);

// ReactDOM.render(<WrappedChangePhoneOrEmailPanel />, mountNode);

export default WrappedChangePhoneOrEmailPanel;