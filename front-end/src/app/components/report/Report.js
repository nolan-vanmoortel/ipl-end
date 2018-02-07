// @flow weak

import React from 'react';
import PropTypes from 'prop-types';

import styles from './report.scss';

import 'froala-editor/js/froala_editor.pkgd.min';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

import { Form, Input, Button, Icon, Row, Col, Switch, Radio, Popover } from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

import 'font-awesome/css/font-awesome.css';

import FroalaEditor from 'react-froala-wysiwyg';
import { appConfig } from '../../config';

const Report = ({
                  getFieldDecorator,
                  model,
                  config,
                  handleSubmit,
                  handleModelChange,
                  loading
})=>{
  return (
    <Form onSubmit={handleSubmit}>
      <h1>Soumission d'un problème : </h1>
      <Row>
        <Col xs={{ span:24 }} lg={{ span:8 }}>
          <FormItem>
            {getFieldDecorator('email', {
              rules: [{
                type: 'email', message: 'E-mail non-valide!'
              }, {
                required: true, message: 'Veuillez entrer votre e-mail !'
              }]
            })(
              <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="E-Mail *" />
            )}
          </FormItem>
        </Col>
      </Row>
      <FormItem>
        {getFieldDecorator('severity', { valuePropName: 'severity' })(
          <Switch defaultChecked={false} checkedChildren="Majeur" unCheckedChildren="Mineur" />
        )}
      </FormItem>
      <FormItem>
        {getFieldDecorator('type')(
          <RadioGroup style={{borderColor: '#1990ff'}} >
            <RadioButton style={{borderColor: '#1990ff'}} value={appConfig.MACHINE_TYPES.hardware}>Hardware</RadioButton>
            <RadioButton style={{borderColor: '#1990ff'}} value={appConfig.MACHINE_TYPES.software}>Software</RadioButton>
          </RadioGroup>
        )}
      </FormItem>
      <FroalaEditor
        tag="textarea"
        model={model}
        onModelChange={handleModelChange}
        config={config}
      />
      <Button loading={loading} type="primary" htmlType="submit" className="login-form-button" style={{marginTop: 10}}>
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
  config:             PropTypes.object.isRequired,
  loading:            PropTypes.bool.isRequired
};

export default Report;
