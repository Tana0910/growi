import React from 'react';
import PropTypes from 'prop-types';

import UserPictureList from './UserPictureList';

import { withUnstatedContainers } from '../UnstatedUtils';

import PageContainer from '../../services/PageContainer';

class SeenUserList extends React.Component {

  render() {
    const { pageContainer } = this.props;
    return (
      // <div className="text-truncate text-muted text-right" style="direction: rtl;">
      <div className="text-truncate text-muted text-right">
        <span className="text-danger">
          <span className="seen-user-count">{pageContainer.state.sumOfSeenUsers}</span>
          <i className="fa fa-fw fa-paw"></i>
        </span>
        <UserPictureList users={pageContainer.state.seenUsers} />
      </div>
    );
  }

}

SeenUserList.propTypes = {
  pageContainer: PropTypes.instanceOf(PageContainer).isRequired,
};

/**
 * Wrapper component for using unstated
 */
const SeenUserPictureListWrapper = withUnstatedContainers(SeenUserList, [PageContainer]);

export default (SeenUserPictureListWrapper);
