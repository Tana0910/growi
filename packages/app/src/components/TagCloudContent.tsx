import React, { FC } from 'react';
import PropTypes from 'prop-types';

import { TagCloud } from 'react-tagcloud';

type Tags = {
  _id: string,
  name: string,
  count: number,
}

type Props = {
  tags:Tags[];
}

const MIN_FONT_SIZE = 12;
const MAX_FONT_SIZE = 36;

const TagCloudContent: FC<Props> = (props:Props) => {

  return (
    <>
      <TagCloud
        minSize={MIN_FONT_SIZE}
        maxSize={MAX_FONT_SIZE}
        tags={props.tags.map((tag) => {
          return { value: tag.name, count: tag.count };
        })}
        style={{ cursor: 'pointer' }}
        className="simple-cloud"
        onClick={(target) => { window.location.href = `/_search?q=tag:${target.value}` }}
      />
    </>
  );

};

TagCloudContent.propTypes = {
  tags: PropTypes.array.isRequired,
};

export default TagCloudContent;
