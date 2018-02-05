// @flow weak

import React, {
  PureComponent
}                     from 'react';
import PropTypes      from 'prop-types';
import { Link }       from 'react-router-dom';
import {Jumbotron}    from '../../components';
import AnimatedView   from '../../components/animatedView/AnimatedView';
import styles         from './home.scss';
import banane         from './img/banane.jpg';
import {Image} from 'react-bootstrap';
import MachineImport from '../../components/machineImport/MachineImport'

class Home extends PureComponent {
  static propTypes= {
    match:    PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history:  PropTypes.object.isRequired,

    currentView:  PropTypes.string.isRequired,
    enterHome:    PropTypes.func.isRequired,
    leaveHome:    PropTypes.func.isRequired
  };

  componentDidMount() {
    const { enterHome } = this.props;
    enterHome();
  }

  componentWillUnmount() {
    const { leaveHome } = this.props;
    leaveHome();
  }

  render() {
    return(
      <AnimatedView>
        <Jumbotron>
          <div
            className={styles.homeInfo}
          >
            <h1
              className={styles.mainTitle}
            >
              IPL - END
            </h1>
            <h2>
              REACT + REDUX + WEBPACK + REACT-ROUTER + ...  (<i>beaucoup trop de techno</i>)!!!
            </h2>
            <Image src={banane} thumbnail />
            <p>
              <Link
                className="btn btn-success btn-lg"
                to={'/about'}>
                <i className="fa fa-info" />
                &nbsp;
                 Aller vers about
              </Link>
            </p>
          </div>
        </Jumbotron>
        <MachineImport/>
      </AnimatedView>
    );
  }
}

export default Home;
