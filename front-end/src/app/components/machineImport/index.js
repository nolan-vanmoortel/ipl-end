import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Upload from '../../redux/modules/machine';
import MachineImport from './MachineImport';


const mapStateToProps = (state) => {
  return {
    file: state.file
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
      Upload: Upload()
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MachineImport);
