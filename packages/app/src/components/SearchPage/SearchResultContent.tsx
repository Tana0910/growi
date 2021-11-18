import React, { FC } from 'react';

import { IPageSearchResultData } from '../../interfaces/search';

import RevisionLoader from '../Page/RevisionLoader';
import AppContainer from '../../client/services/AppContainer';


type Props ={
  appContainer: AppContainer,
  searchingKeyword:string,
  focusedSearchResultData : IPageSearchResultData,
}
const SearchResultContent: FC<Props> = (props: Props) => {
  // Temporaly workaround for lint error
  // later needs to be fixed: RevisoinRender to typescriptcomponet
  const RevisionRenderTypeAny: any = RevisionLoader;
  const renderPage = (searchResultData) => {
    const page = searchResultData?.pageData || {};
    const growiRenderer = props.appContainer.getRenderer('searchresult');
    let showTags = false;
    if (page.tags != null && page.tags.length > 0) { showTags = true }
    return (
      <div key={page._id} className="search-result-page mb-5">
        <h2>
          <a href={page.path} className="text-break">
            {page.path}
          </a>
          {showTags && (
            <div className="mt-1 small">
              <i className="tag-icon icon-tag"></i> {page.tags.join(', ')}
            </div>
          )}
        </h2>
        <RevisionRenderTypeAny
          growiRenderer={growiRenderer}
          pageId={page._id}
          pagePath={page.path}
          revisionId={page.revision}
          highlightKeywords={props.searchingKeyword}
        />
      </div>
    );
  };
  const content = renderPage(props.focusedSearchResultData);
  return (

    <div>{content}</div>
  );
};


export default SearchResultContent;
