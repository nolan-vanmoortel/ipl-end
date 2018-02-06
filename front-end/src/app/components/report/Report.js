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

const PopoverContent = (
  <div>
    <p>La description est obligatoire</p>
  </div>
);

const Report = ({
                  getFieldDecorator,
                  model,
                  config,
                  handleSubmit,
                  handleModelChange,
  formError
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
        {getFieldDecorator('switch', { valuePropName: 'severity' })(
          <Switch checkedChildren="Majeur" unCheckedChildren="Mineur" />
        )}
      </FormItem>
      <FormItem>
        {getFieldDecorator('radio-group')(
          <RadioGroup style={{borderColor: '#1990ff'}} >
            <RadioButton style={{borderColor: '#1990ff'}} value="1">Hardware</RadioButton>
            <RadioButton style={{borderColor: '#1990ff'}} value="2">Software</RadioButton>
          </RadioGroup>
        )}
      </FormItem>

      <FroalaEditor
        tag="textarea"
        model={model}
        onModelChange={handleModelChange}
        config={config}
      />
      <Popover placement="right" content={PopoverContent} visible={formError}>
        <Button type="primary" htmlType="submit" className="login-form-button" style={{marginTop: 10}}>
          Envoyer
        </Button>
      </Popover>
    </Form>
  );
};

Report.propTypes = {
  getFieldDecorator:  PropTypes.func.isRequired,
  handleSubmit:       PropTypes.func.isRequired,
  handleModelChange:  PropTypes.func.isRequired,
  model:              PropTypes.string.isRequired,
  config:             PropTypes.object.isRequired,
  formError:          PropTypes.bool.isRequired
};

export default Report;
