import React from 'react';
import moment from 'moment';

import useInterval from 'react-use/lib/useInterval';
import styled from 'styled-components';
import useUpdate from 'react-use/lib/useUpdate';

type Props = {
  timestamp?: number;
  isConversationListItem?: boolean;
  momentFromNow: boolean;
};

const UPDATE_FREQUENCY = 60 * 1000;

const TimestampContainerNotListItem = styled.div`
  color: var(--text-secondary-color);
  font-size: var(--font-size-xs);
  line-height: 16px;
  letter-spacing: 0.3px;
  text-transform: uppercase;
  user-select: none;
`;

const TimestampContainerListItem = styled(TimestampContainerNotListItem)`
  flex-shrink: 0;
  margin-inline-start: 6px;
  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const Timestamp = (props: Props) => {
  const update = useUpdate();
  useInterval(update, UPDATE_FREQUENCY);

  const { timestamp, momentFromNow } = props;

  if (timestamp === null || timestamp === undefined) {
    return null;
  }

  const momentValue = moment(timestamp);
  // this is a hack to make the date string shorter, looks like moment does not have a localized way of doing this for now.

  const dateString = momentFromNow
    ? momentValue
        .fromNow()
        .replace('minutes', 'mins')
        .replace('minute', 'min')
    : momentValue.format('lll');

  const title = moment(timestamp).format('llll');
  if (props.isConversationListItem) {
    return <TimestampContainerListItem title={title}>{dateString}</TimestampContainerListItem>;
  }
  return <TimestampContainerNotListItem title={title}>{dateString}</TimestampContainerNotListItem>;
};
