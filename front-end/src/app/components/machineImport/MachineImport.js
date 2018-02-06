// @flow weak
import React, {PureComponent} from 'react';
import PropTypes      from 'prop-types';


class MachineImport extends PureComponent {
  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      file: ''
    };
  }
// eslint-disable-next-line no-undef
  static propTypes = {
    UploadFile:  PropTypes.func
  };

  handleChange(e) {
    this.setState({ file: e.target.value });
  }


  render() {
    const file = this.state.file;
    return (
      <form onSubmit={() => this.props.UploadFile({file})}>
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
