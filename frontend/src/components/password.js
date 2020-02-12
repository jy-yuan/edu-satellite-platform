import React from "react";
import { Form, Input, Button, Icon, Select, message } from 'antd';
import 'antd/dist/antd.css';
import { withRouter } from 'react-router-dom';

class PasswordForm extends React.Component {

  state = {
    confirmDirty: false,
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        let text = {
          password: values.password,
          newpassword: values.newpassword,
        };
        console.log(text);
        let send = JSON.stringify(text);
        // this.props.history.push({ pathname: "/", state: text });
        fetch('/api/changepassword/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          body: send
        }).then(res => res.json()).then(
          data => {
            console.log(data)
            console.log(data['Code'])
            if (data['Code'] === true) {
              message.success("修改成功");
              this.props.history.push({ pathname: "/", state: text });
            } else {
              message.success("修改失败");
            }
          }
        )
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };


  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('newpassword')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="password-form">
        <Form.Item hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: '请输入原密码',
              },
            ],
          })(<Input.Password placeholder="原密码" />)}
        </Form.Item>
        <Form.Item hasFeedback>
          {getFieldDecorator('newpassword', {
            rules: [
              {
                required: true,
                message: '请输入新密码',
              },
              {
                validator: this.validateToNextPassword,
              },
            ],
          })(<Input.Password placeholder="新密码" />)}
        </Form.Item>
        <Form.Item hasFeedback>
          {getFieldDecorator('confirm', {
            rules: [
              {
                required: true,
                message: '请再次输入新密码',
              },
              {
                validator: this.compareToFirstPassword,
              },
            ],
          })(<Input.Password onBlur={this.handleConfirmBlur} placeholder="确认新密码" />)}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="changepsw-form-button">
            修改密码
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedPasswordForm = withRouter(Form.create()(PasswordForm));
export default WrappedPasswordForm;