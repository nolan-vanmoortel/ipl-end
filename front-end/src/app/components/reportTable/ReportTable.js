//@flow weak

import React, {
  PureComponent
}                     from 'react';
import PropTypes      from 'prop-types';
import {Table, Icon, Switch, Radio, Form, Divider, Button} from 'antd';
const FormItem = Form.Item;

const data = [];
for (let i = 1; i <= 9; i++) {
  data.push({
    key: i,
    date: '2018-02-06 19:21',
    etat: 'TODO',
    severite: 'Mineur',
    type: 'Hardware',
    local: '019',
    nom : `Machine ${i}`,
    admin : 'Jean Dupont',
    commentaire: 'blabla'
  });
}
data.push({
  key: 11,
  date: '2018-02-08 19:22',
  etat: 'DOING',
  severite: 'Majeur',
  type: 'Software',
  local: '020',
  nom : 'Machine 11',
  admin : 'Jean Dupont',
  commentaire: 'blabla'
});

const expandedRowRender = record => <p>{record.description}</p>;
const showHeader = true;
const footer = () => 'Here is footer';


class ReportTable extends PureComponent {

  state={
    sortedInfo:{},
    filteredInfo:{}
  }
  handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter
    });
  }
  render() {
    const { sortedInfo, filteredInfo } = this.state;
    const columns = [{
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      sorter: (a, b) => a.date.length - b.date.length,
      sortOrder: sortedInfo.columnKey === 'date' && sortedInfo.order,
      width: 250
    }, {
      title: 'Etat',
      dataIndex: 'etat',
      key: 'etat',
      filters: [
        { text: 'TODO', value: 'TODO' },
        { text: 'DOING', value: 'DOING' },
        { text: 'DONE', value: 'DONE' }
      ],
      filteredValue: filteredInfo.etat || null,
      onFilter: (value, record) => record.etat.includes(value),
      sorter: (a, b) => a.etat.length - b.etat.length,
      sortOrder: sortedInfo.columnKey === 'etat' && sortedInfo.order,
      width: 150
    }, {
      title: 'Sévérité',
      dataIndex: 'severite',
      key: 'severite',
      width: 150
    }, {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      width: 150
    }, {
      title: 'Local',
      dataIndex: 'local',
      key: 'local',
      width: 100
    }, {
      title: 'Nom',
      dataIndex: 'nom',
      key: 'nom',
      width: 200
    }, {
      title: 'Admin',
      dataIndex: 'admin',
      key: 'admin',
      width: 350
    }, {
      title: 'Action',
      key: 'action',
      width: 360,
      render: () => (
        <span>
        <Button><Icon type="printer"/></Button>
    </span>
      )
    }];
    return (
      <div>
        <Table columns={columns} dataSource={data} onChange={this.handleChange}/>
      </div>
    );
  }
}
export default ReportTable;
