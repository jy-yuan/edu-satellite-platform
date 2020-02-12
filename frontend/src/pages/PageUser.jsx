import React from "react";
import { Upload, Icon, message, Typography, Tabs } from 'antd';
import axios from 'axios';
import { Form, Input, Button, Checkbox } from 'antd';
import WrappedProfileForm from '../components/profile';
import WrappedPasswordForm from '../components/password';
import PhoneAndEmailPanel from '../components/phoneAndEmailPanel';
import './PageUser.css';
const { Title } = Typography;
const { TabPane } = Tabs;
// function getBase64(img, callback) {
//     const reader = new FileReader();
//     reader.addEventListener('load', () => callback(reader.result));
//     reader.readAsDataURL(img);
// }

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

class PageUser extends React.Component {
  state = {
    loading: false,
    username: 'testuser',
    email: '',
    mobile: '123',
    permission: '',
    imageUrl: ''
  };

  componentDidMount() {
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
            loading: false,
            username: msg['username'],
            email: msg['email'],
            mobile: msg['mobile'],
            permission: msg['permission'],
            imageUrl: msg['avatar'] === "media/avatars/default.svg" ? "" : msg['avatar']
          });
          console.log(this.state);
        }
      }
    );
  }

  handleSubmit = e => {

  };

  onStart = (file) => {
    console.log('onStart', file, file.name);
  };

  onProgress = ({ percent }, file) => {
    console.log("progress");
    this.setState({ loading: true });
  };

  onSuccess = (res, file) => {
    console.log(res);
    console.log("success");
    this.setState({ loading: false, imageUrl: res.Message });
    message.success("上传成功");
  };

  onError = (err) => {
    console.log('onError', err);
    message.error("上传失败");
  };


  customRequest = ({ action,
    data,
    file,
    filename,
    headers,
    onError,
    onProgress,
    onSuccess,
    withCredentials, }) => {

    const formData = new FormData();
    formData.append("avatar", file);

    axios
      .post(action, formData, {
        withCredentials,
        headers,
        onUploadProgress: ({ total, loaded }) => {
          onProgress({ percent: Math.round(loaded / total * 100).toFixed(2) }, file);
        },
      })
      .then(({ data: response }) => {
        onSuccess(response, file);
      })
      .catch(onError);

    return {
      abort() {
        console.log('upload progress is aborted.');
      },
    };
  }


  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { imageUrl } = this.state;
    return (
      <div>
        <Tabs defaultActiveKey="1" tabPosition="left">
          <TabPane tab="用户信息" key="1">
            <Title level={2}>ℹ️ 用户信息</Title>
            <Upload
              name="avatar"
              accept="image/jpeg, image/png"
              listType="picture-card"
              className="avatar-uploader"
              action="/api/postavatar/"
              beforeUpload={beforeUpload}
              customRequest={this.customRequest}
              onProgress={this.onProgress}
              onSuccess={this.onSuccess}
              onError={this.onError}
              onStart={this.onStart}
            >
              {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
            <WrappedProfileForm username={this.state.username} mobile={this.state.mobile} email={this.state.email} />
          </TabPane>
          <TabPane tab="手机号和电子邮件" key="2">
            <Title level={2}>📱📧 手机号和电子邮件</Title>
            <PhoneAndEmailPanel mobile={this.state.mobile} email={this.state.email} />
          </TabPane>
          <TabPane tab="密码" key="3">
            <Title level={2}>🔑 密码</Title>
            <WrappedPasswordForm />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default PageUser;