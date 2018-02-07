import React from 'react';
import PropTypes from 'prop-types';
import { Form, Icon, Input, Button } from 'antd';

const FormItem = Form.Item;

const MachineManual = ({
                         getFieldDecorator,
                         handleSubmit

 }) => {
  return (
    <Form onSubmit={handleSubmit}>
      <h1>Soumission d'une nouvelle machine</h1>
      <FormItem>
        {getFieldDecorator('name', {
          rules: [{ required: true, message: 'Introduisez le nom de la machine'}]
        })(
          <Input prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Nom de la machine" />
        )}
      </FormItem>
      <FormItem>
        {getFieldDecorator('ip', {
          rules: [{ required: true, message: 'Introduisez l\'IP de la machine'}]
        })(
          <Input prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="IP de la machine" />
        )}
      </FormItem>
      <FormItem>
        {getFieldDecorator('mac', {
          rules: [{ required: true, message: 'Introduisez la MAC de la machine'}]
        })(
          <Input prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="MAC de la machine" />
        )}
      </FormItem>
      <FormItem>
        {getFieldDecorator('location', {
          rules: [{ required: true, message: 'Introduisez la salle ou se situe la machine'}]
        })(
          <Input prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Salle de la machine" />
        )}
      </FormItem>
      <FormItem>
        {getFieldDecorator('comment', {
          rules: [{ required: true, message: 'Introduisez un commentaire pour la machine'}]
        })(
          <Input prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Commentaire sur la machine" />
        )}
      </FormItem>
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
