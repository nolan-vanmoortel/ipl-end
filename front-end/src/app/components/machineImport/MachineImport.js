// @flow weak
import React, {PureComponent} from 'react';
import PropTypes      from 'prop-types';
import {Button, Icon, Upload, Input} from "antd";
import getLocationOrigin from "../../services/utils/getLocationOrigin";
import {appConfig} from "../../config";

class MachineImport extends PureComponent {

  state = {
    file: null,
    location: ""
  };

// eslint-disable-next-line no-undef
  static propTypes = {
    uploadFile:  PropTypes.func
  };

  //handleChange = (e) => {
  //  this.setState({ file: e.target.value });
  //}

  onHandleInput= (e) =>{
    this.setState({ location: e.target.value });
  }


  render() {
    //const file = this.state.file
    return (
      <div>
        <Upload name="file"  action={getLocationOrigin()+'/'+appConfig.API.machines+'/import'}>
          <Button>
            <Icon type="upload" /> Envoyer les machines
          </Button>
        </Upload>
      </div>
    );

  }
}


export default MachineImport;
