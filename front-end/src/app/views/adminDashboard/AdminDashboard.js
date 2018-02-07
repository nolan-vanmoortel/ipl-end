// @flow weak

import React, {
  PureComponent
}                     from 'react';
import PropTypes      from 'prop-types';
import {Col, Divider, Row, Table, Icon, Switch, Radio, Form} from "antd";
import {MachineImport} from "../../components";
import ReportTable from "../../components/reportTable/ReportTable";

class AdminDashboard extends PureComponent{
  static propTypes = {
    match:    PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history:  PropTypes.object.isRequired,

    currentView:  PropTypes.string.isRequired,
    enterAdminDashboard:    PropTypes.func.isRequired,
    leaveAdminDashboard:    PropTypes.func.isRequired,

    uploadFile:         PropTypes.func.isRequired,
    machines:           PropTypes.array.isRequired
  }

  componentDidMount() {
    const { enterAdminDashboard } = this.props;
    enterAdminDashboard();
  }

  componentWillUnmount() {
    const { leaveAdminDashboard } = this.props;
    leaveAdminDashboard();

  }

  render(){
    const {
      uploadFile,
      machines
    } = this.props;

    return(
      <div>
        <Row>
          <Col span={6} ></Col>
          <Col xs={{span:12}} md={{span:6, offset:3}} style={{textAlign:"center"}}>
            <MachineImport uploadFile={uploadFile}/>
          </Col>
        </Row>
        <Divider />
        <Row>
        <Col span={24} >
          <ReportTable machines={machines}/>
        </Col>
        </Row>
      </div>
    );
  }


}

export default AdminDashboard;
