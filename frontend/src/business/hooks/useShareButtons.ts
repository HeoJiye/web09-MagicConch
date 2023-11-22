import { RefObject } from 'react';
import { useParams } from 'react-router-dom';

import { Kakao } from '@business/services/Kakao';

import { downloadImage } from '@utils/downloadImage';

type ShareButton = {
  text?: string;
  icon?: string;
  iconColor?: string;
  onClick?: () => void;
  tooltip?: string;
};

interface useShareButtonProps {
  cardUrl: string;
  resultSharePageRef: RefObject<HTMLDivElement>;
}

export function useShareButtons({ cardUrl, resultSharePageRef }: useShareButtonProps) {
  const { id } = useParams<{ id: string }>();

  const share2Kakao = async () => {
    await Kakao.init();
    await Kakao.shareSendDefault({ cardUrl, id: id as string });
  };

  const download = () => {
    downloadImage(resultSharePageRef);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(`${import.meta.env.VITE_BASE_URL}/result/${id}`);
  };

  const shareButtons: Record<string, ShareButton> = {
    kakao: {
      text: '카카오톡 공유',
      icon: 'simple-icons:kakaotalk',
      iconColor: '#FEE500',
      onClick: share2Kakao,
    },
    download: {
      text: '다운로드',
      icon: 'ic:round-download',
      onClick: download,
    },
    copyLink: {
      text: 'copyLink',
      icon: 'bxs:copy',
      onClick: copyLink,
      tooltip: '클립보드에 복사됩니다.',
    },
  };

  return { shareButtons };
}
