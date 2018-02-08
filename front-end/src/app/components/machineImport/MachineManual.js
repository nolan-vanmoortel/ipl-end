import React from 'react';
import PropTypes from 'prop-types';
import { Form, Icon, Input, Button, Row, Col } from 'antd';

const FormItem = Form.Item;

const MachineManual = ({
                         getFieldDecorator,
                         handleSubmit

                       }) => {
  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col lg={5} md={23} xs={24} style = {{marginRight: 10}}>
          <FormItem>
            {getFieldDecorator('name', {
              rules: [{ required: true, message: 'Introduisez le nom de la machine'}]
            })(
              <Input prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Nom" />
            )}
          </FormItem>
        </Col>
        <Col lg={4} md={11} xs={24} style = {{marginRight: 10}}>
          <FormItem>
            {getFieldDecorator('ip', {
              rules: [{ required: true, message: 'Introduisez l\'IP de la machine'}]
            })(
              <Input prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="IP" />
            )}
          </FormItem>
        </Col>
        <Col lg={4} md={11} xs={24} style = {{marginRight: 10}}>
          <FormItem>
            {getFieldDecorator('mac', {
              rules: [{ required: true, message: 'Introduisez la MAC de la machine'}]
            })(
              <Input prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="MAC" />
            )}
          </FormItem>
        </Col>
        <Col lg={4} md={11} xs={24} style = {{marginRight: 10}}>
          <FormItem>
            {getFieldDecorator('location', {
              rules: [{ required: true, message: 'Introduisez la salle ou se situe la machine'}]
            })(
              <Input prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Salle" />
            )}
          </FormItem>
        </Col>
        <Col lg={5} md={11} xs={24} style = {{marginRight: 10}}>
          <FormItem>
            {getFieldDecorator('comment', {
              rules: [{ required: true, message: 'Introduisez un commentaire pour la machine'}]
            })(
              <Input prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Commentaire" />
            )}
          </FormItem>
        </Col>
      </Row>
      <Button type="primary" htmlType="submit">
        Envoyer
      </Button>

    </Form>
  );
};

MachineManual.propTypes = {
  getFieldDecorator: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

export default MachineManual;
