import CustomButton from '@components/CustomButton';
import { ButtonColor, ButtonSize } from '@components/CustomButton/CustomButton';

import { Icon } from '@iconify/react/dist/iconify.js';

export interface IconButton {
  id: string;
  text: string;
  icon: string;
  iconColor: string;
  onClick?: () => void;
}

interface IconButtonProps {
  iconSize?: number;
  buttonSize?: ButtonSize;
  buttonColor?: ButtonColor;
  onClick?: () => void;
}

export default function IconButton({
  id,
  text,
  icon,
  iconColor,
  iconSize = 12,
  buttonSize = 'm',
  buttonColor = 'cancel',
  onClick,
}: IconButtonProps & IconButton) {
  return (
    <li key={id}>
      <CustomButton
        key={id}
        size={buttonSize}
        color={buttonColor}
        handleButtonClicked={onClick}
      >
        <Icon
          icon={icon}
          color={iconColor}
          fontSize={iconSize}
        />
        {text && <span>{text}</span>}
      </CustomButton>
    </li>
  );
}
