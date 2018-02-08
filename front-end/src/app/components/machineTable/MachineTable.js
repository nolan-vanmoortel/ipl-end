//@flow weak

import React, {
  PureComponent
}                     from 'react';
import PropTypes      from 'prop-types';
import styles         from './machineTable.scss';
import {Table, Icon, Button, Input, Switch} from 'antd';
import QRCode from 'qrcode';
import jspdf from 'jspdf';
import {generatePDF} from '../../services/utils/generatePDF';

class MachineTable extends PureComponent {

  static propTypes = {
    machines:                 PropTypes.array.isRequired,
    setStateMachine:            PropTypes.func.isRequired
  };

  state={
    data:[],
    dataReadOnly:[],
    sortedInfo:{},
    filteredInfo:{},
    searchTextName:'',
    searchTextIp:'',
    searchTextMac:'',
    filterDropdownVisibleName: false,
    filterDropdownVisibleIp: false,
    filterDropdownVisibleMac: false,
    filtered: false,
    selectedRowKeys: [],

    toPrint: [],
    listOptionUser: []
  };

  componentDidUpdate() {
    const { machines}  = this.props;

    this.fillTable(machines);
  }

  componentWillMount() {
    const { machines}  = this.props;

    this.fillTable(machines);
  }

  fillTable = (machines) =>{
    const { data }  = this.state;
    const reportTable = [];


    if (!(machines.length !== 0 && data.length === 0))
      return;

    machines.map((machine)=>{
      reportTable.push({
        key: machine.name,
        local: machine.location,
        nom: machine.name,
        ip: machine.ip,
        mac: machine.mac,
        etat: machine.state?"Activée":"Désactivée"
      });
    });

    this.setState({data:reportTable.slice(0), dataReadOnly:reportTable.slice(0)});
  };

  /*
    *HANDLE CHANGE
   */
  handleSwitchState = (record, value) =>{
    const { setStateMachine } = this.props;
    const { data } = this.state;
    const _data = data.slice(0);

    data.forEach((elem, index)=>{
      if(elem.key === record.key) {
        _data[index].etat = value?'Activée':'Désactivée';
        return true;
      }
      return false;
    });

    setStateMachine(record.key, value)
      .then(()=>{
        this.setState({data:_data});
      });
  };

  handleChange = (pagination, filters, sorter) => {
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter
    });
  };

  onPrint = (selectedRowKeys) => {
    generatePDF(selectedRowKeys);
  };


  onSearchName = () => {
    const { searchTextName, dataReadOnly } = this.state;
    const reg = new RegExp(searchTextName, 'gi');

    this.setState({
      filterDropdownVisibleName: false,
      filtered: !!searchTextName,
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

  onSearchIp = () => {
    const { searchTextIp, dataReadOnly } = this.state;
    const reg = new RegExp(searchTextIp, 'gi');

    this.setState({
      filterDropdownVisibleIp: false,
      filtered: !!searchTextIp,
      data: dataReadOnly.map((record) => {
        const match = record.ip.match(reg);

        if (!match)
          return null;

        return {
          ...record,
          ip: (
            <span>
              {record.ip.split(reg).map((text, i) => (
                i > 0 ? [<span className={styles.highlight}>{match[0]}</span>, text] : text
              ))}
            </span>
          )
        };
      }).filter(record => !!record)
    });
  };

  onSearchMac = () => {
    const { searchTextMac, dataReadOnly } = this.state;
    const reg = new RegExp(searchTextMac, 'gi');

    this.setState({
      filterDropdownVisibleMac: false,
      filtered: !!searchTextMac,
      data: dataReadOnly.map((record) => {
        const match = record.mac.match(reg);

        if (!match)
          return null;

        return {
          ...record,
          mac: (
            <span>
              {record.mac.split(reg).map((text, i) => (
                i > 0 ? [<span className={styles.highlight}>{match[0]}</span>, text] : text
              ))}
            </span>
          )
        };
      }).filter(record => !!record)
    });
  };

  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }

  /*
    * RENDER
   */
  render() {
    const { sortedInfo, filteredInfo, data, selectedRowKeys} = this.state;
    const hasSelected = selectedRowKeys.length > 0;

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
            value={this.state.searchTextName}
            onChange={(e)=>{this.setState({ searchTextName: e.target.value })}}
            onPressEnter={this.onSearchName}
          />
          <Button type="primary" onClick={this.onSearchName} >Recherche</Button>
        </div>
      ),
      filterIcon: <Icon type="search" style={{ color: this.state.filtered ? '#108ee9' : '#aaa' }} />,
      filterDropdownVisible: this.state.filterDropdownVisibleName,
      onFilterDropdownVisibleChange: (visible) => {
        this.setState({
          filterDropdownVisibleName: visible
        }, () => this.searchInput && this.searchInput.focus());
      },
      width: 250
    }, {
      title: 'IP',
      dataIndex: 'ip',
      key: 'ip',
      sorter: (a, b) => a.nom.localeCompare(b.nom),
      sortOrder: sortedInfo.columnKey === 'ip' && sortedInfo.order,
      filterDropdown: (
        <div className={styles["custom-filter-dropdown"]} >
          <Input
            ref={ele => this.searchInput = ele}
            placeholder="Rechercher..."
            value={this.state.searchTextIp}
            onChange={(e)=>{this.setState({ searchTextIp: e.target.value })}}
            onPressEnter={this.onSearchIp}
          />
          <Button type="primary" onClick={this.onSearchIp} >Recherche</Button>
        </div>
      ),
      filterIcon: <Icon type="search" style={{ color: this.state.filtered ? '#108ee9' : '#aaa' }} />,
      filterDropdownVisible: this.state.filterDropdownVisibleIp,
      onFilterDropdownVisibleChange: (visible) => {
        this.setState({
          filterDropdownVisibleIp: visible
        }, () => this.searchInput && this.searchInput.focus());
      },
      width: 250
    },   {
      title: 'MAC',
      dataIndex: 'mac',
      key: 'mac',
      sorter: (a, b) => a.nom.localeCompare(b.nom),
      sortOrder: sortedInfo.columnKey === 'mac' && sortedInfo.order,
      filterDropdown: (
        <div className={styles["custom-filter-dropdown"]} >
          <Input
            ref={ele => this.searchInput = ele}
            placeholder="Rechercher..."
            value={this.state.searchTextMac}
            onChange={(e)=>{this.setState({ searchTextMac: e.target.value })}}
            onPressEnter={this.onSearchMac}
          />
          <Button type="primary" onClick={this.onSearchMac} >Recherche</Button>
        </div>
      ),
      filterIcon: <Icon type="search" style={{ color: this.state.filtered ? '#108ee9' : '#aaa' }} />,
      filterDropdownVisible: this.state.filterDropdownVisibleMac,
      onFilterDropdownVisibleChange: (visible) => {
        this.setState({
          filterDropdownVisibleMac: visible
        }, () => this.searchInput && this.searchInput.focus());
      },
      width: 250
    }, {
      title: 'Etat',
      dataIndex: 'etat',
      key: 'etat',
      sorter: (a, b) => a.etat.localeCompare(b.etat),
      sortOrder: sortedInfo.columnKey === 'etat' && sortedInfo.order,
      render: (text, record) => (
        <Switch style={{marginRight:'15px'}} defaultChecked={record.etat==='Activée'} checkedChildren="Activée" unCheckedChildren="Désactivée" onChange={(value)=>{this.handleSwitchState(record,value)}} />
      ),
      width: 150
    }, {
      title: 'Action',
      key: 'action',
      width: 150,
      render: (text, record) => (
        <Button style={{display: 'inline'}} onClick={()=>{this.onPrint([record.nom])}}><Icon type="printer"/></Button>
      )
    }];

    return (
      <div>
        <Table footer={
          ()=>{
            return(
              <span>
                <Button type="primary" onClick={() => this.onPrint(selectedRowKeys)} disabled={!hasSelected}>Imprimer séléctionnée(s)</Button>
                <Button style={{float:'right'}} type="primary" onClick={() => this.onPrint(data.map((item)=>item.nom))} >Imprimer tout</Button>
                {this.state.toPrint}
              </span>
            );
          }
        } rowSelection={{selectedRowKeys, onChange: this.onSelectChange}} scroll={{ x: 1300 }} columns={columns} dataSource={data} onChange={this.handleChange}/>
      </div>
    );
  }
}
export default MachineTable;
