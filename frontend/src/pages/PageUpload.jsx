import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Upload, Icon, message } from 'antd';
import UploadPanel from '../components/uploadPanel';
const { Dragger } = Upload;

class PageUpload extends Component {

  render() {
    return(
      <div>
        <UploadPanel api="postprogram" />
      </div>
    );
  }

}

export default PageUpload;