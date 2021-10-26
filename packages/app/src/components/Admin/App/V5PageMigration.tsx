import React, { FC } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';


export const V5PageMigration: FC<any> = (props) => {
  const { t, isV5Compatible } = props;

  return (
    <>
      <p className="card well">
        GROWI is running with v4 compatible pages.<br />
        To use new features such as Page tree or easy renaming, please migrate page schema to v5.<br />
        <br />
        <span className="text-danger">
          <i className="icon-exclamation icon-fw"></i>
          Note: You will lose unique constraint from page path.
        </span>
      </p>
      <div className="row my-3">
        <div className="mx-auto">
          {
            isV5Compatible == null
            && (<button type="button" className="btn btn-secondary mr-3" onClick={() => { /* Set false */ }}>Not now</button>)
          }
          <button type="button" className="btn btn-warning" onClick={() => { /* Show modal, then start migration */ }}>Upgrade to v5</button>
        </div>
      </div>
    </>
  );
};

V5PageMigration.propTypes = {
  t: PropTypes.func.isRequired, // i18next
  isV5Compatible: PropTypes.bool,
};
