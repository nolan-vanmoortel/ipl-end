// @flow weak

import React, {
  PureComponent
}                     from 'react';
import PropTypes      from 'prop-types';
import {Col, Divider, Row, Table, Icon, Switch, Radio, Form} from "antd";
import {MachineImport} from "../../components";
import ReportTable from "../../components/reportTable/ReportTable";
import MachineManual from "../../components/machineImport/MachineManual";

class AdminDashboard extends PureComponent{
  static propTypes = {
    match:    PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history:  PropTypes.object.isRequired,

    currentView:  PropTypes.string.isRequired,
    enterAdminDashboard:    PropTypes.func.isRequired,
    leaveAdminDashboard:    PropTypes.func.isRequired,

    uploadFile:         PropTypes.func.isRequired,
    machines:           PropTypes.array.isRequired,
    form:               PropTypes.object.isRequired,
    manual:             PropTypes.object.isRequired
};

  componentDidMount() {
    const { enterAdminDashboard } = this.props;
    enterAdminDashboard();
  }

  componentWillUnmount() {
    const { leaveAdminDashboard } = this.props;
    leaveAdminDashboard();

  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err,values) => {
      if(!err){
        const machine = {
          name: values.name,
          ip: values.ip,
          mac: values.mac,
          location: values.location,
          comment: values.comment
        }
        const {manual} = this.props;
        manual(machine);
      }
    });
  }


  render(){
    const {
      uploadFile,
      machines
    } = this.props;

    const { getFieldDecorator } = this.props.form;

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
          <Col>
            <MachineManual getFieldDecorator={getFieldDecorator} handleSubmit={this.handleSubmit}/>
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

export default Form.create()(AdminDashboard);
