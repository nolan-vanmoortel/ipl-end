// @flow weak

import React, {
  PureComponent
}                     from 'react';
import PropTypes      from 'prop-types';
import AnimatedView   from '../../components/animatedView/AnimatedView';
import Counter        from '../../components/counter/Counter';

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
// eslint-disable-next-line no-undef
  static propTypes= {

    match:              PropTypes.object.isRequired,
    location:           PropTypes.object.isRequired,
    history:            PropTypes.object.isRequired,

    currentView:        PropTypes.string.isRequired,
    enterProtected:     PropTypes.func.isRequired,
    leaveProtected:     PropTypes.func.isRequired,

    firstname:          PropTypes.string.isRequired,
    lastname:           PropTypes.string.isRequired,
    value:              PropTypes.number.isRequired,
    increment:          PropTypes.func.isRequired,
    decrement:          PropTypes.func.isRequired,
    doubleAsync:        PropTypes.func.isRequired
  };


// eslint-disable-next-line no-undef
  static defaultProps = {
    firstname:      'NULL',
    lastname:      'NULL'
  }

  componentWillMount() {
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
      lastname,
      value,
      increment,
      decrement,
      doubleAsync
    } = this.props;

    return(
      <AnimatedView>
        <h1>
          Vous êtes connecté {firstname+' '+lastname} !
        </h1>
        <Counter value={value} handleIncrement={increment} handleDecrement={decrement} handleDoubleAsync={doubleAsync}/>
      </AnimatedView>
    );
  }
}

export default Protected;
