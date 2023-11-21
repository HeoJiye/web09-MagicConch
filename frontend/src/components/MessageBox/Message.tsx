import { useMemo } from 'react';

import { MessageButton } from '@components/ChatList';
import CustomButton from '@components/CustomButton';

interface MessageProps {
  type: 'left' | 'right';
  message: string;
  profile: string;
  button?: MessageButton;
}

function Message({ type, message, profile, button }: MessageProps) {
  const chatStyle = useMemo(
    () => ({
      box: type == 'left' ? 'chat-start' : 'chat-end',
      bubble: type == 'left' ? 'surface-content text-default' : 'surface-point-alt',
    }),
    [type],
  );

  return (
    <>
      <div className={`chat ${chatStyle.box}`}>
        <div className="chat-image avatar">
          <div className="w-60 rounded-full">
            <img
              alt="프로필 이미지"
              src={profile}
            />
          </div>
        </div>
        <div className={`chat-bubble max-w-none shadow-chat ${chatStyle.bubble}`}>{message}</div>
        {button && (
          <div className="p-8 pt-12">
            <CustomButton
              size="s"
              color="active"
              handleButtonClicked={button.onClick}
            >
              {button.content}
            </CustomButton>
          </div>
        )}
      </div>
    </>
  );
}

export default Message;
