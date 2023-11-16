import { useMemo } from 'react';

interface MessageProps {
  type: 'left' | 'right';
  message: string;
  profile: string;
}

function Message({ type, message, profile }: MessageProps) {
  const chatStyle = useMemo(
    () => ({
      box: type == 'left' ? 'chat-start' : 'chat-end',
      bubble: type == 'left' ? 'surface-content text-default' : 'surface-point-alt',
    }),
    [type],
  );

  return (
    <>
      <div className={`max-w-600 chat ${chatStyle.box}`}>
        <div className="chat-image avatar">
          <div className="w-60 rounded-full">
            <img
              alt="프로필 이미지"
              src={profile}
            />
          </div>
        </div>
        <div className={`chat-bubble max-w-none shadow-chat ${chatStyle.bubble}`}>{message}</div>
      </div>
    </>
  );
}

export default Message;
