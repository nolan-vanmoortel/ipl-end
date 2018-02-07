// @flow weak
import React from 'react';
import PropTypes      from 'prop-types';
import {Button, Icon, Upload } from 'antd';
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
      <div>
        <Upload {...props}>
          <Button>
            <Icon type="upload" disabled={fileList.length === 1}/> Ajouter un fichier
          </Button>
        </Upload>
        <Button
          type="primary"
          onClick={handleUpload}
          disabled={fileList.length !== 1}
          loading={uploading}
        >
          {uploading ? 'Envoi' : 'Envoyer le fichier' }
        </Button>
      </div>
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
