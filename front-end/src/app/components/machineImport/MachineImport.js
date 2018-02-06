// @flow weak
import React, {PureComponent} from 'react';
import PropTypes      from 'prop-types';


class MachineImport extends PureComponent {

  state = {file: null};

// eslint-disable-next-line no-undef
  static propTypes = {
    uploadFile:  PropTypes.func
  };

  handleChange = (e) => {
    this.setState({ file: e.target.value });
  }


  render() {
    const file = this.state.file;
    return (
      <form onSubmit={() => this.props.uploadFile({file})}>
        <div>
          <label>Machine File</label>
          <input type="file" onChange={this.handleChange}/>
        </div>
        <button type="submit">Submit</button>
      </form>

    );

  }
}


export default MachineImport;
