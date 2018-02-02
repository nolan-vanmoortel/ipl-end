// @flow weak

import React, {
  PureComponent
}                     from 'react';
import PropTypes      from 'prop-types';
import AnimatedView   from '../../components/animatedView/AnimatedView';
import auth           from '../../services/auth';
type Props ={
  match: any,
  location: any,
  history: any,

  currentView: string,
  checkUserIsConnected: () => any,
  firstname: string,
  lastname: string
}
type State = {
}

class Protected extends PureComponent<Props, State> {
  static propTypes= {

    match:              PropTypes.object.isRequired,
    location:           PropTypes.object.isRequired,
    history:            PropTypes.object.isRequired,

    currentView:        PropTypes.string.isRequired,
    enterProtected:     PropTypes.func.isRequired,
    leaveProtected:     PropTypes.func.isRequired,

    firstname:          PropTypes.string.isRequired,
    lastname:           PropTypes.string.isRequired
  };


  static defaultProps = {
    firstname:      "NULL",
    lastname:      "NULL"
  }

  componentWillMount(){
    const {
      checkUserIsConnected
    } = this.props;

    checkUserIsConnected();
  }

  componentDidMount() {
    const { enterProtected } = this.props;
    enterProtected();
  }

  componentWillUnmount() {
    const { leaveProtected } = this.props;
    leaveProtected();
  }

  render() {
    const {
      firstname,
      lastname
    } = this.props;

    return(
      <AnimatedView>
        <h1>
          Vous êtes connecté {firstname+" "+lastname} !
        </h1>
        <h3>
          Compteur
        </h3>
      </AnimatedView>
    );
  }
}

export default Protected;
