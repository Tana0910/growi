import React from 'react';
import PropTypes from 'prop-types';

import NavigationContainer from '../services/NavigationContainer';
import { withUnstatedContainers } from './UnstatedUtils';

const FixedControls = (props) => {
  const { navigationContainer } = props;

  return (
    <div className="grw-fixed-controls-container d-none d-md-block animated fadeInUp faster">
      <div className="rounded-circle position-absolute" style={{ bottom: '2.3rem', right: '3rem' }}>
        <button
          type="button"
          className="btn btn-lg btn-create-page btn-primary rounded-circle waves-effect waves-light"
          onClick={navigationContainer.openPageCreateModal}
        >
          <i className="icon-pencil"></i>
        </button>
      </div>
      <div className="rounded-circle position-absolute" style={{ bottom: 0, right: 0 }}>
        <button type="button" className="btn btn-light btn-scroll-to-top rounded-circle" onClick={() => navigationContainer.smoothScrollIntoView()}>
          <i className="icon-control-start"></i>
        </button>
      </div>
    </div>
  );

};

FixedControls.propTypes = {
  navigationContainer: PropTypes.instanceOf(NavigationContainer).isRequired,
};

export default withUnstatedContainers(FixedControls, [NavigationContainer]);
