import React, { FC } from 'react';

import { UserPicture, PageListMeta, PagePathLabel } from '@growi/ui';
import { DevidedPagePath } from '@growi/core';

import loggerFactory from '~/utils/logger';

const logger = loggerFactory('growi:searchResultList');

type Props ={
  page: {
    _id: string,
    snippet: string,
    path: string,
    noLink: boolean,
    lastUpdateUser: any
  },
  onClickInvoked: (data: string) => void,
}

const SearchResultListItem: FC<Props> = (props:Props) => {

  const { page, onClickInvoked } = props;

  // Add prefix 'id_' in pageId, because scrollspy of bootstrap doesn't work when the first letter of id attr of target component is numeral.
  const pageId = `#${page._id}`;

  const dPagePath = new DevidedPagePath(page.path, false, true);
  const pagePathElem = <PagePathLabel page={page} isFormerOnly />;

  return (
    <li key={page._id} className="page-list-li w-100 border-bottom pr-4">
      <a
        className="d-block pt-3"
        href={pageId}
        onClick={() => {
          try {
            if (onClickInvoked == null) { throw new Error('onClickInvoked is null') }
            onClickInvoked(page._id);
          }
          catch (error) {
            logger.error(error);
          }
        }}
      >
        <div className="d-flex">
          {/* checkbox */}
          <div className="form-check my-auto mx-2">
            <input className="form-check-input my-auto" type="checkbox" value="" id="flexCheckDefault" />
          </div>
          <div className="w-100">
            {/* page path */}
            <small className="mb-1">
              <i className="icon-fw icon-home"></i>
              {pagePathElem}
            </small>
            <div className="d-flex my-1 align-items-center">
              {/* page title */}
              <h3 className="mb-0">
                <UserPicture user={page.lastUpdateUser} />
                <span className="mx-2">{dPagePath.latter}</span>
              </h3>
              {/* page meta */}
              <div className="d-flex mx-2">
                <PageListMeta page={page} />
              </div>
              {/* doropdown icon */}
              <div className="ml-auto">
                <i className="fa fa-ellipsis-v text-muted"></i>
              </div>

              {/* Todo: add the following icon into dropdown menu */}
              {/* <button
                type="button"
                className="btn btn-link p-0"
                value={page.path}
                onClick={(e) => {
                  window.location.href = e.currentTarget.value;
                }}
              >
                <i className="icon-login" />
              </button> */}

            </div>
            <div className="mt-1">{page.snippet}</div>
          </div>
        </div>
      </a>
    </li>
  );
};
export default SearchResultListItem;