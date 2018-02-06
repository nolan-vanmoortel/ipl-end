//@flow weak

import React, {
  PureComponent
}                     from 'react';
import PropTypes      from 'prop-types';
import styles         from './reportTable.scss';
import {Table, Icon, Switch, Radio, Form, Divider, Button, Input, Select} from 'antd';
const FormItem = Form.Item;

const expandedRowRender = record => <p>{record.description}</p>;
const showHeader = true;
const footer = () => 'Here is footer';


class ReportTable extends PureComponent {

  constructor(){
    super();
    for (let i = 1; i <= 9; i++) {
      this.state.data.push({
        key: i,
        date: '2018-02-06 19:21',
        etat: 'TODO',
        severite: 'Mineur',
        type: 'Hardware',
        local: '019',
        nom : `Machine ${i}`,
        admin : 'Jean Dupont',
        commentaire: 'Mon super rapport de bug !'
      });
    }
    this.state.data.push({
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
    this.state.dataReadOnly = this.state.data.slice(0);
  }

  state={
    data:[],
    dataReadOnly:[],
    sortedInfo:{},
    filteredInfo:{},
    searchText:'',
    filterDropdownVisible: false,
    filtered: false,
    selectedRowKeys: []
  }

  handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter
    });
  }

  handleChangeSelect = (value) => {
    console.log(`selected ${value}`);
  }

  onInputChange = (e) => {
    this.setState({ searchText: e.target.value });
  }

  onSearch = () => {
    const { searchText, data, dataReadOnly } = this.state;
    const reg = new RegExp(searchText, 'gi');
    this.setState({
      filterDropdownVisible: false,
      filtered: !!searchText,
      data: dataReadOnly.map((record) => {
        const match = record.nom.match(reg);
        if (!match) {
          return null;
        }
        return {
          ...record,
          nom: (
            <span>
              {record.nom.split(reg).map((text, i) => (
                i > 0 ? [<span className={styles.highlight}>{match[0]}</span>, text] : text
              ))}
            </span>
          )
        };
      }).filter(record => !!record)
    });
  }

  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }

  render() {
    const { sortedInfo, filteredInfo, data, selectedRowKeys } = this.state;
    const columns = [ {
      title: 'Local',
      dataIndex: 'local',
      key: 'local',
      sorter: (a, b) => a.local.localeCompare(b.local),
      sortOrder: sortedInfo.columnKey === 'local' && sortedInfo.order,
      width: 100
    },{
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      sorter: (a, b) => a.date.localeCompare(b.date),
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
      sorter: (a, b) => a.etat.localeCompare(b.etat),
      sortOrder: sortedInfo.columnKey === 'etat' && sortedInfo.order,
      width: 150
    }, {
      title: 'Sévérité',
      dataIndex: 'severite',
      key: 'severite',
      filters: [
        { text: 'Mineur', value: 'Mineur' },
        { text: 'Majeur', value: 'Majeur' }
      ],
      filteredValue: filteredInfo.severite || null,
      onFilter: (value, record) => record.severite.includes(value),
      sorter: (a, b) => a.severite.localeCompare(b.severite),
      sortOrder: sortedInfo.columnKey === 'severite' && sortedInfo.order,
      width: 150
    }, {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      filters: [
        { text: 'Hardware', value: 'Hardware' },
        { text: 'Software', value: 'Software' }
      ],
      filteredValue: filteredInfo.type || null,
      onFilter: (value, record) => record.type.includes(value),
      sorter: (a, b) => a.type.localeCompare(b.type),
      sortOrder: sortedInfo.columnKey === 'type' && sortedInfo.order,
      width: 150
    }, {
      title: 'Nom',
      dataIndex: 'nom',
      key: 'nom',
      sorter: (a, b) => a.nom.localeCompare(b.nom),
      sortOrder: sortedInfo.columnKey === 'nom' && sortedInfo.order,
      filterDropdown: (
        <div className={styles["custom-filter-dropdown"]} >
          <Input
            ref={ele => this.searchInput = ele}
            placeholder="Rechercher..."
            value={this.state.searchText}
            onChange={this.onInputChange}
            onPressEnter={this.onSearch}
          />
          <Button type="primary" onClick={this.onSearch}>Recherche</Button>
        </div>
      ),
      filterIcon: <Icon type="search" style={{ color: this.state.filtered ? '#108ee9' : '#aaa' }} />,
      filterDropdownVisible: this.state.filterDropdownVisible,
      onFilterDropdownVisibleChange: (visible) => {
        this.setState({
          filterDropdownVisible: visible,
        }, () => this.searchInput && this.searchInput.focus());
      },
      width: 250
    }, {
      title: 'Admin',
      dataIndex: 'admin',
      key: 'admin',
      sorter: (a, b) => a.admin.localeCompare(b.admin),
      sortOrder: sortedInfo.columnKey === 'admin' && sortedInfo.order,
      width: 200
    }, {
      title: 'Action',
      key: 'action',
      width: 200,
      render: () => (
        <span>
          <Select defaultValue="0" style={{ width: 120 }} onChange={this.handleChangeSelect}>
            <Select.Option value="0">TODO</Select.Option>
            <Select.Option value="1">DOING</Select.Option>
            <Select.Option value="2">DONE</Select.Option>
          </Select>
          <Button><Icon type="printer"/></Button>
    </span>
      )
    }];
    return (
      <div>
        <Table rowSelection={{selectedRowKeys, onChange: this.onSelectChange}} columns={columns} dataSource={data} expandedRowRender={record => <p style={{ margin: 0 }}>{record.commentaire}</p>} onChange={this.handleChange}/>
      </div>
    );
  }
}
export default ReportTable;
