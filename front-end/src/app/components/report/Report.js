// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import 'froala-editor/js/froala_editor.pkgd.min';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import { Form, Input, Button, Icon } from 'antd';
const FormItem = Form.Item;

import 'font-awesome/css/font-awesome.css';

import FroalaEditor from 'react-froala-wysiwyg';


const Report = ({
  getFieldDecorator,
  model,
  config,
  handleSubmit,
  handleModelChange
})=>{
  return (
    <Form onSubmit={handleSubmit}>
      <FormItem>
        {getFieldDecorator('email', {
          rules: [{
            type: 'email', message: 'E-mail non-valide!'
          }, {
            required: true, message: 'Veuillez entrer votre e-mail !'
          }]
        })(
          <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="E-Mail" />
        )}
      </FormItem>
      <FroalaEditor
        tag="textarea"
        model={model}
        onModelChange={handleModelChange}
        config={config}/>
      <Button type="primary" htmlType="submit" className="login-form-button" style={{marginTop:10}}>
        Envoyer
      </Button>
    </Form>
  );
};

Report.propTypes = {
  getFieldDecorator:  PropTypes.func.isRequired,
  handleSubmit:       PropTypes.func.isRequired,
  handleModelChange:  PropTypes.func.isRequired,
  model:              PropTypes.string.isRequired,
  config:             PropTypes.object.isRequired
};

export default Report;