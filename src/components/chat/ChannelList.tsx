import React, { PropsWithChildren } from 'react';


import type { APIErrorResponse, Channel, ErrorFromResponse } from 'stream-chat';
import { DefaultStreamChatGenerics, LoadingChannels, NullComponent, useTranslationContext } from 'stream-chat-react';
import css from './Chat.module.scss';
import { fromModule } from '@/utils/styler/Styler';

const styles = fromModule(css);

export type ChannelListMessengerProps<
  StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics
> = {
  /** Whether the channel query request returned an errored response */
  error: ErrorFromResponse<APIErrorResponse> | null;
  /** The channels currently loaded in the list, only defined if `sendChannelsToList` on `ChannelList` is true */
  loadedChannels?: Channel<StreamChatGenerics>[];
  /** Whether the channels are currently loading */
  loading?: boolean;
  /** Custom UI component to display the loading error indicator, defaults to component that renders null */
  LoadingErrorIndicator?: React.ComponentType;
  /** Custom UI component to display a loading indicator, defaults to and accepts same props as: [LoadingChannels](https://github.com/GetStream/stream-chat-react/blob/master/src/components/Loading/LoadingChannels.tsx) */
  LoadingIndicator?: React.ComponentType;
  /** Local state hook that resets the currently loaded channels */
  setChannels?: React.Dispatch<React.SetStateAction<Channel<StreamChatGenerics>[]>>;
};

/**
 * A preview list of channels, allowing you to select the channel you want to open
 */
export const ChannelListMessenger = <
  StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics
>(
  props: PropsWithChildren<ChannelListMessengerProps<StreamChatGenerics>>,
) => {
  const {
    children,
    error = null,
    loading,
    LoadingErrorIndicator = NullComponent,
    LoadingIndicator = LoadingChannels,
  } = props;
  const { t } = useTranslationContext('ChannelListMessenger');

  if (error) {
    return <LoadingErrorIndicator />;
  }

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
      <div
        aria-label={t('aria/Channel list')}
        className={styles.channelList()}
        role='listbox'
      >
        <h1 className={styles.title()}>Chats</h1>
        {children}
      </div>
  );
};