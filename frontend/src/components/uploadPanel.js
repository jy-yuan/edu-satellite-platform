import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Upload, Icon, message, Input, Typography } from 'antd';
import axios from 'axios';
const { Dragger } = Upload;
const { Title } = Typography;

class UploadPanel extends Component {

  state = {
    loading: false,
    description: ""
  };

  onStart(file) {
    console.log('onStart', file, file.name);
  };

  onProgress = ({ percent }, file) => {
    console.log("progress");
    this.setState({ loading: true });
  };

  onSuccess = (res, file) => {
    console.log(res);
    console.log("success");
    this.setState({ loading: false });
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
    formData.append("program", file);
    formData.append("description", this.state.description);

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

  handleChange = e => {
    this.setState({ description: e.target.value });
  };


  render() {
    return (
      <div>
        <Title level={2}>{"☁️ 上传" + (this.props.api === 'postvideo' ? '视频' : '程序')}</Title>
        <Dragger
          name="file"
          action={"/api/" + this.props.api + "/"}
          accept={this.props.api === 'postvideo' ? 'video/*' : '.py'}
          onChange={this.handleChange}
          customRequest={this.customRequest}
          onProgress={this.onProgress}
          onSuccess={this.onSuccess}
          onStart={this.onStart}
          onError={this.onError}
        >
          <p className="ant-upload-drag-icon">
            <Icon type="inbox" />
          </p>
          <p className="ant-upload-text">{"点击或拖动以上传" + (this.props.api === 'postvideo' ? '视频' : '程序')}</p>
          <p className="ant-upload-hint">
          </p>
        </Dragger>
        <Input className='descript' placeholder={"请输入" + (this.props.api === 'postvideo' ? '视频' : '程序') + "描述"} onChange={this.handleChange}/>
        {this.props.api === 'postvideo' ? null : <a href="/templates/1.html">下载说明模板</a>}
      </div>
    );
  }

}

export default UploadPanel;