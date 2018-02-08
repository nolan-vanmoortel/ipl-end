/* eslint-disable no-undef */
// @flow weak

import React, {
  PureComponent
}                     from 'react';
import PropTypes      from 'prop-types';
import {Col, Divider, Row, Form, notification} from 'antd';
import {MachineImport} from '../../components';
import ReportTable from '../../components/reportTable/ReportTable';
import MachineTable from '../../components/machineTable/MachineTable';
import MachineManual from '../../components/machineImport/MachineManual';

class AdminDashboard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      location: '',
      fileList: [],
      uploading: false
    };
  }

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
    manual:             PropTypes.func.isRequired,

    toggleUploadError:    PropTypes.func.isRequired,
    uploadError:          PropTypes.bool.isRequired,
    toggleUploadSuccess:  PropTypes.func.isRequired,
    uploadSuccess:        PropTypes.bool.isRequired,

    getUsers:             PropTypes.func.isRequired,
    users:                PropTypes.array.isRequired,
    setStateReport:       PropTypes.func.isRequired,
    setAdminReport:       PropTypes.func.isRequired

  };

  componentDidMount() {
    const { enterAdminDashboard, getUsers } = this.props;
    enterAdminDashboard();
    getUsers();
  }

  componentWillUnmount() {
    const { leaveAdminDashboard } = this.props;
    leaveAdminDashboard();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if(!err) {
        const machine = {
          name: values.name,
          ip: values.ip,
          mac: values.mac,
          location: values.location,
          comment: values.comment
        };
        const {manual} = this.props;
        manual(machine);
      }
    });
  };

  onRemove = (file) => {
    const { fileList } = this.state;
    const index = fileList.indexOf(file);
    const newFileList = fileList.slice();
    newFileList.splice(index, 1);
    this.setState({ fileList: newFileList });
  };

  beforeUpload = (file) => {
    const txt = /^ipscan....*txt$/;
    const csv = /^ipscan....*csv$/;
    if(!txt.test(file.name) && !csv.test(file.name)){
      this.openErrorNotificationWithDescription('Erreur avec le fichier',
        'Veuillez choisir un fichier txt ou csv commençant par ipscan');
      this.onRemove(file);
    }else{
      this.setState(({ fileList }) => ({
        fileList: [...fileList, file]
      }));
    }
    return false;
  };

  handleUpload = () => {
    const { fileList } = this.state;
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append('file', file);
    });
    this.setState({ uploading:true });
    const { uploadFile } = this.props;
    uploadFile(formData);
  };

  openErrorNotification = (comment) => {
    notification.error({
      message: comment
    });
  };

  openErrorNotificationWithDescription = (comment, description) => {
    notification.error({
      message: comment,
      description: description
    });
  };

  openSuccessNotification = (comment) => {
    notification.success({
      message: comment
    });
  };

  componentDidUpdate() {
    const { uploadError, toggleUploadError,
      uploadSuccess, toggleUploadSuccess} = this.props;
    if(uploadError) {
      this.openErrorNotification('Une erreur est survenue');
      toggleUploadError();
      this.setState({ uploading: false });
    }
    if(uploadSuccess) {
      if(this.state.file === null){
        this.openSuccessNotification('La machine a bien été enregistrée')
      }else{
        this.openSuccessNotification('Le fichier a bien ete envoyé');
      }
      toggleUploadSuccess();
      this.setState({ uploading: false });
    }
  }

  render() {
    const {
      machines,
      setStateReport,
      users,
      setAdminReport
    } = this.props;

    const { getFieldDecorator } = this.props.form;

    const { fileList, uploading } = this.state;

    return(
      <div>
        <Row>
          <Col span={6}  />
          <Col xs={{span:12}} md={{span:6, offset:3}} style={{textAlign:'center'}}>
            <MachineImport
              onRemove={this.onRemove}
              beforeUpload={this.beforeUpload}
              handleUpload={this.handleUpload}
              fileList={fileList}
              uploading={uploading}/>
          </Col>
        </Row>
        <Divider />
        <Row>
          <h3>Soumission d'une nouvelle machine</h3>
          <Col>
            <MachineManual getFieldDecorator={getFieldDecorator} handleSubmit={this.handleSubmit} />
          </Col>
        </Row>
        <Divider />
        <Row>
          <Col span={24} >
            <MachineTable machines={machines}/>
          </Col>
        </Row>
        <Divider />
        <Row>
        <Col span={24} >
          <ReportTable setAdminReport={setAdminReport} users={users} setStateReport={setStateReport} machines={machines}/>
        </Col>
        </Row>
      </div>
    );
  }


}

export default Form.create()(AdminDashboard);
