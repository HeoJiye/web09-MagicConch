import { useRef } from 'react';

import { iceServers } from '@constants/urls';

import { useSocket } from './useSocket';

interface useRTCPeerConnectionProps {
  remoteVideoRef: React.RefObject<HTMLVideoElement | undefined>;
}

export function useRTCPeerConnection({ remoteVideoRef }: useRTCPeerConnectionProps) {
  const peerConnectionRef = useRef<RTCPeerConnection>();

  const { socketEmit } = useSocket('WebRTC');

  const makeRTCPeerConnection = async ({ roomName }: { roomName: string }) => {
    peerConnectionRef.current = new RTCPeerConnection({ iceServers: [{ urls: iceServers }] });

    peerConnectionRef.current.addEventListener('track', e => {
      if (!remoteVideoRef.current) {
        return;
      }

      remoteVideoRef.current.srcObject = e.streams[0];
    });

    peerConnectionRef.current.addEventListener('icecandidate', e => {
      if (!e.candidate) {
        return;
      }

      socketEmit('candidate', e.candidate, roomName);
    });
  };

  const closeRTCPeerConnection = () => {
    peerConnectionRef.current?.close();
  };

  return { makeRTCPeerConnection, closeRTCPeerConnection, peerConnectionRef };
}
