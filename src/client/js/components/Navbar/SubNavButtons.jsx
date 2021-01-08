import React from 'react';
import PropTypes from 'prop-types';
import AppContainer from '../../services/AppContainer';
import NavigationContainer from '../../services/NavigationContainer';
import PageContainer from '../../services/PageContainer';
import { withUnstatedContainers } from '../UnstatedUtils';

import BookmarkButton from '../BookmarkButton';
import LikeButton from '../LikeButton';
import PageManagement from '../Page/PageManagement';

import { useCurrentPagePath } from '~/stores/context';
import { useIsAbleToShowPageReactionButtons, useIsAbleToShowLikeButton } from '~/stores/ui';

const SubnavButtons = (props) => {
  const {
    appContainer, navigationContainer, pageContainer, isCompactMode,
  } = props;
  const { data: currentPagePath } = useCurrentPagePath();
  const { data: isAbleToShowLikeButton } = useIsAbleToShowLikeButton(currentPagePath);

  /* eslint-enable react/prop-types */

  /* eslint-disable react/prop-types */
  const PageReactionButtons = () => {

    return (
      <>
        {isAbleToShowLikeButton && (
          <span>
            <LikeButton />
          </span>
        )}
        <span>
          <BookmarkButton />
        </span>

      </>
    );
  };
  /* eslint-enable react/prop-types */

  const { editorMode } = navigationContainer.state;
  const isViewMode = editorMode === 'view';
  const { data: isAbleToShowPageReactionButtons } = useIsAbleToShowPageReactionButtons();

  return (
    <>
      {isViewMode && (
        <>
          { isAbleToShowPageReactionButtons && <PageReactionButtons /> }
          { pageContainer.isAbleToShowPageManagement && <PageManagement isCompactMode={isCompactMode} /> }
        </>
      )}
    </>
  );
};

/**
 * Wrapper component for using unstated
 */
const SubnavButtonsWrapper = withUnstatedContainers(SubnavButtons, [AppContainer, NavigationContainer, PageContainer]);


SubnavButtons.propTypes = {
  appContainer: PropTypes.instanceOf(AppContainer).isRequired,
  navigationContainer: PropTypes.instanceOf(NavigationContainer).isRequired,
  pageContainer: PropTypes.instanceOf(PageContainer).isRequired,

  isCompactMode: PropTypes.bool,
};

export default SubnavButtonsWrapper;
