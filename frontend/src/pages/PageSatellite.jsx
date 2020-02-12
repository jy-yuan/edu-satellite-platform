import React from "react";
import { Upload, Icon, message, Typography, Tabs } from 'antd';
import './PageSatellite.css';
import ThreeMap from '../components/ThreeMap';
const { Title } = Typography;
const { TabPane } = Tabs;

class PageSatellite extends React.Component {
  componentDidMount = () => {

  };

  render() {
    return (
      <div>
        <ThreeMap></ThreeMap>
      </div>
    );
  }
}

export default PageSatellite;