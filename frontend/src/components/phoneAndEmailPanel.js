import React from 'react';
import 'antd/dist/antd.css';
import { Link } from 'react-router-dom'
import {
  Modal,
  Form,
  Input,
  Button,
  message,
  Descriptions
} from 'antd';
import WrappedChangePhoneOrEmailPanel from './changePhoneOrEmailPanel';

class PhoneAndEmailPanel extends React.Component {
  state = { visible: [false, false] };

  showModal1 = () => {
    this.setState({
      visible: [true, false],
    });
  };

  showModal2 = () => {
    this.setState({
      visible: [false, true],
    });
  };

  handleConfirm = (isSuccess) => {
    this.setState({
      visible: [false, false],
    });
    message.success(isSuccess ? '修改成功' : '修改失败');
  };

  handleCancel = e => {
    this.setState({
      visible: [false, false],
    });
  };

  render() {
    return (
      <div>
        <Descriptions title="">
          <Descriptions.Item label="手机号">{this.props.mobile === '' ? '未绑定 ' : (this.props.mobile + ' ')}
            <a onClick={this.showModal1}>{this.props.mobile === '' ? '绑定' : '更改'}</a></Descriptions.Item>
          <Descriptions.Item label="电子邮件">{this.props.email === '' ? '未绑定 ' : (this.props.email + ' ')}
            <a onClick={this.showModal2}>{this.props.email === '' ? '绑定' : '更改'}</a></Descriptions.Item>
        </Descriptions>
        <div>
          <Modal
            title="绑定手机号"
            visible={this.state.visible[0]}
            onCancel={this.handleCancel}
            footer={null}
          >
            <WrappedChangePhoneOrEmailPanel type='phone' onConfirm={this.handleConfirm} />
            {/* {panel} */}
          </Modal>
        </div>
        <div>
          <Modal
            title="绑定邮箱"
            visible={this.state.visible[1]}
            onCancel={this.handleCancel}
            footer={null}
          >
            <WrappedChangePhoneOrEmailPanel type='email' onConfirm={this.handleConfirm}/>
            {/* {panel} */}
          </Modal>
        </div>
      </div>
    );
  }
}

export default PhoneAndEmailPanel;