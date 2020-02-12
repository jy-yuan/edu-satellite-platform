import React from 'react'
import './registerPanel.css'
import 'antd/dist/antd.css';
import { Link } from 'react-router-dom'
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
} from 'antd';

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    phone: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        let mean = values.way;
        let text = {
          username: values.username,
          password: values.password,
          mobile: mean === 'byPhone' ? values.phoneOrEmail : '',
          code: values.captcha,
          email: mean === 'byEmail' ? values.phoneOrEmail : ''
        };
        console.log(text);
        let send = JSON.stringify(text);
        // this.props.history.push({ pathname: "/", state: text });
        fetch('/api/register/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          body: send
        }).then(res => res.json()).then(
          data => {
            console.log(data)
            console.log(data['Code'])
            if (data['Code'] === true) {
              this.props.history.push({ pathname: "/", state: text });
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

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  handleWebsiteChange = value => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
  };

  sendVerificationCode = () => {
    const { form } = this.props;
    form.validateFields(['phoneOrEmail', { force: true }]);
    let phoneOrEmail = form.getFieldValue('phoneOrEmail');
    console.log(phoneOrEmail);
    let key;
    if (form.getFieldValue('way') === 'byPhone') {
      console.log(1);
      let text = {
        mobile: phoneOrEmail
      };
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
      let text = {
        email: phoneOrEmail
      };
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

    const formItemLayout = {
      // labelCol: {
      //   xs: { span: 24 },
      //   sm: { span: 8 },
      // },
      // wrapperCol: {
      //   xs: { span: 24 },
      //   sm: { span: 16 },
      // },
      className: "register-form",
    };
    const tailFormItemLayout = {
      // wrapperCol: {
      //   xs: {
      //     span: 24,
      //     offset: 0,
      //   },
      //   sm: {
      //     span: 16,
      //     offset: 8,
      //   },
      // },
    };
    const prefixSelector = getFieldDecorator('way', {
      initialValue: 'byPhone',
    })(
      <Select style={{ width: 140 }}>
        <Option value="byPhone">手机号（+86）</Option>
        <Option value="byEmail">电子邮件</Option>
      </Select>,
    );

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '请输入用户名', whitespace: true }],
          })(<Input placeholder="用户名（必需）" />)}
        </Form.Item>
        <Form.Item hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: '请输入密码',
              },
              {
                validator: this.validateToNextPassword,
              },
            ],
          })(<Input.Password placeholder="密码（必需）"/>)}
        </Form.Item>
        <Form.Item hasFeedback>
          {getFieldDecorator('confirm', {
            rules: [
              {
                required: true,
                message: '请再次输入密码',
              },
              {
                validator: this.compareToFirstPassword,
              },
            ],
          })(<Input.Password onBlur={this.handleConfirmBlur} placeholder="确认密码（必需）"/>)}
        </Form.Item>
        {/* <Form.Item>
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: '邮箱不合法',
              },
            ],
          })(<Input placeholder="E-mail" />)}
        </Form.Item> */}
        <Form.Item>
          {getFieldDecorator('phoneOrEmail', {
            rules: [{ required: true, message: '请输入手机号或邮箱' }],
          })(<Input addonBefore={prefixSelector} style={{ width: '100%' }} placeholder="" />)}
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
        <Form.Item {...tailFormItemLayout}>
          {getFieldDecorator('agreement', {
            valuePropName: 'checked',
            rules: [{ required: true, message: '请同意使用条款' }]
          })(
            <Checkbox className="law">
              我已阅读并同意<a href="">使用条款</a>
            </Checkbox>,
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" className="register-form-button">
            注册
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(RegistrationForm);

// ReactDOM.render(<WrappedRegistrationForm />, mountNode);

export default WrappedRegistrationForm;