import clsx from 'clsx';
import React, { useEffect, useState } from 'react';

import type { UserResponse } from 'stream-chat';
import { DefaultStreamChatGenerics, getWholeChar } from 'stream-chat-react';


export type AvatarProps<
  StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics
> = {
  /** Custom class that will be merged with the default class */
  className?: string;
  /** Image URL or default is an image of the first initial of the name if there is one  */
  image?: string | null;
  /** Name of the image, used for title tag fallback */
  name?: string;
  /** click event handler */
  onClick?: (event: React.BaseSyntheticEvent) => void;
  /** mouseOver event handler */
  onMouseOver?: (event: React.BaseSyntheticEvent) => void;
  /** The entire user object for the chat user displayed in the component */
  user?: UserResponse<StreamChatGenerics>;
};

/**
 * A round avatar image with fallback to username's first letter
 */
export const Avatar = <
  StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics
>(
  props: AvatarProps<StreamChatGenerics>,
) => {
  const {
    className,
    image,
    name,
    onClick = () => undefined,
    onMouseOver = () => undefined,
  } = props;

  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
  }, [image]);

  const nameStr = name?.toString() || '';
  const initials = getWholeChar(nameStr, 0);
  const showImage = image && !error;

  return (
    <div
      className={clsx(`str-chat__avatar str-chat__message-sender-avatar`, className, {
        ['str-chat__avatar--multiple-letters']: initials.length > 1,
        ['str-chat__avatar--one-letter']: initials.length === 1,
      })}
      data-testid='avatar'
      onClick={onClick}
      onMouseOver={onMouseOver}
      title={name}
    >
      {showImage ? (
        <img
          alt={initials}
          className={clsx(`str-chat__avatar-image`)}
          data-testid='avatar-img'
          onError={() => setError(true)}
          src={image}
        />
      ) : (
        <div className='str-chat__avatar-fallback' data-testid='avatar-fallback'>
          {initials}
        </div>
      )}
    </div>
  );
};