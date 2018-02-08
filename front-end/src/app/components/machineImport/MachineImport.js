// @flow weak
import React from 'react';
import PropTypes      from 'prop-types';
import {Button, Icon, Upload, Row, Col } from 'antd';
import getLocationOrigin from '../../services/utils/getLocationOrigin';
import {appConfig} from '../../config';

const MachineImport =({
    onRemove,
    beforeUpload,
    handleUpload,
    fileList,
    uploading
}) => {
  const props = {
    action: getLocationOrigin()+'/'+appConfig.API.machines+'/import',
    onRemove,
    beforeUpload,
    fileList
  };
  return (
      <Row >
        <Col xs={{span:24}} md={{span:10}} style={{marginRight: 100, textAlign:'center'}}>
        <Upload {...props}>
          <Button
            disabled={fileList.length >= 1}
          >
            <Icon type="upload"/> Ajouter un fichier
          </Button>
        </Upload>
        </Col>
        <Col span={1}>
        <Button
          type="primary"
          onClick={handleUpload}
          disabled={fileList.length !== 1}
          loading={uploading}
        >
          {uploading ? 'Envoi' : 'Envoyer le fichier' }
        </Button>
        </Col>
      </Row>

  );
};

MachineImport.propTypes = {
  onRemove: PropTypes.func.isRequired,
  beforeUpload: PropTypes.func.isRequired,
  handleUpload: PropTypes.func.isRequired,
  fileList: PropTypes.array.isRequired,
  uploading: PropTypes.bool.isRequired
};


export default MachineImport;
