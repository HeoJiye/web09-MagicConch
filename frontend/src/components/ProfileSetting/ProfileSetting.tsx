import { useState } from 'react';

import { CustomButton, IconButton } from '@components/Buttons';
import { CustomSelectOptions } from '@components/CustomSelect';

import DeviceSelect from './DeviceSelect';
import DeviceToggleButtons from './DeviceToggleButtons';

interface ProfileSettingProps {
  close: () => void;
  toggleVideo: () => void;
  toggleAudio: () => void;
  camList: CustomSelectOptions[];
  cameraConnected: { local: boolean; remote: boolean };
  changeMyCamera: (deviceId: string) => void;
}

export default function ProfileSetting({
  close,
  toggleVideo,
  toggleAudio,
  camList,
  cameraConnected,
  changeMyCamera,
}: ProfileSettingProps) {
  return (
    <div className="w-[100vw] h-[100vh] flex-with-center">
      <div className="flex gap-48 rounded-lg p-64 surface-box">
        <div className="flex flex-col gap-24">
          {/* TODO: Cam component기 완성되면 바꿔야 함. */}
          <img
            className="w-320 h-320"
            src="/ddung.png"
          />
          <DeviceToggleButtons
            cameraActive={cameraConnected.local}
            micActive={true}
            toggleVideo={toggleVideo}
            toggleAudio={toggleAudio}
          />
        </div>
        <div className="flex flex-col gap-24">
          <div className="flex-with-center gap-12">
            <div className="flex flex-col gap-4">
              <span className="text-strong display-bold14">프로필 이미지를 설정하세요.</span>
              <span className="text-strong display-medium12">카메라가 off 되었을 때 표시됩니다.</span>
            </div>
            <IconButton
              icon="ph:camera-bold"
              iconColor="textWhite"
              iconSize={24}
              buttonSize="m"
              buttonColor="dark"
              circle
            />
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-strong display-bold14">상대방에게 표시될 이름을 입력하세요.</span>
            <input
              className="input input-bordered input-sm"
              type="text"
              placeholder="닉네임을 입력하세요."
            />
          </div>
          <DeviceSelect
            name="카메라"
            deviceList={camList}
            onChange={changeMyCamera}
          />
          <DeviceSelect
            name="마이크"
            deviceList={camList}
            onChange={changeMyCamera}
          />
          <CustomButton
            onClick={close}
            color="dark"
          >
            확인
          </CustomButton>
        </div>
      </div>
    </div>
  );
}
