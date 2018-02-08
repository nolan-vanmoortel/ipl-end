//@flow weak

import React, {
  PureComponent
}                     from 'react';
import PropTypes      from 'prop-types';
import styles         from './reportTable.scss';
import {Table, Icon, Button, Input, Select} from 'antd';
import ReportViewer from './reportViewer/ReportViewer';

class ReportTable extends PureComponent {

  static propTypes = {
    users:                PropTypes.array.isRequired,
    machines:                PropTypes.array.isRequired,
    setStateReport:       PropTypes.func.isRequired,
    setAdminReport:       PropTypes.func.isRequired
  };

  state={
    intToState:['TODO', 'DOING', 'DONE'],
    intToSeverite:['Mineur', 'Majeur'],
    intToType:['', 'Software', 'Hardware'],

    data:[],
    dataReadOnly:[],
    sortedInfo:{},
    filteredInfo:{},
    searchText:'',
    filterDropdownVisible: false,
    filtered: false,

    listOptionUser: []
  };

  componentDidUpdate() {
    const { machines, users }  = this.props;

    this.fillTable(machines);
    this.updateListAdmin(users);
  }

  componentWillMount() {
    const { machines, users }  = this.props;

    this.fillTable(machines);
    this.updateListAdmin(users);
  };

  fillTable = (machines) =>{
    const { data, intToSeverite, intToState, intToType }  = this.state;
    const reportTable = [];

    let haveReport = false;
    machines.forEach((elem)=>{
      if(elem.reports.length > 0) {
        haveReport = true;
        return true;
      }
      return false;
    });

    if(!(machines.length !== 0 && data.length === 0 && haveReport))
      return;

    machines.map((machine)=>{
      machine.reports.map((report)=>{
        reportTable.push({
          key: machine.name+';'+report.date,
          date: report.date,
          etat: intToState[report.state],
          severite: intToSeverite[report.severity],
          type:intToType[report.type],
          local: machine.location,
          nom: machine.name,
          admin: report.emailAdmin.split('@')[0].replace('.', ' '),
          commentaire: <ReportViewer name={machine.name} mac={machine.mac} commentMachine={machine.comment} commentReport={report.comment} email={report.email} ip={machine.ip}/>
        });
      });
    });

    this.setState({data:reportTable.slice(0), dataReadOnly:reportTable.slice(0)});
  };

  updateListAdmin = (users)=>{
    const {listOptionUser} = this.state;
    const listUsers = [];

    if(!(users.length !== 0 && listOptionUser.length === 0))
      return;

    users.map((user)=>{
      listUsers.push(<Select.Option key={'option'+user.email} value={user.email}>{user.email.split('@')[0].replace('.', ' ')}</Select.Option>);
    });

    this.setState({listOptionUser:listUsers});
  };

  /*
    *HANDLE CHANGE
   */
  handleChange = (pagination, filters, sorter) => {
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter
    });
  };

  handleChangeSelectState = (record, value) => {
    const { setStateReport } = this.props;
    const { data, intToState } = this.state;
    const _data = data.slice(0);

    data.forEach((elem, index)=>{
      if(elem.key === record.key) {
        _data[index].etat = intToState[value];
        return true;
      }
      return false;
    });

    setStateReport(record.key.split(';')[0], record.date, value)
      .then(()=>{
        this.setState({data:_data});
      });
  };

  handleChangeSelectAdmin = (record, value) => {
    const { setAdminReport } = this.props;
    const { data} = this.state;
    const _data = data.slice(0);

    data.forEach((elem, index)=>{
      if(elem.key === record.key) {
        _data[index].admin = value.split('@')[0].replace('.', ' ');
        return true;
      }
      return false;
    });

    setAdminReport(record.key.split(';')[0], record.date, value)
      .then(()=>{
        this.setState({data:_data});
      });
  };

  onInputChange = (e) => {
    this.setState({ searchText: e.target.value });
  };

  onSearch = () => {
    const { searchText, dataReadOnly } = this.state;
    const reg = new RegExp(searchText, 'gi');

    this.setState({
      filterDropdownVisible: false,
      filtered: !!searchText,
      data: dataReadOnly.map((record) => {
        const match = record.nom.match(reg);

        if (!match)
          return null;

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
  };

  /*
    * RENDER
   */
  render() {
    const { sortedInfo, filteredInfo, data, listOptionUser } = this.state;

    const columns = [ {
      title: 'Local',
      dataIndex: 'local',
      key: 'local',
      filters: [
        { text: '017', value: '017' },
        { text: '019', value: '019' },
        { text: '020', value: '020' },
        { text: '025', value: '025' },
        { text: '026', value: '026' }
      ],
      filteredValue: filteredInfo.local || null,
      onFilter: (value, record) => record.local.includes(value),
      sorter: (a, b) => a.local.localeCompare(b.local),
      sortOrder: sortedInfo.columnKey === 'local' && sortedInfo.order,
      width: 100
    }, {
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
      title: 'Machine',
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
          <Button type="primary" onClick={this.onSearch} >Recherche</Button>
        </div>
      ),
      filterIcon: <Icon type="search" style={{ color: this.state.filtered ? '#108ee9' : '#aaa' }} />,
      filterDropdownVisible: this.state.filterDropdownVisible,
      onFilterDropdownVisibleChange: (visible) => {
        this.setState({
          filterDropdownVisible: visible
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
      width: 350,
      render: (text, record) => (
        <span>
          <Select placeholder="Etat" style={{ width: 120, marginRight:5 }} onChange={(value)=>{this.handleChangeSelectState(record,value)}}>
            <Select.Option value="0">TODO</Select.Option>
            <Select.Option value="1">DOING</Select.Option>
            <Select.Option value="2">DONE</Select.Option>
          </Select>
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Select Admin"
            optionFilterProp="children"
            onChange={(value)=>{this.handleChangeSelectAdmin(record,value)}}
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
            {listOptionUser}
          </Select>
    </span>
      )
    }];

    return (
      <div>
        <Table scroll={{ x: 1300 }} columns={columns} dataSource={data} expandedRowRender={record => <p style={{ margin: 0 }}>{record.commentaire}</p>} onChange={this.handleChange}/>
      </div>
    );
  }
}
export default ReportTable;
