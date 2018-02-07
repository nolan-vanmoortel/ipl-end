//@flow weak

import React, {
  PureComponent
}                     from 'react';
import PropTypes      from 'prop-types';
import {Col, Row} from "antd";
import styles from './reportViewer.scss';

class ReportViewer extends PureComponent{

  // eslint-disable-next-line no-undef
  static propTypes = {
    ip:                 PropTypes.string.isRequired,
    mac:                PropTypes.string.isRequired,
    commentMachine:     PropTypes.string.isRequired,
    commentReport:      PropTypes.string.isRequired,
    email:              PropTypes.string.isRequired,
    name:              PropTypes.string.isRequired
  };

  render(){
    const {
      ip,
      mac,
      commentMachine,
      commentReport,
      email,
      name
    } = this.props;

    return(
      <div style={{width:'100%', textAlign:'center'}}>
        <div className={styles.reportViewer}>
          <Row>
            <Col>
              <ul className={styles["tab-group"]}>
                <li ><a style={{textAlign:"right"}}>{mac}</a></li>
                <li className={styles.active}><a style={{textAlign:"left"}} className={styles.ip}>{ip}</a></li>
              </ul>
            </Col>
          </Row>
          <Row>
            <Col>
              <h1 style={{marginBottom:5}}>{name}</h1>
              <h1 style={{color:'#a0b3b0', fontSize:'12px'}}>{commentMachine}</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className={styles["field-wrap"]}>
                <p className={styles.label}>Rapport</p>
                <div className={styles.area}>
                  <div className={styles.removeMarginBottom} dangerouslySetInnerHTML={{ __html: commentReport}}/>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <p className={styles.sender}>Envoyé par {email}</p>
            </Col>
          </Row>
        </div>
      </div>
    );
  }

}

export default ReportViewer
